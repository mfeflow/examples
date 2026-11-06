import { useEffect, useState, type MouseEvent } from 'react';
import { DevOverlay } from '@mfeflow/runtime';
import { routes, type RouteEntry } from './remotes/route-table';
import { Analytics } from './analytics/Analytics';
import { Theme } from './theme/Theme';
import { Languages } from './i18n/Languages';
import { Query } from './query/Query';

function usePath(): [string, (event: MouseEvent<HTMLAnchorElement>) => void] {
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    const onPop = () => {
      setPath(location.pathname);
    };
    addEventListener('popstate', onPop);
    return () => {
      removeEventListener('popstate', onPop);
    };
  }, []);
  const go = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    history.pushState(null, '', event.currentTarget.href);
    setPath(location.pathname);
  };
  return [path, go];
}

const matches = (route: RouteEntry, path: string) =>
  route.path === '/' ? path === '/' : path === route.path || path.startsWith(`${route.path}/`);

export function App() {
  const [path, go] = usePath();
  const current = routes.find((route) => matches(route, path));
  return (
    <Query>
      <Languages>
        <Theme>
          <Analytics>
            <>
              <header>
                <strong>shell</strong>
                <nav>
                  {routes.map((route) => (
                    <a key={route.path} href={route.path} onClick={go}>
                      {route.path === '/' ? 'home' : route.path.slice(1)}
                    </a>
                  ))}
                </nav>
              </header>
              <main>{current ? <current.Component /> : <p>Nothing at {path}.</p>}</main>
              <DevOverlay enabled={process.env.NODE_ENV !== 'production'} />
            </>
          </Analytics>
        </Theme>
      </Languages>
    </Query>
  );
}
