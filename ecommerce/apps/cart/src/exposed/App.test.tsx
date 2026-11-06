import { act, screen } from '@testing-library/react';
import { publish } from '@mfeflow/event-bus';
import { renderWithPlatform } from '@mfeflow/testing';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('the exposed App', () => {
  it('starts empty', () => {
    renderWithPlatform(<App />);
    expect(screen.getByText('Your cart is empty.')).toBeDefined();
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('shows the lines the shell publishes, with a total and a checkout link', () => {
    renderWithPlatform(<App />);
    act(() => {
      publish('cart.lines.v1', {
        lines: [
          { sku: 'mug-01', name: 'Enamel mug', priceCents: 1800, qty: 2 },
          { sku: 'bag-02', name: 'Canvas tote', priceCents: 2400, qty: 1 },
        ],
      });
    });
    expect(screen.getByText('2 x Enamel mug ($36.00)')).toBeDefined();
    expect(screen.getByText('Total $60.00')).toBeDefined();
    expect(screen.getByRole('link', { name: 'Go to checkout' }).getAttribute('href')).toBe(
      '/checkout',
    );
  });
});
