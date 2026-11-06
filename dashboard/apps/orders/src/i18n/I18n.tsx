import { useEffect, useState, type ReactNode } from 'react';
import { getI18n, initI18n } from '@mfeflow/i18n';
import { defaultLanguage, languages } from './config';

function started(): boolean {
  try {
    getI18n();
    return true;
  } catch {
    return false;
  }
}

/**
 * Wraps this remote's App. Inside the shell the page already has an i18n instance; on its own the
 * remote starts one. The children render once it is there, so they can call useMfeTranslation.
 */
export function I18n({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(started);
  useEffect(() => {
    if (ready) return;
    void initI18n({ languages, defaultLanguage, detect: false }).then(() => {
      setReady(true);
    });
  }, [ready]);
  return ready ? children : null;
}
