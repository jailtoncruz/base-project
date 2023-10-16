export function buildAppURL(...parts: string[]) {
  let url = process.env.APP_URL;

  parts.forEach((part) => (url = url.concat(part)));
  return url;
}
