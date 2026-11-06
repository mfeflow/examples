import { createRecordingProvider, initAnalytics, resetAnalyticsForTests } from '@mfeflow/analytics';
import { afterEach, describe, expect, it } from 'vitest';
import { tracker } from './analytics';

afterEach(resetAnalyticsForTests);

describe('the revenue tracker', () => {
  it('stamps its events with the remote name', () => {
    const provider = createRecordingProvider();
    initAnalytics(provider);
    tracker.track('revenue_viewed');
    expect(provider.calls.at(-1)).toMatchObject({
      type: 'track',
      event: 'revenue_viewed',
      params: { mfe_name: 'revenue', mfe_version: null },
    });
  });
});
