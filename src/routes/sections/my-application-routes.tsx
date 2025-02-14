import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { CONFIG } from 'src/global-config';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

import { usePathname } from '../hooks';
// ----------------------------------------------------------------------

const ApplicationList = lazy(() => import('src/pages/my-applicateion/application'));


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

export const myApplicationRoutes: RouteObject[] = [
  {
    path: '/applications',
    element: CONFIG.auth.skip ? layoutContent() : <AuthGuard>{layoutContent()}</AuthGuard>,
    children:[
        { path: 'my-applications', element: <ApplicationList /> },
    ]
  },
];
