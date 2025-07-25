export = Server;
/**
 * @typedef {object} BasicApplication
 * @property {typeof useFn} use
 */
/**
 * @template {BasicApplication} [A=ExpressApplication]
 * @template {BasicServer} [S=HTTPServer]
 */
declare class Server<
  A extends BasicApplication = import("express").Application,
  S extends BasicServer = import("http").Server<
    typeof import("http").IncomingMessage,
    typeof import("http").ServerResponse
  >,
> {
  static get schema(): {
    title: string;
    type: string;
    definitions: {
      App: {
        instanceof: string;
        description: string;
        link: string;
      };
      AllowedHosts: {
        anyOf: (
          | {
              type: string;
              minItems: number;
              items: {
                $ref: string;
              };
              enum?: undefined;
              $ref?: undefined;
            }
          | {
              enum: string[];
              type?: undefined;
              minItems?: undefined;
              items?: undefined;
              $ref?: undefined;
            }
          | {
              $ref: string;
              type?: undefined;
              minItems?: undefined;
              items?: undefined;
              enum?: undefined;
            }
        )[];
        description: string;
        link: string;
      };
      AllowedHostsItem: {
        type: string;
        minLength: number;
      };
      Bonjour: {
        anyOf: (
          | {
              type: string;
              cli: {
                negatedDescription: string;
              };
              description?: undefined;
              link?: undefined;
            }
          | {
              type: string;
              description: string;
              link: string;
              cli?: undefined;
            }
        )[];
        description: string;
        link: string;
      };
      Client: {
        description: string;
        link: string;
        anyOf: (
          | {
              enum: boolean[];
              cli: {
                negatedDescription: string;
              };
              type?: undefined;
              additionalProperties?: undefined;
              properties?: undefined;
            }
          | {
              type: string;
              additionalProperties: boolean;
              properties: {
                logging: {
                  $ref: string;
                };
                overlay: {
                  $ref: string;
                };
                progress: {
                  $ref: string;
                };
                reconnect: {
                  $ref: string;
                };
                webSocketTransport: {
                  $ref: string;
                };
                webSocketURL: {
                  $ref: string;
                };
              };
              enum?: undefined;
              cli?: undefined;
            }
        )[];
      };
      ClientLogging: {
        enum: string[];
        description: string;
        link: string;
      };
      ClientOverlay: {
        anyOf: (
          | {
              description: string;
              link: string;
              type: string;
              cli: {
                negatedDescription: string;
              };
              additionalProperties?: undefined;
              properties?: undefined;
            }
          | {
              type: string;
              additionalProperties: boolean;
              properties: {
                errors: {
                  anyOf: (
                    | {
                        description: string;
                        type: string;
                        cli: {
                          negatedDescription: string;
                        };
                        instanceof?: undefined;
                      }
                    | {
                        instanceof: string;
                        description: string;
                        type?: undefined;
                        cli?: undefined;
                      }
                  )[];
                };
                warnings: {
                  anyOf: (
                    | {
                        description: string;
                        type: string;
                        cli: {
                          negatedDescription: string;
                        };
                        instanceof?: undefined;
                      }
                    | {
                        instanceof: string;
                        description: string;
                        type?: undefined;
                        cli?: undefined;
                      }
                  )[];
                };
                runtimeErrors: {
                  anyOf: (
                    | {
                        description: string;
                        type: string;
                        cli: {
                          negatedDescription: string;
                        };
                        instanceof?: undefined;
                      }
                    | {
                        instanceof: string;
                        description: string;
                        type?: undefined;
                        cli?: undefined;
                      }
                  )[];
                };
                trustedTypesPolicyName: {
                  description: string;
                  type: string;
                };
              };
              description?: undefined;
              link?: undefined;
              cli?: undefined;
            }
        )[];
      };
      ClientProgress: {
        description: string;
        link: string;
        type: string[];
        enum: (string | boolean)[];
        cli: {
          negatedDescription: string;
        };
      };
      ClientReconnect: {
        description: string;
        link: string;
        anyOf: (
          | {
              type: string;
              cli: {
                negatedDescription: string;
              };
              minimum?: undefined;
            }
          | {
              type: string;
              minimum: number;
              cli?: undefined;
            }
        )[];
      };
      ClientWebSocketTransport: {
        anyOf: {
          $ref: string;
        }[];
        description: string;
        link: string;
      };
      ClientWebSocketTransportEnum: {
        enum: string[];
      };
      ClientWebSocketTransportString: {
        type: string;
        minLength: number;
      };
      ClientWebSocketURL: {
        description: string;
        link: string;
        anyOf: (
          | {
              type: string;
              minLength: number;
              additionalProperties?: undefined;
              properties?: undefined;
            }
          | {
              type: string;
              additionalProperties: boolean;
              properties: {
                hostname: {
                  description: string;
                  type: string;
                  minLength: number;
                };
                pathname: {
                  description: string;
                  type: string;
                };
                password: {
                  description: string;
                  type: string;
                };
                port: {
                  description: string;
                  anyOf: (
                    | {
                        type: string;
                        minLength?: undefined;
                      }
                    | {
                        type: string;
                        minLength: number;
                      }
                  )[];
                };
                protocol: {
                  description: string;
                  anyOf: (
                    | {
                        enum: string[];
                        type?: undefined;
                        minLength?: undefined;
                      }
                    | {
                        type: string;
                        minLength: number;
                        enum?: undefined;
                      }
                  )[];
                };
                username: {
                  description: string;
                  type: string;
                };
              };
              minLength?: undefined;
            }
        )[];
      };
      Compress: {
        type: string;
        description: string;
        link: string;
        cli: {
          negatedDescription: string;
        };
      };
      DevMiddleware: {
        description: string;
        link: string;
        type: string;
        additionalProperties: boolean;
      };
      HeaderObject: {
        type: string;
        additionalProperties: boolean;
        properties: {
          key: {
            description: string;
            type: string;
          };
          value: {
            description: string;
            type: string;
          };
        };
        cli: {
          exclude: boolean;
        };
      };
      Headers: {
        anyOf: (
          | {
              type: string;
              items: {
                $ref: string;
              };
              minItems: number;
              instanceof?: undefined;
            }
          | {
              type: string;
              items?: undefined;
              minItems?: undefined;
              instanceof?: undefined;
            }
          | {
              instanceof: string;
              type?: undefined;
              items?: undefined;
              minItems?: undefined;
            }
        )[];
        description: string;
        link: string;
      };
      HistoryApiFallback: {
        anyOf: (
          | {
              type: string;
              cli: {
                negatedDescription: string;
              };
              description?: undefined;
              link?: undefined;
            }
          | {
              type: string;
              description: string;
              link: string;
              cli?: undefined;
            }
        )[];
        description: string;
        link: string;
      };
      Host: {
        description: string;
        link: string;
        anyOf: (
          | {
              enum: string[];
              type?: undefined;
              minLength?: undefined;
            }
          | {
              type: string;
              minLength: number;
              enum?: undefined;
            }
        )[];
      };
      Hot: {
        anyOf: (
          | {
              type: string;
              cli: {
                negatedDescription: string;
              };
              enum?: undefined;
            }
          | {
              enum: string[];
              type?: undefined;
              cli?: undefined;
            }
        )[];
        description: string;
        link: string;
      };
      IPC: {
        anyOf: (
          | {
              type: string;
              minLength: number;
              enum?: undefined;
            }
          | {
              type: string;
              enum: boolean[];
              minLength?: undefined;
            }
        )[];
        description: string;
        link: string;
      };
      LiveReload: {
        type: string;
        description: string;
        cli: {
          negatedDescription: string;
        };
        link: string;
      };
      OnListening: {
        instanceof: string;
        description: string;
        link: string;
      };
      Open: {
        anyOf: (
          | {
              type: string;
              items: {
                anyOf: {
                  $ref: string;
                }[];
              };
              $ref?: undefined;
            }
          | {
              $ref: string;
              type?: undefined;
              items?: undefined;
            }
        )[];
        description: string;
        link: string;
      };
      OpenBoolean: {
        type: string;
        cli: {
          negatedDescription: string;
        };
      };
      OpenObject: {
        type: string;
        additionalProperties: boolean;
        properties: {
          target: {
            anyOf: (
              | {
                  type: string;
                  items: {
                    type: string;
                  };
                }
              | {
                  type: string;
                  items?: undefined;
                }
            )[];
            description: string;
          };
          app: {
            anyOf: (
              | {
                  type: string;
                  additionalProperties: boolean;
                  properties: {
                    name: {
                      anyOf: (
                        | {
                            type: string;
                            items: {
                              type: string;
                              minLength: number;
                            };
                            minItems: number;
                            minLength?: undefined;
                          }
                        | {
                            type: string;
                            minLength: number;
                            items?: undefined;
                            minItems?: undefined;
                          }
                      )[];
                    };
                    arguments: {
                      items: {
                        type: string;
                        minLength: number;
                      };
                    };
                  };
                  minLength?: undefined;
                  description?: undefined;
                  cli?: undefined;
                }
              | {
                  type: string;
                  minLength: number;
                  description: string;
                  cli: {
                    exclude: boolean;
                  };
                  additionalProperties?: undefined;
                  properties?: undefined;
                }
            )[];
            description: string;
          };
        };
      };
      OpenString: {
        type: string;
        minLength: number;
      };
      Port: {
        anyOf: (
          | {
              type: string;
              minimum: number;
              maximum: number;
              minLength?: undefined;
              enum?: undefined;
            }
          | {
              type: string;
              minLength: number;
              minimum?: undefined;
              maximum?: undefined;
              enum?: undefined;
            }
          | {
              enum: string[];
              type?: undefined;
              minimum?: undefined;
              maximum?: undefined;
              minLength?: undefined;
            }
        )[];
        description: string;
        link: string;
      };
      Proxy: {
        type: string;
        items: {
          anyOf: (
            | {
                type: string;
                instanceof?: undefined;
              }
            | {
                instanceof: string;
                type?: undefined;
              }
          )[];
        };
        description: string;
        link: string;
      };
      Server: {
        anyOf: {
          $ref: string;
        }[];
        link: string;
        description: string;
      };
      ServerType: {
        enum: string[];
      };
      ServerFn: {
        instanceof: string;
      };
      ServerEnum: {
        enum: string[];
        cli: {
          exclude: boolean;
        };
      };
      ServerString: {
        type: string;
        minLength: number;
        cli: {
          exclude: boolean;
        };
      };
      ServerObject: {
        type: string;
        properties: {
          type: {
            anyOf: {
              $ref: string;
            }[];
          };
          options: {
            $ref: string;
          };
        };
        additionalProperties: boolean;
      };
      ServerOptions: {
        type: string;
        additionalProperties: boolean;
        properties: {
          passphrase: {
            type: string;
            description: string;
          };
          requestCert: {
            type: string;
            description: string;
            cli: {
              negatedDescription: string;
            };
          };
          ca: {
            anyOf: (
              | {
                  type: string;
                  items: {
                    anyOf: (
                      | {
                          type: string;
                          instanceof?: undefined;
                        }
                      | {
                          instanceof: string;
                          type?: undefined;
                        }
                    )[];
                  };
                  instanceof?: undefined;
                }
              | {
                  type: string;
                  items?: undefined;
                  instanceof?: undefined;
                }
              | {
                  instanceof: string;
                  type?: undefined;
                  items?: undefined;
                }
            )[];
            description: string;
          };
          cert: {
            anyOf: (
              | {
                  type: string;
                  items: {
                    anyOf: (
                      | {
                          type: string;
                          instanceof?: undefined;
                        }
                      | {
                          instanceof: string;
                          type?: undefined;
                        }
                    )[];
                  };
                  instanceof?: undefined;
                }
              | {
                  type: string;
                  items?: undefined;
                  instanceof?: undefined;
                }
              | {
                  instanceof: string;
                  type?: undefined;
                  items?: undefined;
                }
            )[];
            description: string;
          };
          crl: {
            anyOf: (
              | {
                  type: string;
                  items: {
                    anyOf: (
                      | {
                          type: string;
                          instanceof?: undefined;
                        }
                      | {
                          instanceof: string;
                          type?: undefined;
                        }
                    )[];
                  };
                  instanceof?: undefined;
                }
              | {
                  type: string;
                  items?: undefined;
                  instanceof?: undefined;
                }
              | {
                  instanceof: string;
                  type?: undefined;
                  items?: undefined;
                }
            )[];
            description: string;
          };
          key: {
            anyOf: (
              | {
                  type: string;
                  items: {
                    anyOf: (
                      | {
                          type: string;
                          instanceof?: undefined;
                          additionalProperties?: undefined;
                        }
                      | {
                          instanceof: string;
                          type?: undefined;
                          additionalProperties?: undefined;
                        }
                      | {
                          type: string;
                          additionalProperties: boolean;
                          instanceof?: undefined;
                        }
                    )[];
                  };
                  instanceof?: undefined;
                }
              | {
                  type: string;
                  items?: undefined;
                  instanceof?: undefined;
                }
              | {
                  instanceof: string;
                  type?: undefined;
                  items?: undefined;
                }
            )[];
            description: string;
          };
          pfx: {
            anyOf: (
              | {
                  type: string;
                  items: {
                    anyOf: (
                      | {
                          type: string;
                          instanceof?: undefined;
                          additionalProperties?: undefined;
                        }
                      | {
                          instanceof: string;
                          type?: undefined;
                          additionalProperties?: undefined;
                        }
                      | {
                          type: string;
                          additionalProperties: boolean;
                          instanceof?: undefined;
                        }
                    )[];
                  };
                  instanceof?: undefined;
                }
              | {
                  type: string;
                  items?: undefined;
                  instanceof?: undefined;
                }
              | {
                  instanceof: string;
                  type?: undefined;
                  items?: undefined;
                }
            )[];
            description: string;
          };
        };
      };
      SetupExitSignals: {
        type: string;
        description: string;
        link: string;
        cli: {
          exclude: boolean;
        };
      };
      SetupMiddlewares: {
        instanceof: string;
        description: string;
        link: string;
      };
      Static: {
        anyOf: (
          | {
              type: string;
              items: {
                anyOf: {
                  $ref: string;
                }[];
              };
              cli?: undefined;
              $ref?: undefined;
            }
          | {
              type: string;
              cli: {
                negatedDescription: string;
              };
              items?: undefined;
              $ref?: undefined;
            }
          | {
              $ref: string;
              type?: undefined;
              items?: undefined;
              cli?: undefined;
            }
        )[];
        description: string;
        link: string;
      };
      StaticObject: {
        type: string;
        additionalProperties: boolean;
        properties: {
          directory: {
            type: string;
            minLength: number;
            description: string;
            link: string;
          };
          staticOptions: {
            type: string;
            link: string;
            additionalProperties: boolean;
          };
          publicPath: {
            anyOf: (
              | {
                  type: string;
                  items: {
                    type: string;
                  };
                  minItems: number;
                }
              | {
                  type: string;
                  items?: undefined;
                  minItems?: undefined;
                }
            )[];
            description: string;
            link: string;
          };
          serveIndex: {
            anyOf: (
              | {
                  type: string;
                  cli: {
                    negatedDescription: string;
                  };
                  additionalProperties?: undefined;
                }
              | {
                  type: string;
                  additionalProperties: boolean;
                  cli?: undefined;
                }
            )[];
            description: string;
            link: string;
          };
          watch: {
            anyOf: (
              | {
                  type: string;
                  cli: {
                    negatedDescription: string;
                  };
                  description?: undefined;
                  link?: undefined;
                }
              | {
                  type: string;
                  description: string;
                  link: string;
                  cli?: undefined;
                }
            )[];
            description: string;
            link: string;
          };
        };
      };
      StaticString: {
        type: string;
        minLength: number;
      };
      WatchFiles: {
        anyOf: (
          | {
              type: string;
              items: {
                anyOf: {
                  $ref: string;
                }[];
              };
              $ref?: undefined;
            }
          | {
              $ref: string;
              type?: undefined;
              items?: undefined;
            }
        )[];
        description: string;
        link: string;
      };
      WatchFilesObject: {
        cli: {
          exclude: boolean;
        };
        type: string;
        properties: {
          paths: {
            anyOf: (
              | {
                  type: string;
                  items: {
                    type: string;
                    minLength: number;
                  };
                  minLength?: undefined;
                }
              | {
                  type: string;
                  minLength: number;
                  items?: undefined;
                }
            )[];
            description: string;
          };
          options: {
            type: string;
            description: string;
            link: string;
            additionalProperties: boolean;
          };
        };
        additionalProperties: boolean;
      };
      WatchFilesString: {
        type: string;
        minLength: number;
      };
      WebSocketServer: {
        anyOf: {
          $ref: string;
        }[];
        description: string;
        link: string;
      };
      WebSocketServerType: {
        enum: string[];
      };
      WebSocketServerEnum: {
        anyOf: (
          | {
              enum: boolean[];
              cli: {
                negatedDescription: string;
                exclude?: undefined;
              };
            }
          | {
              enum: string[];
              cli: {
                exclude: boolean;
                negatedDescription?: undefined;
              };
            }
        )[];
      };
      WebSocketServerFunction: {
        instanceof: string;
      };
      WebSocketServerObject: {
        type: string;
        properties: {
          type: {
            anyOf: {
              $ref: string;
            }[];
          };
          options: {
            type: string;
            additionalProperties: boolean;
            cli: {
              exclude: boolean;
            };
          };
        };
        additionalProperties: boolean;
      };
      WebSocketServerString: {
        type: string;
        minLength: number;
        cli: {
          exclude: boolean;
        };
      };
    };
    additionalProperties: boolean;
    properties: {
      allowedHosts: {
        $ref: string;
      };
      bonjour: {
        $ref: string;
      };
      client: {
        $ref: string;
      };
      compress: {
        $ref: string;
      };
      devMiddleware: {
        $ref: string;
      };
      headers: {
        $ref: string;
      };
      historyApiFallback: {
        $ref: string;
      };
      host: {
        $ref: string;
      };
      hot: {
        $ref: string;
      };
      ipc: {
        $ref: string;
      };
      liveReload: {
        $ref: string;
      };
      onListening: {
        $ref: string;
      };
      open: {
        $ref: string;
      };
      port: {
        $ref: string;
      };
      proxy: {
        $ref: string;
      };
      server: {
        $ref: string;
      };
      app: {
        $ref: string;
      };
      setupExitSignals: {
        $ref: string;
      };
      setupMiddlewares: {
        $ref: string;
      };
      static: {
        $ref: string;
      };
      watchFiles: {
        $ref: string;
      };
      webSocketServer: {
        $ref: string;
      };
    };
  };
  /**
   * @private
   * @returns {StatsOptions} default stats options
   */
  private static get DEFAULT_STATS();
  /**
   * @param {string} URL url
   * @returns {boolean} true when URL is absolute, otherwise false
   */
  static isAbsoluteURL(URL: string): boolean;
  /**
   * @param {string} gatewayOrFamily gateway or family
   * @param {boolean=} isInternal ip should be internal
   * @returns {string | undefined} resolved IP
   */
  static findIp(
    gatewayOrFamily: string,
    isInternal?: boolean | undefined,
  ): string | undefined;
  /**
   * @param {"v4" | "v6"} family family
   * @returns {Promise<string | undefined>} internal API
   */
  static internalIP(family: "v4" | "v6"): Promise<string | undefined>;
  /**
   * @param {"v4" | "v6"} family family
   * @returns {string | undefined} internal IP
   */
  static internalIPSync(family: "v4" | "v6"): string | undefined;
  /**
   * @param {Host} hostname hostname
   * @returns {Promise<string>} resolved hostname
   */
  static getHostname(hostname: Host): Promise<string>;
  /**
   * @param {Port} port port
   * @param {string} host host
   * @returns {Promise<number | string>} free port
   */
  static getFreePort(port: Port, host: string): Promise<number | string>;
  /**
   * @returns {string} path to cache dir
   */
  static findCacheDir(): string;
  /**
   * @private
   * @param {Compiler} compiler compiler
   * @returns {boolean} true when target is `web`, otherwise false
   */
  private static isWebTarget;
  /**
   * @param {Configuration<A, S>} options options
   * @param {Compiler | MultiCompiler} compiler compiler
   */
  constructor(options: Configuration<A, S>, compiler: Compiler | MultiCompiler);
  compiler: import("webpack").Compiler | import("webpack").MultiCompiler;
  /**
   * @type {ReturnType<Compiler["getInfrastructureLogger"]>}
   */
  logger: ReturnType<Compiler["getInfrastructureLogger"]>;
  options: Configuration<A, S>;
  /**
   * @type {FSWatcher[]}
   */
  staticWatchers: FSWatcher[];
  /**
   * @private
   * @type {{ name: string | symbol, listener: (...args: EXPECTED_ANY[]) => void}[] }}
   */
  private listeners;
  /**
   * @private
   * @type {RequestHandler[]}
   */
  private webSocketProxies;
  /**
   * @type {Socket[]}
   */
  sockets: Socket[];
  /**
   * @private
   * @type {string | undefined}
   */
  private currentHash;
  /**
   * @private
   * @param {Compiler} compiler compiler
   */
  private addAdditionalEntries;
  /**
   * @private
   * @returns {Compiler["options"]} compiler options
   */
  private getCompilerOptions;
  /**
   * @private
   * @returns {Promise<void>}
   */
  private normalizeOptions;
  /**
   * @private
   * @returns {string} client transport
   */
  private getClientTransport;
  /**
   * @template T
   * @private
   * @returns {T} server transport
   */
  private getServerTransport;
  /**
   * @returns {string}
   */
  getClientEntry(): string;
  /**
   * @returns {string | void} client hot entry
   */
  getClientHotEntry(): string | void;
  /**
   * @private
   * @returns {void}
   */
  private setupProgressPlugin;
  /**
   * @private
   * @returns {Promise<void>}
   */
  private initialize;
  /**
   * @private
   * @returns {Promise<void>}
   */
  private setupApp;
  /** @type {A | undefined} */
  app: A | undefined;
  /**
   * @private
   * @param {Stats | MultiStats} statsObj stats
   * @returns {StatsCompilation} stats of compilation
   */
  private getStats;
  /**
   * @private
   * @returns {void}
   */
  private setupHooks;
  /**
   * @private
   * @type {Stats | MultiStats}
   */
  private stats;
  /**
   * @private
   * @returns {void}
   */
  private setupWatchStaticFiles;
  /**
   * @private
   * @returns {void}
   */
  private setupWatchFiles;
  /**
   * @private
   * @returns {void}
   */
  private setupMiddlewares;
  /** @type {import("webpack-dev-middleware").API<Request, Response>} */
  middleware:
    | import("webpack-dev-middleware").API<
        import("express").Request<
          import("express-serve-static-core").ParamsDictionary,
          any,
          any,
          qs.ParsedQs,
          Record<string, any>
        >,
        import("express").Response<any, Record<string, any>>
      >
    | undefined;
  /**
   * @private
   * @returns {Promise<void>}
   */
  private createServer;
  /** @type {S | undefined} */
  server: S | undefined;
  isTlsServer: boolean | undefined;
  /**
   * @private
   * @returns {void}
   */
  private createWebSocketServer;
  /** @type {WebSocketServerImplementation | undefined | null} */
  webSocketServer: WebSocketServerImplementation | undefined | null;
  /**
   * @private
   * @param {string} defaultOpenTarget default open target
   * @returns {Promise<void>}
   */
  private openBrowser;
  /**
   * @private
   * @returns {void}
   */
  private runBonjour;
  /**
   * @private
   * @type {Bonjour | undefined}
   */
  private bonjour;
  /**
   * @private
   * @param {() => void} callback callback
   * @returns {void}
   */
  private stopBonjour;
  /**
   * @private
   * @returns {Promise<void>}
   */
  private logStatus;
  /**
   * @private
   * @param {Request} req request
   * @param {Response} res response
   * @param {NextFunction} next next function
   */
  private setHeaders;
  /**
   * @private
   * @param {string} value value
   * @returns {boolean} true when host allowed, otherwise false
   */
  private isHostAllowed;
  /**
   * @private
   * @param {{ [key: string]: string | undefined }} headers headers
   * @param {string} headerToCheck header to check
   * @param {boolean} validateHost need to validate host
   * @returns {boolean} true when host is valid, otherwise false
   */
  private isValidHost;
  /**
   * @private
   * @param {{ [key: string]: string | undefined }} headers headers
   * @returns {boolean} true when is same origin, otherwise false
   */
  private isSameOrigin;
  /**
   * @param {ClientConnection[]} clients clients
   * @param {string} type type
   * @param {EXPECTED_ANY=} data data
   * @param {EXPECTED_ANY=} params params
   */
  sendMessage(
    clients: ClientConnection[],
    type: string,
    data?: EXPECTED_ANY | undefined,
    params?: EXPECTED_ANY | undefined,
  ): void;
  /**
   * @private
   * @param {ClientConnection[]} clients clients
   * @param {StatsCompilation} stats stats
   * @param {boolean=} force force
   */
  private sendStats;
  /**
   * @param {string | string[]} watchPath watch path
   * @param {WatchOptions=} watchOptions watch options
   */
  watchFiles(
    watchPath: string | string[],
    watchOptions?: WatchOptions | undefined,
  ): void;
  /**
   * @param {import("webpack-dev-middleware").Callback=} callback callback
   */
  invalidate(
    callback?: import("webpack-dev-middleware").Callback | undefined,
  ): void;
  /**
   * @returns {Promise<void>}
   */
  start(): Promise<void>;
  /**
   * @param {((err?: Error) => void)=} callback callback
   */
  startCallback(callback?: ((err?: Error) => void) | undefined): void;
  /**
   * @returns {Promise<void>}
   */
  stop(): Promise<void>;
  /**
   * @param {((err?: Error) => void)=} callback callback
   */
  stopCallback(callback?: ((err?: Error) => void) | undefined): void;
}
declare namespace Server {
  export {
    Schema,
    Compiler,
    MultiCompiler,
    WebpackConfiguration,
    StatsOptions,
    StatsCompilation,
    Stats,
    MultiStats,
    NetworkInterfaceInfo,
    WatchOptions,
    FSWatcher,
    ConnectHistoryApiFallbackOptions,
    Bonjour,
    BonjourOptions,
    RequestHandler,
    HttpProxyMiddlewareOptions,
    HttpProxyMiddlewareOptionsFilter,
    ServeIndexOptions,
    ServeStaticOptions,
    IPv4,
    IPv6,
    Socket,
    HTTPServer,
    IncomingMessage,
    ServerResponse,
    OpenOptions,
    ExpressApplication,
    ExpressRequestHandler,
    ExpressErrorRequestHandler,
    ExpressRequest,
    ExpressResponse,
    EXPECTED_ANY,
    NextFunction,
    SimpleHandleFunction,
    NextHandleFunction,
    ErrorHandleFunction,
    HandleFunction,
    ServerOptions,
    Request,
    Response,
    DevMiddlewareOptions,
    DevMiddlewareContext,
    Host,
    Port,
    WatchFiles,
    Static,
    NormalizedStatic,
    ServerType,
    ServerConfiguration,
    WebSocketServerConfiguration,
    ClientConnection,
    WebSocketServer,
    WebSocketServerImplementation,
    ByPass,
    ProxyConfigArrayItem,
    ProxyConfigArray,
    OpenApp,
    Open,
    NormalizedOpen,
    WebSocketURL,
    OverlayMessageOptions,
    ClientConfiguration,
    Headers,
    MiddlewareHandler,
    MiddlewareObject,
    Middleware,
    BasicServer,
    Configuration,
    FunctionReturning,
    BasicApplication,
  };
}
type Schema = import("schema-utils/declarations/validate").Schema;
type Compiler = import("webpack").Compiler;
type MultiCompiler = import("webpack").MultiCompiler;
type WebpackConfiguration = import("webpack").Configuration;
type StatsOptions = import("webpack").StatsOptions;
type StatsCompilation = import("webpack").StatsCompilation;
type Stats = import("webpack").Stats;
type MultiStats = import("webpack").MultiStats;
type NetworkInterfaceInfo = import("os").NetworkInterfaceInfo;
type WatchOptions = import("chokidar").WatchOptions;
type FSWatcher = import("chokidar").FSWatcher;
type ConnectHistoryApiFallbackOptions =
  import("connect-history-api-fallback").Options;
type Bonjour = import("bonjour-service").Bonjour;
type BonjourOptions = import("bonjour-service").Service;
type RequestHandler = import("http-proxy-middleware").RequestHandler;
type HttpProxyMiddlewareOptions = import("http-proxy-middleware").Options;
type HttpProxyMiddlewareOptionsFilter = import("http-proxy-middleware").Filter;
type ServeIndexOptions = import("serve-index").Options;
type ServeStaticOptions = import("serve-static").ServeStaticOptions;
type IPv4 = import("ipaddr.js").IPv4;
type IPv6 = import("ipaddr.js").IPv6;
type Socket = import("net").Socket;
type HTTPServer = import("http").Server;
type IncomingMessage = import("http").IncomingMessage;
type ServerResponse = import("http").ServerResponse;
type OpenOptions = import("open").Options;
type ExpressApplication = import("express").Application;
type ExpressRequestHandler = import("express").RequestHandler;
type ExpressErrorRequestHandler = import("express").ErrorRequestHandler;
type ExpressRequest = import("express").Request;
type ExpressResponse = import("express").Response;
type EXPECTED_ANY = any;
type NextFunction = (err?: EXPECTED_ANY) => void;
type SimpleHandleFunction = (req: IncomingMessage, res: ServerResponse) => void;
type NextHandleFunction = (
  req: IncomingMessage,
  res: ServerResponse,
  next: NextFunction,
) => void;
type ErrorHandleFunction = (
  err: EXPECTED_ANY,
  req: IncomingMessage,
  res: ServerResponse,
  next: NextFunction,
) => void;
type HandleFunction =
  | SimpleHandleFunction
  | NextHandleFunction
  | ErrorHandleFunction;
type ServerOptions = import("https").ServerOptions & {
  spdy?: {
    plain?: boolean | undefined;
    ssl?: boolean | undefined;
    "x-forwarded-for"?: string | undefined;
    protocol?: string | undefined;
    protocols?: string[] | undefined;
  };
};
type Request<T extends BasicApplication = import("express").Application> =
  T extends ExpressApplication ? ExpressRequest : IncomingMessage;
type Response<T extends BasicApplication = import("express").Application> =
  T extends ExpressApplication ? ExpressResponse : ServerResponse;
type DevMiddlewareOptions<
  T extends Request,
  U extends Response,
> = import("webpack-dev-middleware").Options<T, U>;
type DevMiddlewareContext<
  T extends Request,
  U extends Response,
> = import("webpack-dev-middleware").Context<T, U>;
type Host = "local-ip" | "local-ipv4" | "local-ipv6" | string;
type Port = number | string | "auto";
type WatchFiles = {
  /**
   * paths
   */
  paths: string | string[];
  /**
   * options
   */
  options?:
    | (WatchOptions & {
        aggregateTimeout?: number;
        ignored?: WatchOptions["ignored"];
        poll?: number | boolean;
      })
    | undefined;
};
type Static = {
  /**
   * directory
   */
  directory?: string | undefined;
  /**
   * public path
   */
  publicPath?: (string | string[]) | undefined;
  /**
   * serve index
   */
  serveIndex?: (boolean | ServeIndexOptions) | undefined;
  /**
   * static options
   */
  staticOptions?: ServeStaticOptions | undefined;
  /**
   * watch and watch options
   */
  watch?:
    | (
        | boolean
        | (WatchOptions & {
            aggregateTimeout?: number;
            ignored?: WatchOptions["ignored"];
            poll?: number | boolean;
          })
      )
    | undefined;
};
type NormalizedStatic = {
  directory: string;
  publicPath: string[];
  serveIndex: false | ServeIndexOptions;
  staticOptions: ServeStaticOptions;
  watch: false | WatchOptions;
};
type ServerType<
  A extends BasicApplication = import("express").Application,
  S extends BasicServer = import("http").Server<
    typeof import("http").IncomingMessage,
    typeof import("http").ServerResponse
  >,
> =
  | "http"
  | "https"
  | "spdy"
  | "http2"
  | string
  | ((serverOptions: ServerOptions, application: A) => S);
type ServerConfiguration<
  A extends BasicApplication = import("express").Application,
  S extends BasicServer = import("http").Server<
    typeof import("http").IncomingMessage,
    typeof import("http").ServerResponse
  >,
> = {
  /**
   * type
   */
  type?: ServerType<A, S> | undefined;
  /**
   * options
   */
  options?: ServerOptions | undefined;
};
type WebSocketServerConfiguration = {
  /**
   * type
   */
  type?:
    | ("sockjs" | "ws" | string | (() => WebSocketServerConfiguration))
    | undefined;
  /**
   * options
   */
  options?: Record<string, EXPECTED_ANY> | undefined;
};
type ClientConnection = (
  | import("ws").WebSocket
  | (import("sockjs").Connection & {
      send: import("ws").WebSocket["send"];
      terminate: import("ws").WebSocket["terminate"];
      ping: import("ws").WebSocket["ping"];
    })
) & {
  isAlive?: boolean;
};
type WebSocketServer =
  | import("ws").WebSocketServer
  | (import("sockjs").Server & {
      close: import("ws").WebSocketServer["close"];
    });
type WebSocketServerImplementation = {
  implementation: WebSocketServer;
  clients: ClientConnection[];
};
type ByPass = (
  req: Request,
  res: Response,
  proxyConfig: ProxyConfigArrayItem,
) => any;
type ProxyConfigArrayItem = {
  path?: HttpProxyMiddlewareOptionsFilter | undefined;
  context?: HttpProxyMiddlewareOptionsFilter | undefined;
} & {
  bypass?: ByPass;
} & HttpProxyMiddlewareOptions;
type ProxyConfigArray = (
  | ProxyConfigArrayItem
  | ((
      req?: Request | undefined,
      res?: Response | undefined,
      next?: NextFunction | undefined,
    ) => ProxyConfigArrayItem)
)[];
type OpenApp = {
  name?: string | undefined;
  arguments?: string[] | undefined;
};
type Open = {
  app?: (string | string[] | OpenApp) | undefined;
  /**
   * target
   */
  target?: (string | string[]) | undefined;
};
type NormalizedOpen = {
  target: string;
  options: import("open").Options;
};
type WebSocketURL = {
  /**
   * hostname
   */
  hostname?: string | undefined;
  /**
   * password
   */
  password?: string | undefined;
  /**
   * pathname
   */
  pathname?: string | undefined;
  /**
   * port
   */
  port?: (number | string) | undefined;
  /**
   * protocol
   */
  protocol?: string | undefined;
  /**
   * username
   */
  username?: string | undefined;
};
type OverlayMessageOptions = boolean | ((error: Error) => void);
type ClientConfiguration = {
  /**
   * logging
   */
  logging?:
    | ("log" | "info" | "warn" | "error" | "none" | "verbose")
    | undefined;
  /**
   * overlay
   */
  overlay?:
    | (
        | boolean
        | {
            warnings?: OverlayMessageOptions;
            errors?: OverlayMessageOptions;
            runtimeErrors?: OverlayMessageOptions;
          }
      )
    | undefined;
  /**
   * progress
   */
  progress?: boolean | undefined;
  /**
   * reconnect
   */
  reconnect?: (boolean | number) | undefined;
  /**
   * web socket transport
   */
  webSocketTransport?: ("ws" | "sockjs" | string) | undefined;
  /**
   * web socket URL
   */
  webSocketURL?: (string | WebSocketURL) | undefined;
};
type Headers =
  | Array<{
      key: string;
      value: string;
    }>
  | Record<string, string | string[]>;
type MiddlewareHandler<
  T extends BasicApplication = import("express").Application,
> = T extends ExpressApplication
  ? ExpressRequestHandler | ExpressErrorRequestHandler
  : HandleFunction;
type MiddlewareObject = {
  name?: string;
  path?: string;
  middleware: MiddlewareHandler;
};
type Middleware = MiddlewareObject | MiddlewareHandler;
type BasicServer = import("net").Server | import("tls").Server;
type Configuration<
  A extends BasicApplication = import("express").Application,
  S extends BasicServer = import("http").Server<
    typeof import("http").IncomingMessage,
    typeof import("http").ServerResponse
  >,
> = {
  ipc?: (boolean | string) | undefined;
  host?: Host | undefined;
  port?: Port | undefined;
  hot?: (boolean | "only") | undefined;
  liveReload?: boolean | undefined;
  devMiddleware?: DevMiddlewareOptions<Request, Response> | undefined;
  compress?: boolean | undefined;
  allowedHosts?: ("auto" | "all" | string | string[]) | undefined;
  historyApiFallback?: (boolean | ConnectHistoryApiFallbackOptions) | undefined;
  bonjour?: (boolean | Record<string, never> | BonjourOptions) | undefined;
  watchFiles?:
    | (string | string[] | WatchFiles | Array<string | WatchFiles>)
    | undefined;
  static?: (boolean | string | Static | Array<string | Static>) | undefined;
  server?: (ServerType<A, S> | ServerConfiguration<A, S>) | undefined;
  app?: (() => Promise<A>) | undefined;
  webSocketServer?:
    | (boolean | "sockjs" | "ws" | string | WebSocketServerConfiguration)
    | undefined;
  proxy?: ProxyConfigArray | undefined;
  open?: (boolean | string | Open | Array<string | Open>) | undefined;
  setupExitSignals?: boolean | undefined;
  client?: (boolean | ClientConfiguration) | undefined;
  headers?:
    | (
        | Headers
        | ((
            req: Request,
            res: Response,
            context: DevMiddlewareContext<Request, Response> | undefined,
          ) => Headers)
      )
    | undefined;
  onListening?: ((devServer: Server<A, S>) => void) | undefined;
  setupMiddlewares?:
    | ((middlewares: Middleware[], devServer: Server<A, S>) => Middleware[])
    | undefined;
};
type FunctionReturning<T> = () => T;
type BasicApplication = {
  use: typeof useFn;
};
/**
 * @overload
 * @param {NextHandleFunction} fn function
 * @returns {BasicApplication} application
 */
declare function useFn(fn: NextHandleFunction): BasicApplication;
/**
 * @overload
 * @param {HandleFunction} fn function
 * @returns {BasicApplication} application
 */
declare function useFn(fn: HandleFunction): BasicApplication;
/**
 * @overload
 * @param {string} route route
 * @param {NextHandleFunction} fn function
 * @returns {BasicApplication} application
 */
declare function useFn(route: string, fn: NextHandleFunction): BasicApplication;

// DO NOT REMOVE THIS!
type DevServerConfiguration = Configuration;
declare module "webpack" {
  interface Configuration {
    /**
     * Can be used to configure the behaviour of webpack-dev-server when
     * the webpack config is passed to webpack-dev-server CLI.
     */
    devServer?: DevServerConfiguration | undefined;
  }
}
