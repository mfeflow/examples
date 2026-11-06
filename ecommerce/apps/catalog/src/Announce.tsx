import { useEffect, type ReactNode } from 'react';
import { announceReady } from './events';

/** Tells the other remotes that catalog is on the page, each time it mounts. */
export function Announce({ children }: { children: ReactNode }) {
  useEffect(() => {
    announceReady();
  }, []);
  return <>{children}</>;
}
