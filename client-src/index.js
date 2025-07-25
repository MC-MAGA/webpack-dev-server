/* global __resourceQuery, __webpack_hash__ */
// @ts-expect-error
import hotEmitter from "webpack/hot/emitter.js";
// @ts-expect-error
import webpackHotLog from "webpack/hot/log.js";
import { createOverlay, formatProblem } from "./overlay.js";
import { defineProgressElement, isProgressSupported } from "./progress.js";
import socket from "./socket.js";
import { log, setLogLevel } from "./utils/log.js";
import sendMessage from "./utils/sendMessage.js";

// eslint-disable-next-line jsdoc/no-restricted-syntax
/** @typedef {any} EXPECTED_ANY */

/**
 * @typedef {object} RawOverlayOptions
 * @property {string=} warnings warnings
 * @property {string=} errors errors
 * @property {string=} runtimeErrors runtime errors
 * @property {string=} trustedTypesPolicyName trusted types policy name
 */

/**
 * @typedef {object} OverlayOptions
 * @property {(boolean | ((error: Error) => boolean))=} warnings warnings
 * @property {(boolean | ((error: Error) => boolean))=} errors errors
 * @property {(boolean | ((error: Error) => boolean))=} runtimeErrors runtime errors
 * @property {string=} trustedTypesPolicyName trusted types policy name
 */

/** @typedef {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} LogLevel */

/**
 * @typedef {object} Options
 * @property {boolean} hot true when hot enabled, otherwise false
 * @property {boolean} liveReload true when live reload enabled, otherwise false
 * @property {boolean} progress true when need to show progress, otherwise false
 * @property {boolean | OverlayOptions} overlay overlay options
 * @property {LogLevel=} logging logging level
 * @property {number=} reconnect count of allowed reconnection
 */

/**
 * @typedef {object} Status
 * @property {boolean} isUnloading true when unloaded, otherwise false
 * @property {string} currentHash current hash
 * @property {string=} previousHash previous hash
 */

/**
 * @param {boolean | RawOverlayOptions | OverlayOptions} overlayOptions overlay options
 */
const decodeOverlayOptions = (overlayOptions) => {
  if (typeof overlayOptions === "object") {
    const requiredOptions = ["warnings", "errors", "runtimeErrors"];

    for (let i = 0; i < requiredOptions.length; i++) {
      const property =
        /** @type {keyof Omit<RawOverlayOptions, "trustedTypesPolicyName">} */
        (requiredOptions[i]);

      if (typeof overlayOptions[property] === "string") {
        const overlayFilterFunctionString = decodeURIComponent(
          overlayOptions[property],
        );

        /** @type {OverlayOptions} */
        (overlayOptions)[property] = /** @type {(error: Error) => boolean} */ (
          // eslint-disable-next-line no-new-func
          new Function(
            "message",
            `var callback = ${overlayFilterFunctionString}
        return callback(message)`,
          )
        );
      }
    }
  }
};

/**
 * @type {Status}
 */
const status = {
  isUnloading: false,
  currentHash: __webpack_hash__,
};

/**
 * @returns {string} current script source
 */
const getCurrentScriptSource = () => {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return /** @type {string} */ (document.currentScript.getAttribute("src"));
  }

  // Fallback to getting all scripts running in the document.
  const scriptElements = document.scripts || [];
  const scriptElementsWithSrc = Array.prototype.filter.call(
    scriptElements,
    (element) => element.getAttribute("src"),
  );

  if (scriptElementsWithSrc.length > 0) {
    const currentScript =
      scriptElementsWithSrc[scriptElementsWithSrc.length - 1];

    return currentScript.getAttribute("src");
  }

  // Fail as there was no script to use.
  throw new Error("[webpack-dev-server] Failed to get current script source.");
};

/** @typedef {{ hot?: string, ["live-reload"]?: string, progress?: string, reconnect?: string, logging?: LogLevel, overlay?: string, fromCurrentScript?: boolean }} AdditionalParsedURL */
/** @typedef {Partial<URL> & AdditionalParsedURL} ParsedURL */

/**
 * @param {string} resourceQuery resource query
 * @returns {ParsedURL} parsed URL
 */
const parseURL = (resourceQuery) => {
  /** @type {ParsedURL} */
  let result = {};

  if (typeof resourceQuery === "string" && resourceQuery !== "") {
    const searchParams = resourceQuery.slice(1).split("&");

    for (let i = 0; i < searchParams.length; i++) {
      const pair = searchParams[i].split("=");

      /** @type {EXPECTED_ANY} */
      (result)[pair[0]] = decodeURIComponent(pair[1]);
    }
  } else {
    // Else, get the url from the <script> this file was called with.
    const scriptSource = getCurrentScriptSource();

    let scriptSourceURL;

    try {
      // The placeholder `baseURL` with `window.location.href`,
      // is to allow parsing of path-relative or protocol-relative URLs,
      // and will have no effect if `scriptSource` is a fully valid URL.
      scriptSourceURL = new URL(scriptSource, self.location.href);
    } catch (_err) {
      // URL parsing failed, do nothing.
      // We will still proceed to see if we can recover using `resourceQuery`
    }

    if (scriptSourceURL) {
      result = scriptSourceURL;
      result.fromCurrentScript = true;
    }
  }

  return result;
};

const parsedResourceQuery = parseURL(__resourceQuery);

/** @typedef {{ ["Hot Module Replacement"]: boolean, ["Live Reloading"]: boolean, Progress: boolean, Overlay: boolean }} Features */

/** @type {Features} */
const enabledFeatures = {
  "Hot Module Replacement": false,
  "Live Reloading": false,
  Progress: false,
  Overlay: false,
};

/** @type {Options} */
const options = {
  hot: false,
  liveReload: false,
  progress: false,
  overlay: false,
};

if (parsedResourceQuery.hot === "true") {
  options.hot = true;
  enabledFeatures["Hot Module Replacement"] = true;
}

if (parsedResourceQuery["live-reload"] === "true") {
  options.liveReload = true;
  enabledFeatures["Live Reloading"] = true;
}

if (parsedResourceQuery.progress === "true") {
  options.progress = true;
  enabledFeatures.Progress = true;
}

if (parsedResourceQuery.overlay) {
  try {
    options.overlay = JSON.parse(parsedResourceQuery.overlay);
  } catch (err) {
    log.error("Error parsing overlay options from resource query:", err);
  }

  // Fill in default "true" params for partially-specified objects.
  if (typeof options.overlay === "object") {
    options.overlay = {
      errors: true,
      warnings: true,
      runtimeErrors: true,
      ...options.overlay,
    };

    decodeOverlayOptions(options.overlay);
  }
  enabledFeatures.Overlay = options.overlay !== false;
}

if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}

if (typeof parsedResourceQuery.reconnect !== "undefined") {
  options.reconnect = Number(parsedResourceQuery.reconnect);
}

/**
 * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level level
 */
const setAllLogLevel = (level) => {
  // This is needed because the HMR logger operate separately from dev server logger
  webpackHotLog.setLogLevel(
    level === "verbose" || level === "log" ? "info" : level,
  );
  setLogLevel(level);
};

if (options.logging) {
  setAllLogLevel(options.logging);
}

/**
 * @param {Features} features features
 */
const logEnabledFeatures = (features) => {
  const listEnabledFeatures = Object.keys(features);
  if (!features || listEnabledFeatures.length === 0) {
    return;
  }

  let logString = "Server started:";

  // Server started: Hot Module Replacement enabled, Live Reloading enabled, Overlay disabled.
  for (let i = 0; i < listEnabledFeatures.length; i++) {
    const key = /** @type {keyof Features} */ (listEnabledFeatures[i]);
    logString += ` ${key} ${features[key] ? "enabled" : "disabled"},`;
  }
  // replace last comma with a period
  logString = logString.slice(0, -1).concat(".");

  log.info(logString);
};

logEnabledFeatures(enabledFeatures);

self.addEventListener("beforeunload", () => {
  status.isUnloading = true;
});

const overlay =
  typeof window !== "undefined"
    ? createOverlay(
        typeof options.overlay === "object"
          ? {
              trustedTypesPolicyName: options.overlay.trustedTypesPolicyName,
              catchRuntimeError: options.overlay.runtimeErrors,
            }
          : {
              trustedTypesPolicyName: false,
              catchRuntimeError: options.overlay,
            },
      )
    : { send: () => {} };

/**
 * @param {Options} options options
 * @param {Status} currentStatus current status
 */
const reloadApp = ({ hot, liveReload }, currentStatus) => {
  if (currentStatus.isUnloading) {
    return;
  }

  const { currentHash, previousHash } = currentStatus;
  const isInitial =
    currentHash.indexOf(/** @type {string} */ (previousHash)) >= 0;

  if (isInitial) {
    return;
  }

  /**
   * @param {Window} rootWindow root window
   * @param {number} intervalId interval id
   */
  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);

    log.info("App updated. Reloading...");

    rootWindow.location.reload();
  }

  const search = self.location.search.toLowerCase();
  const allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
  const allowToLiveReload =
    search.indexOf("webpack-dev-server-live-reload=false") === -1;

  if (hot && allowToHot) {
    log.info("App hot update...");

    hotEmitter.emit("webpackHotUpdate", currentStatus.currentHash);

    if (typeof self !== "undefined" && self.window) {
      // broadcast update to window
      self.postMessage(`webpackHotUpdate${currentStatus.currentHash}`, "*");
    }
  }
  // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload && allowToLiveReload) {
    /** @type {Window} */
    let rootWindow = self;

    // use parent window for reload (in case we're in an iframe with no valid src)
    const intervalId = self.setInterval(() => {
      if (rootWindow.location.protocol !== "about:") {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;

        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }
};

const ansiRegex = new RegExp(
  [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))",
  ].join("|"),
  "g",
);

/**
 * Strip [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) from a string.
 * Adapted from code originally released by Sindre Sorhus
 * Licensed the MIT License
 * @param {string} string string
 * @returns {string} string without ansi
 */
const stripAnsi = (string) => {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }

  return string.replace(ansiRegex, "");
};

const onSocketMessage = {
  hot() {
    if (parsedResourceQuery.hot === "false") {
      return;
    }

    options.hot = true;
  },
  liveReload() {
    if (parsedResourceQuery["live-reload"] === "false") {
      return;
    }

    options.liveReload = true;
  },
  invalid() {
    log.info("App updated. Recompiling...");

    // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.
    if (options.overlay) {
      overlay.send({ type: "DISMISS" });
    }

    sendMessage("Invalid");
  },
  /**
   * @param {string} hash hash
   */
  hash(hash) {
    status.previousHash = status.currentHash;
    status.currentHash = hash;
  },
  logging: setAllLogLevel,
  /**
   * @param {boolean} value overlay value
   */
  overlay(value) {
    if (typeof document === "undefined") {
      return;
    }

    options.overlay = value;
    decodeOverlayOptions(options.overlay);
  },
  /**
   * @param {number} value reconnect value
   */
  reconnect(value) {
    if (parsedResourceQuery.reconnect === "false") {
      return;
    }

    options.reconnect = value;
  },
  /**
   * @param {boolean} value progress value
   */
  progress(value) {
    options.progress = value;
  },
  /**
   * @param {{ pluginName?: string, percent: string, msg: string }} data date with progress
   */
  "progress-update": function progressUpdate(data) {
    if (options.progress) {
      log.info(
        `${data.pluginName ? `[${data.pluginName}] ` : ""}${data.percent}% - ${
          data.msg
        }.`,
      );
    }

    if (isProgressSupported() && typeof options.progress === "string") {
      let progress = document.querySelector("wds-progress");
      if (!progress) {
        defineProgressElement();
        progress = document.createElement("wds-progress");
        document.body.appendChild(progress);
      }
      progress.setAttribute("progress", data.percent);
      progress.setAttribute("type", options.progress);
    }

    sendMessage("Progress", data);
  },
  "still-ok": function stillOk() {
    log.info("Nothing changed.");

    if (options.overlay) {
      overlay.send({ type: "DISMISS" });
    }

    sendMessage("StillOk");
  },
  ok() {
    sendMessage("Ok");

    if (options.overlay) {
      overlay.send({ type: "DISMISS" });
    }

    reloadApp(options, status);
  },
  /**
   * @param {string} file changed file
   */
  "static-changed": function staticChanged(file) {
    log.info(
      `${
        file ? `"${file}"` : "Content"
      } from static directory was changed. Reloading...`,
    );

    self.location.reload();
  },
  /**
   * @param {Error[]} warnings warnings
   * @param {{ preventReloading: boolean }=} params extra params
   */
  warnings(warnings, params) {
    log.warn("Warnings while compiling.");

    const printableWarnings = warnings.map((error) => {
      const { header, body } = formatProblem("warning", error);

      return `${header}\n${stripAnsi(body)}`;
    });

    sendMessage("Warnings", printableWarnings);

    for (let i = 0; i < printableWarnings.length; i++) {
      log.warn(printableWarnings[i]);
    }

    const overlayWarningsSetting =
      typeof options.overlay === "boolean"
        ? options.overlay
        : options.overlay && options.overlay.warnings;

    if (overlayWarningsSetting) {
      const warningsToDisplay =
        typeof overlayWarningsSetting === "function"
          ? warnings.filter(overlayWarningsSetting)
          : warnings;

      if (warningsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "warning",
          messages: warnings,
        });
      }
    }

    if (params && params.preventReloading) {
      return;
    }

    reloadApp(options, status);
  },
  /**
   * @param {Error[]} errors errors
   */
  errors(errors) {
    log.error("Errors while compiling. Reload prevented.");

    const printableErrors = errors.map((error) => {
      const { header, body } = formatProblem("error", error);

      return `${header}\n${stripAnsi(body)}`;
    });

    sendMessage("Errors", printableErrors);

    for (let i = 0; i < printableErrors.length; i++) {
      log.error(printableErrors[i]);
    }

    const overlayErrorsSettings =
      typeof options.overlay === "boolean"
        ? options.overlay
        : options.overlay && options.overlay.errors;

    if (overlayErrorsSettings) {
      const errorsToDisplay =
        typeof overlayErrorsSettings === "function"
          ? errors.filter(overlayErrorsSettings)
          : errors;

      if (errorsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "error",
          messages: errors,
        });
      }
    }
  },
  /**
   * @param {Error} error error
   */
  error(error) {
    log.error(error);
  },
  close() {
    log.info("Disconnected!");

    if (options.overlay) {
      overlay.send({ type: "DISMISS" });
    }

    sendMessage("Close");
  },
};

/**
 * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL object URL
 * @returns {string} formatted url
 */
const formatURL = (objURL) => {
  let protocol = objURL.protocol || "";

  if (protocol && protocol.slice(-1) !== ":") {
    protocol += ":";
  }

  let auth = objURL.auth || "";

  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }

  let host = "";

  if (objURL.hostname) {
    host =
      auth +
      (objURL.hostname.indexOf(":") === -1
        ? objURL.hostname
        : `[${objURL.hostname}]`);

    if (objURL.port) {
      host += `:${objURL.port}`;
    }
  }

  let pathname = objURL.pathname || "";

  if (objURL.slashes) {
    host = `//${host || ""}`;

    if (pathname && pathname.charAt(0) !== "/") {
      pathname = `/${pathname}`;
    }
  } else if (!host) {
    host = "";
  }

  let search = objURL.search || "";

  if (search && search.charAt(0) !== "?") {
    search = `?${search}`;
  }

  let hash = objURL.hash || "";

  if (hash && hash.charAt(0) !== "#") {
    hash = `#${hash}`;
  }

  pathname = pathname.replace(
    /[?#]/g,
    /**
     * @param {string} match matched string
     * @returns {string} encoded URI component
     */
    (match) => encodeURIComponent(match),
  );
  search = search.replace("#", "%23");

  return `${protocol}${host}${pathname}${search}${hash}`;
};

/**
 * @param {ParsedURL} parsedURL parsed URL
 * @returns {string} socket URL
 */
const createSocketURL = (parsedURL) => {
  let { hostname } = parsedURL;

  // Node.js module parses it as `::`
  // `new URL(urlString, [baseURLString])` parses it as '[::]'
  const isInAddrAny =
    hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]";

  // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384
  if (
    isInAddrAny &&
    self.location.hostname &&
    self.location.protocol.indexOf("http") === 0
  ) {
    hostname = self.location.hostname;
  }

  let socketURLProtocol = parsedURL.protocol || self.location.protocol;

  // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.
  if (
    socketURLProtocol === "auto:" ||
    (hostname && isInAddrAny && self.location.protocol === "https:")
  ) {
    socketURLProtocol = self.location.protocol;
  }

  socketURLProtocol = socketURLProtocol.replace(
    /^(?:http|.+-extension|file)/i,
    "ws",
  );

  let socketURLAuth = "";

  // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
  // Parse authentication credentials in case we need them
  if (parsedURL.username) {
    socketURLAuth = parsedURL.username;

    // Since HTTP basic authentication does not allow empty username,
    // we only include password if the username is not empty.
    if (parsedURL.password) {
      // Result: <username>:<password>
      socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
    }
  }

  // In case the host is a raw IPv6 address, it can be enclosed in
  // the brackets as the brackets are needed in the final URL string.
  // Need to remove those as url.format blindly adds its own set of brackets
  // if the host string contains colons. That would lead to non-working
  // double brackets (e.g. [[::]]) host
  //
  // All of these web socket url params are optionally passed in through resourceQuery,
  // so we need to fall back to the default if they are not provided
  const socketURLHostname = (
    hostname ||
    self.location.hostname ||
    "localhost"
  ).replace(/^\[(.*)\]$/, "$1");

  let socketURLPort = parsedURL.port;

  if (!socketURLPort || socketURLPort === "0") {
    socketURLPort = self.location.port;
  }

  // If path is provided it'll be passed in via the resourceQuery as a
  // query param so it has to be parsed out of the querystring in order for the
  // client to open the socket to the correct location.
  let socketURLPathname = "/ws";

  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
    socketURLPathname = parsedURL.pathname;
  }

  return formatURL({
    protocol: socketURLProtocol,
    auth: socketURLAuth,
    hostname: socketURLHostname,
    port: socketURLPort,
    pathname: socketURLPathname,
    slashes: true,
  });
};

const socketURL = createSocketURL(parsedResourceQuery);

socket(socketURL, onSocketMessage, options.reconnect);

export { createSocketURL, getCurrentScriptSource, parseURL };
