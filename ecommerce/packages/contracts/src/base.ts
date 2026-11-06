/**
 * The path the shell is served under, from `basePath` in the runtime config: '' at the root of a
 * host, '/examples' on GitHub Pages. Read on every call because the config loads after the remotes.
 */
export function basePath(): string {
  const config: unknown = Reflect.get(globalThis, '__MFE_RUNTIME_CONFIG__');
  const value: unknown =
    typeof config === 'object' && config !== null ? Reflect.get(config, 'basePath') : undefined;
  return typeof value === 'string' ? value.replace(/\/$/, '') : '';
}

/** A route path under the base: withBase('/cart', '/examples') is '/examples/cart'. */
export function withBase(path: string, base: string = basePath()): string {
  return `${base}${path}`;
}

/** The route path for a URL pathname: stripBase('/examples/cart', '/examples') is '/cart'. */
export function stripBase(pathname: string, base: string = basePath()): string {
  if (base === '' || !(pathname === base || pathname.startsWith(`${base}/`))) return pathname;
  return pathname.slice(base.length) || '/';
}
