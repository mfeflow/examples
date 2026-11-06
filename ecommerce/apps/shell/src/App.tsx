import { useEffect, useState, type MouseEvent } from 'react';
import { stripBase, withBase } from '@ecommerce/contracts/base';
import { DevOverlay } from '@mfeflow/runtime';
import { CartBadge } from './cart/CartBadge';
import { routes, type RouteEntry } from './remotes/route-table';
import { Theme } from './theme/Theme';

function usePath(): [string, (event: MouseEvent<HTMLAnchorElement>) => void] {
  const [path, setPath] = useState(() => stripBase(location.pathname));
  useEffect(() => {
    const onPop = () => {
      setPath(stripBase(location.pathname));
    };
    addEventListener('popstate', onPop);
    return () => {
      removeEventListener('popstate', onPop);
    };
  }, []);
  const go = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    history.pushState(null, '', event.currentTarget.href);
    setPath(stripBase(location.pathname));
  };
  return [path, go];
}

const matches = (route: RouteEntry, path: string) =>
  route.path === '/' ? path === '/' : path === route.path || path.startsWith(`${route.path}/`);

export function App() {
  const [path, go] = usePath();
  const current = routes.find((route) => matches(route, path));
  return (
    <Theme>
      <>
        <header>
          <strong>shell</strong>
          <nav>
            {routes.map((route) => (
              <a key={route.path} href={withBase(route.path)} onClick={go}>
                {route.path === '/' ? 'home' : route.path.slice(1)}
              </a>
            ))}
          </nav>
          <CartBadge />
        </header>
        <main>{current ? <current.Component /> : <p>Nothing at {path}.</p>}</main>
        <DevOverlay enabled={process.env.NODE_ENV !== 'production'} />
      </>
    </Theme>
  );
}
