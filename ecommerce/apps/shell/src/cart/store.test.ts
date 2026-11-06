import { publish, resetEventBusForTests, subscribe } from '@mfeflow/event-bus';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { configureShellEvents } from '../events';
import { startCartStore } from './store';

afterEach(resetEventBusForTests);

const mug = { sku: 'mug-01', name: 'Enamel mug', priceCents: 1800 };

describe('the cart store', () => {
  it('publishes the cart each time the catalog adds an item', () => {
    const stop = startCartStore();
    const heard = vi.fn();
    subscribe('cart.lines.v1', heard, { replay: false });
    publish('cart.item-added.v1', mug);
    publish('cart.item-added.v1', mug);
    expect(heard).toHaveBeenLastCalledWith({ lines: [{ ...mug, qty: 2 }] });
    stop();
  });

  it('empties the cart when an order is placed', () => {
    const stop = startCartStore();
    const heard = vi.fn();
    subscribe('cart.lines.v1', heard, { replay: false });
    publish('cart.item-added.v1', mug);
    publish('order.placed.v1', { totalCents: 1800 });
    expect(heard).toHaveBeenLastCalledWith({ lines: [] });
    stop();
  });

  it('hands the latest cart to a remote that mounts late', () => {
    configureShellEvents();
    const stop = startCartStore();
    publish('cart.item-added.v1', mug);
    const late = vi.fn();
    subscribe('cart.lines.v1', late);
    expect(late).toHaveBeenCalledExactlyOnceWith({ lines: [{ ...mug, qty: 1 }] });
    stop();
  });

  it('stops listening when stopped', () => {
    const stop = startCartStore();
    stop();
    const heard = vi.fn();
    subscribe('cart.lines.v1', heard, { replay: false });
    publish('cart.item-added.v1', mug);
    expect(heard).not.toHaveBeenCalled();
  });
});
