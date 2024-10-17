import { Elysia } from "elysia";
import pc from "picocolors";

import * as fmt from "./formatters";

const REQUEST_START_TIME_KEY = "@tqman/nice-logger/request-start-time";

export interface LoggerOptions {
  /**
   * Determine whether logging is enabled
   *
   * @default NODE_ENV !== 'production'
   */
  enabled?: boolean;
  /**
   * Determines the mode of the logger
   *
   * - 'live' - logs every request and response
   * - 'combined' - logs request and response in a single line
   *
   * @default 'combined'
   */
  mode?: "combined" | "live";
  /**
   * Whether to print timestamp at the beginning of each line
   *
   * @default false
   */
  withTimestamp?: boolean;
  /**
   *  Whether to print banner at the beginning of each line
   *
   * @default false
   */
  withBanner?: boolean;
}

/**
 * A Nice and Simple logger plugin for Elysia
 */
export const logger = (options: LoggerOptions = {}) => {
  const { enabled = process.env.NODE_ENV !== "production", mode = "combined" } =
    options;

  const app = new Elysia({
    name: "@tqman/nice-logger",
    seed: options,
  });

  if (!enabled) return app;

  const getTimestamp = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  app
    .onStart(ctx => {
      if (!options.withBanner) {
        return;
      }

      const ELYSIA_VERSION = import.meta.require("elysia/package.json").version;
      console.log(`🦊 ${pc.green(`${pc.bold("Elysia")} v${ELYSIA_VERSION}`)}`);
      console.log(
        `${pc.green(" ➜ ")} ${pc.bold("Server")}:   ${pc.cyan(String(ctx.server?.url))}\n`,
      );
    })
    .onRequest(ctx => {
      ctx.store = {
        ...ctx.store,
        [REQUEST_START_TIME_KEY]: process.hrtime.bigint(),
      };

      if (mode === "live") {
        const url = new URL(ctx.request.url);

        const components = [
          options.withTimestamp ? pc.dim(`[${getTimestamp()}]`) : "",
          pc.blue("--->"),
          pc.bold(fmt.method(ctx.request.method)),
          url.pathname,
        ];
        console.log(components.join(" "));
      }
    })
    .onAfterResponse(({ request, set, response, store }) => {
      if (response instanceof Error) {
        return;
      }

      const url = new URL(request.url);
      const duration =
        Number(
          process.hrtime.bigint() - (store as any)[REQUEST_START_TIME_KEY],
        ) / 1000;

      const sign = mode === "combined" ? pc.green("✓") : pc.green("<---");
      const components = [
        options.withTimestamp ? pc.dim(`[${getTimestamp()}]`) : "",
        sign,
        pc.bold(fmt.method(request.method)),
        url.pathname,
        fmt.status(set.status),
        pc.dim(`[${fmt.duration(duration)}]`),
      ];
      console.log(components.join(" "));
    })
    .onError(({ request, error, store }) => {
      const url = new URL(request.url);
      const duration = (store as any)[REQUEST_START_TIME_KEY]
        ? Number(
            process.hrtime.bigint() - (store as any)[REQUEST_START_TIME_KEY],
          ) / 1000
        : null;
      const status = "status" in error ? error.status : 500;

      const sign = mode === "combined" ? pc.red("✗") : pc.red("<-x-");
      const components = [
        options.withTimestamp ? pc.dim(`[${getTimestamp()}]`) : "",
        sign,
        pc.bold(fmt.method(request.method)),
        url.pathname,
        fmt.status(status),
        pc.dim(`[${fmt.duration(duration)}]`),
      ];
      console.log(components.join(" "));
    });

  return app.as("plugin");
};
