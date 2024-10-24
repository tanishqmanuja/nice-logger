import pc from "picocolors";
import type { Formatter } from "picocolors/types";

/* Formatter for DURATION */

const UNITS = ["µs", "ms", "s"];
const DURATION_FORMATTER = Intl.NumberFormat(undefined, {
  maximumFractionDigits: 2,
});

export function duration(duration: number | null): string {
  if (!duration) {
    return "-/-";
  }
  let unitIndex = 0;
  while (duration >= 1000 && unitIndex < UNITS.length - 1) {
    duration /= 1000;
    unitIndex++;
  }

  return `${DURATION_FORMATTER.format(duration)}${UNITS[unitIndex]}`;
}

/* Formatter for METHOD */

const METHOD_COLOR_LUT = {
  GET: pc.green,
  POST: pc.blue,
  PUT: pc.yellow,
  DELETE: pc.red,
  PATCH: pc.magenta,
  OPTIONS: pc.cyan,
  HEAD: pc.gray,
};

export function method(method: string): string {
  const colorer = (METHOD_COLOR_LUT as Record<string, Formatter>)[
    method.toUpperCase()
  ];

  if (colorer) {
    return colorer(method);
  } else {
    return method;
  }
}

/* Formatter for STATUS */

const STATUS_COLOR_LUT = {
  200: pc.green,
  201: pc.blue,
  204: pc.yellow,
  400: pc.red,
  401: pc.magenta,
  403: pc.cyan,
  404: pc.gray,
  500: pc.gray,
};

export function status(status: string | number | undefined): string {
  if (status === undefined) {
    return "";
  }

  const colorer = (STATUS_COLOR_LUT as Record<number, Formatter>)[+status];

  if (colorer) {
    return colorer(status);
  } else {
    return status.toString();
  }
}
