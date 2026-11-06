import { afterEach, describe, expect, it } from 'vitest';
import { links, routes } from './routes';

describe('the checkout routes', () => {
  it('are served under /checkout', () => {
    expect(routes.mount).toBe('/checkout');
    expect(links.href('checkout.home')).toBe('/checkout');
  });
});

describe('the links under a base path', () => {
  afterEach(() => {
    Reflect.deleteProperty(globalThis, '__MFE_RUNTIME_CONFIG__');
  });

  it('follow basePath from the runtime config', () => {
    Reflect.set(globalThis, '__MFE_RUNTIME_CONFIG__', { basePath: '/examples' });
    expect(links.href('checkout.home')).toBe('/examples/checkout');
    expect(links.href('cart.home')).toBe('/examples/cart');
  });
});
