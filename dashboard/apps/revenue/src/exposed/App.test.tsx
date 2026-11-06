import { screen } from '@testing-library/react';
import { createRecordingProvider, initAnalytics, resetAnalyticsForTests } from '@mfeflow/analytics';
import { getI18n } from '@mfeflow/i18n';
import { QueryClient } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { afterEach, describe, expect, it } from 'vitest';
import { sampleOrders } from '../mocks/handlers';
import { server } from '../mocks/server';
import { sharedKeys } from '../query/keys';
import { renderInShell } from '../test/render';
import App from './App';

afterEach(resetAnalyticsForTests);

describe('the revenue widget', () => {
  it('shows what the paid orders add up to', async () => {
    renderInShell(<App />);
    expect(await screen.findByText('$515.00')).toBeDefined();
    expect(screen.getByText('$171.67')).toBeDefined();
    expect(screen.getByText('$78.00')).toBeDefined();
  });

  it('shares the orders key with the orders widget, so the shell cache answers it', async () => {
    let requests = 0;
    server.use(
      http.get('*/api/orders.json', () => {
        requests += 1;
        return HttpResponse.json({ orders: [] });
      }),
    );
    const client = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } });
    client.setQueryData(sharedKeys.orders, sampleOrders);
    renderInShell(<App />, client);
    expect(await screen.findByText('$515.00')).toBeDefined();
    expect(requests).toBe(0);
  });

  it('tracks that it was viewed', async () => {
    const provider = createRecordingProvider();
    initAnalytics(provider);
    renderInShell(<App />);
    await screen.findByText('$515.00');
    expect(
      provider.calls.some((call) => call.type === 'track' && call.event === 'revenue_viewed'),
    ).toBe(true);
  });

  it('follows a language change', async () => {
    renderInShell(<App />);
    await screen.findByText('$515.00');
    await getI18n().changeLanguage('ar');
    expect(await screen.findByRole('heading', { name: 'الإيرادات' })).toBeDefined();
  });

  it('says so when the API fails', async () => {
    server.use(http.get('*/api/orders.json', () => HttpResponse.json({}, { status: 500 })));
    renderInShell(<App />);
    expect(await screen.findByRole('alert')).toBeDefined();
  });
});
