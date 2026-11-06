import { createTracker } from '@mfeflow/analytics';

// Every event this remote sends, with its parameters. The map is merged into the platform's, so
// tracker.track('activity_viewed') is checked here and nowhere else.
declare module '@mfeflow/analytics' {
  interface AnalyticsEvents {
    activity_viewed: undefined;
  }
}

export const events = ['activity_viewed'] as const;

export const tracker = createTracker('activity', { events });
