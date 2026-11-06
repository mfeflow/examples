import { afterEach, describe, expect, it } from 'vitest';
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

describe('the links under a base path', () => {
  afterEach(() => {
    Reflect.deleteProperty(globalThis, '__MFE_RUNTIME_CONFIG__');
  });

  it('follow basePath from the runtime config', () => {
    Reflect.set(globalThis, '__MFE_RUNTIME_CONFIG__', { basePath: '/examples' });
    expect(links.href('cart.home')).toBe('/examples/cart');
    expect(links.href('checkout.home')).toBe('/examples/checkout');
  });
});
