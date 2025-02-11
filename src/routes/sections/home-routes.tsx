import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { CONFIG } from 'src/global-config';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

import { usePathname } from '../hooks';
// ----------------------------------------------------------------------

const HomaPage = lazy(() => import('src/pages/home/index'));


// ----------------------------------------------------------------------

function SuspenseOutlet() {
  const pathname = usePathname();
  return (
    <Suspense key={pathname} fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}

const layoutContent = () => (
  <DashboardLayout>
    <SuspenseOutlet />
  </DashboardLayout>
);

export const homeRoutes: RouteObject[] = [
  {
    path: '/',
    element: CONFIG.auth.skip ? layoutContent() : <AuthGuard>{layoutContent()}</AuthGuard>,
    children:[
        { path: 'home', element: <HomaPage /> },
    ]
  },
];
