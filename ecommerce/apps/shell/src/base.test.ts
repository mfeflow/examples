import { afterEach, describe, expect, it } from 'vitest';
import { basePath, stripBase, withBase } from '@ecommerce/contracts/base';

const KEY = '__MFE_RUNTIME_CONFIG__';

afterEach(() => {
  Reflect.deleteProperty(globalThis, KEY);
});

describe('basePath', () => {
  it('is empty without a runtime config', () => {
    expect(basePath()).toBe('');
  });

  it('reads basePath from the runtime config and drops a trailing slash', () => {
    Reflect.set(globalThis, KEY, { basePath: '/examples/' });
    expect(basePath()).toBe('/examples');
  });

  it('is empty when the config has none', () => {
    Reflect.set(globalThis, KEY, { environment: 'prod' });
    expect(basePath()).toBe('');
  });
});

describe('withBase', () => {
  it('puts the base in front of a route path', () => {
    expect(withBase('/cart', '/examples')).toBe('/examples/cart');
    expect(withBase('/cart', '')).toBe('/cart');
  });

  it('uses the base from the runtime config by default', () => {
    Reflect.set(globalThis, KEY, { basePath: '/examples' });
    expect(withBase('/')).toBe('/examples/');
  });
});

describe('stripBase', () => {
  it('turns a URL pathname into a route path', () => {
    expect(stripBase('/examples/cart', '/examples')).toBe('/cart');
    expect(stripBase('/examples/', '/examples')).toBe('/');
    expect(stripBase('/examples', '/examples')).toBe('/');
  });

  it('leaves other paths alone', () => {
    expect(stripBase('/cart', '')).toBe('/cart');
    expect(stripBase('/examples-other/cart', '/examples')).toBe('/examples-other/cart');
  });
});
