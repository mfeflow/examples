import { RemoteBoundary } from '@mfeflow/runtime';

export function ActivityRoute() {
  return <RemoteBoundary id="activity/App" loading={<p>Loading activity…</p>} />;
}
