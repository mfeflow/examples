import { fireEvent, screen } from '@testing-library/react';
import { subscribe } from '@mfeflow/event-bus';
import { renderWithPlatform } from '@mfeflow/testing';
import { http, HttpResponse } from 'msw';
import { describe, expect, it, vi } from 'vitest';
import { server } from '../mocks/server';
import App from './App';

describe('the exposed App', () => {
  it('lists the products the API answers with', async () => {
    renderWithPlatform(<App />);
    expect(await screen.findByText('Enamel mug')).toBeDefined();
    expect(screen.getByText('$24.00')).toBeDefined();
  });

  it('publishes cart.item-added.v1 when Add to cart is clicked', async () => {
    const heard = vi.fn();
    const stop = subscribe('cart.item-added.v1', heard);
    renderWithPlatform(<App />);
    fireEvent.click(await screen.findByRole('button', { name: 'Add Enamel mug to cart' }));
    expect(heard).toHaveBeenCalledExactlyOnceWith({
      sku: 'mug-01',
      name: 'Enamel mug',
      priceCents: 1800,
    });
    stop();
  });

  it('says so when the API fails', async () => {
    server.use(http.get('*/api/products.json', () => HttpResponse.json({}, { status: 500 })));
    renderWithPlatform(<App />);
    expect(await screen.findByRole('alert', {}, { timeout: 5000 })).toBeDefined();
  });

  it('links to the cart through route-factory', async () => {
    renderWithPlatform(<App />);
    const link = await screen.findByRole('link', { name: 'Go to the cart' });
    expect(link.getAttribute('href')).toBe('/cart');
  });
});
