import { describe, expect, it } from 'vitest';
import { links, routes } from './routes';

describe('the checkout routes', () => {
  it('are served under /checkout', () => {
    expect(routes.mount).toBe('/checkout');
    expect(links.href('checkout.home')).toBe('/checkout');
  });
});
