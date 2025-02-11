import type { RouteObject } from 'react-router';

import { lazy } from 'react';
import { Navigate } from 'react-router';

import { CONFIG } from 'src/global-config';

import { authRoutes } from './auth';
import {homeRoutes} from './home-routes';
import { dashboardRoutes } from './dashboard';
import {myApplicationRoutes} from './my-application-routes';
import {fundOpportunitiesRoutes} from './fund-opportunities-routes'


// ----------------------------------------------------------------------

const Page404 = lazy(() => import('src/pages/error/404'));

export const routesSection: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={CONFIG.auth.redirectPath} replace />,
  },

  // Auth
  ...authRoutes,

  // Dashboard
  ...dashboardRoutes,
  ...myApplicationRoutes,
  ...homeRoutes,
  ...fundOpportunitiesRoutes,

  // No match
  { path: '*', element: <Page404 /> },
];
