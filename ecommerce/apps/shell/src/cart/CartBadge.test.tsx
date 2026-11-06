import { act, fireEvent, screen } from '@testing-library/react';
import { publish, resetEventBusForTests } from '@mfeflow/event-bus';
import { renderWithPlatform } from '@mfeflow/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { configureShellEvents } from '../events';
import { CartBadge } from './CartBadge';
import { startCartStore } from './store';

afterEach(resetEventBusForTests);

describe('CartBadge', () => {
  it('counts the items the catalog adds', () => {
    configureShellEvents();
    const stop = startCartStore();
    renderWithPlatform(<CartBadge />);
    expect(screen.getByText('Cart (0)')).toBeDefined();
    act(() => {
      publish('cart.item-added.v1', { sku: 'mug-01', name: 'Enamel mug', priceCents: 1800 });
      publish('cart.item-added.v1', { sku: 'mug-01', name: 'Enamel mug', priceCents: 1800 });
    });
    expect(screen.getByText('Cart (2)')).toBeDefined();
    stop();
  });

  it('opens the cart without a page load, and tells the shell', () => {
    const heard: string[] = [];
    const listen = () => heard.push(location.pathname);
    addEventListener('popstate', listen);
    renderWithPlatform(<CartBadge />);
    expect(fireEvent.click(screen.getByRole('link'))).toBe(false);
    expect(heard).toEqual(['/cart']);
    removeEventListener('popstate', listen);
  });
});
