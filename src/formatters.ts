import pc from "picocolors";

const UNITS = ["µs", "ms", "s"];
const durationFormatter = Intl.NumberFormat(undefined, {
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

  return `${durationFormatter.format(duration)}${UNITS[unitIndex]}`;
}

export function method(method: string): string {
  switch (method) {
    case "GET":
      return pc.green("GET");

    case "POST":
      return pc.blue("POST");

    case "PUT":
      return pc.yellow("PUT");

    case "DELETE":
      return pc.red("DELETE");

    case "PATCH":
      return pc.magenta("PATCH");

    case "OPTIONS":
      return pc.cyan("OPTIONS");

    case "HEAD":
      return pc.gray("HEAD");

    default:
      return method;
  }
}

export function status(
  status: number | string | undefined,
): string | undefined {
  switch (status) {
    case 200:
      return pc.green(status);

    case 201:
      return pc.blue(status);

    case 204:
      return pc.yellow(status);

    case 400:
      return pc.red(status);

    case 401:
      return pc.magenta(status);

    case 403:
      return pc.cyan(status);

    case 404:
      return pc.gray(status);

    case 500:
      return pc.gray(status);

    default:
      return String(status);
  }
}
