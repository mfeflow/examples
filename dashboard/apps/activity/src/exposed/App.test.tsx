import { screen } from '@testing-library/react';
import { createRecordingProvider, initAnalytics, resetAnalyticsForTests } from '@mfeflow/analytics';
import { getI18n } from '@mfeflow/i18n';
import { http, HttpResponse } from 'msw';
import { afterEach, describe, expect, it } from 'vitest';
import { server } from '../mocks/server';
import { renderInShell } from '../test/render';
import App from './App';

afterEach(resetAnalyticsForTests);

describe('the activity widget', () => {
  it('lists the events the API answers with', async () => {
    renderInShell(<App />);
    expect(await screen.findByText(/Asha paid order A-1001/)).toBeDefined();
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });

  it('says so when there is no activity', async () => {
    server.use(http.get('*/api/activity.json', () => HttpResponse.json({ events: [] })));
    renderInShell(<App />);
    expect(await screen.findByText('Nothing yet.')).toBeDefined();
  });

  it('tracks that it was viewed', async () => {
    const provider = createRecordingProvider();
    initAnalytics(provider);
    renderInShell(<App />);
    await screen.findByText(/Asha paid/);
    expect(
      provider.calls.some((call) => call.type === 'track' && call.event === 'activity_viewed'),
    ).toBe(true);
  });

  it('follows a language change', async () => {
    renderInShell(<App />);
    await screen.findByText(/Asha paid/);
    await getI18n().changeLanguage('ar');
    expect(await screen.findByRole('heading', { name: 'النشاط' })).toBeDefined();
  });

  it('says so when the API fails', async () => {
    server.use(http.get('*/api/activity.json', () => HttpResponse.json({}, { status: 500 })));
    renderInShell(<App />);
    expect(await screen.findByRole('alert')).toBeDefined();
  });
});
