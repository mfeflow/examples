import { fireEvent, screen } from '@testing-library/react';
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

describe('the orders widget', () => {
  it('lists the orders the API answers with', async () => {
    renderInShell(<App />);
    expect(await screen.findByText('Asha')).toBeDefined();
    expect(screen.getByText('$230.00')).toBeDefined();
    expect(screen.getByRole('heading', { name: 'Recent orders' })).toBeDefined();
  });

  it('filters by status and reports the choice to analytics', async () => {
    const provider = createRecordingProvider();
    initAnalytics(provider);
    renderInShell(<App />);
    await screen.findByText('Asha');
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'refunded' } });
    expect(screen.queryByText('Asha')).toBeNull();
    expect(screen.getByText('Dara')).toBeDefined();
    expect(provider.calls.at(-1)).toMatchObject({
      type: 'track',
      event: 'orders_filtered',
      params: { status: 'refunded', mfe_name: 'orders' },
    });
  });

  it('tracks that it was viewed', async () => {
    const provider = createRecordingProvider();
    initAnalytics(provider);
    renderInShell(<App />);
    await screen.findByText('Asha');
    expect(
      provider.calls.some((call) => call.type === 'track' && call.event === 'orders_viewed'),
    ).toBe(true);
  });

  it('follows a language change', async () => {
    renderInShell(<App />);
    await screen.findByText('Asha');
    await getI18n().changeLanguage('ar');
    expect(await screen.findByRole('heading', { name: 'الطلبات الأخيرة' })).toBeDefined();
  });

  it('reads the shell cache and makes no request of its own when the orders are already there', async () => {
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
    expect(await screen.findByText('Asha')).toBeDefined();
    expect(requests).toBe(0);
  });

  it('says so when the API fails', async () => {
    server.use(http.get('*/api/orders.json', () => HttpResponse.json({}, { status: 500 })));
    renderInShell(<App />);
    expect(await screen.findByRole('alert')).toBeDefined();
  });
});
