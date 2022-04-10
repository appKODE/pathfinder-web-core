export function getPath(path: string, matcher: RegExp): string | null {
  const res = path.match(matcher);

  return res ? res?.[0] : null;
}
