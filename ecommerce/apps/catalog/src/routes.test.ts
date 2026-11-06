import { describe, expect, it } from 'vitest';
import { links, routes } from './routes';

describe('the catalog routes', () => {
  it('are served under /catalog', () => {
    expect(routes.mount).toBe('/catalog');
    expect(links.href('catalog.home')).toBe('/catalog');
  });
});
