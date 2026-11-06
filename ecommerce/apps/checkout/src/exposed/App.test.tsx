import { act, fireEvent, screen } from '@testing-library/react';
import { publish, subscribe } from '@mfeflow/event-bus';
import { renderWithPlatform } from '@mfeflow/testing';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

const lines = [{ sku: 'mug-01', name: 'Enamel mug', priceCents: 1800, qty: 2 }];

describe('the exposed App', () => {
  it('links back to the cart when there is nothing to pay for', () => {
    renderWithPlatform(<App />);
    expect(screen.getByRole('link', { name: 'Back to the cart' }).getAttribute('href')).toBe(
      '/cart',
    );
  });

  it('places the order and publishes order.placed.v1 with the total', () => {
    const heard = vi.fn();
    const stop = subscribe('order.placed.v1', heard);
    renderWithPlatform(<App />);
    act(() => {
      publish('cart.lines.v1', { lines });
    });
    expect(screen.getByText('1 item(s), total $36.00')).toBeDefined();
    fireEvent.click(screen.getByRole('button', { name: 'Place order' }));
    expect(heard).toHaveBeenCalledExactlyOnceWith({ totalCents: 3600 });
    expect(screen.getByRole('status').textContent).toBe('Order placed. You paid $36.00.');
    stop();
  });
});
