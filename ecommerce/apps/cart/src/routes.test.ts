import { describe, expect, it } from 'vitest';
import { links, routes } from './routes';

describe('the cart routes', () => {
  it('are served under /cart', () => {
    expect(routes.mount).toBe('/cart');
    expect(links.href('cart.home')).toBe('/cart');
  });
});

describe('the links from cart to checkout', () => {
  it('are built from the checkout contract', () => {
    expect(links.href('checkout.home')).toBe('/checkout');
  });
});
