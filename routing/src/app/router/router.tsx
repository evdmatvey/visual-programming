import { Albums } from '@/pages/Albums';
import { Posts } from '@/pages/Posts';
import { Todos } from '@/pages/Todos';
import { Users } from '@/pages/Users';
import { routesConfig } from '@/shared/config/routes.config';
import { DashboardLayout } from '@/widgets/DashboardLayout';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: routesConfig.DASHBOARD,
    element: <DashboardLayout />,
    children: [
      {
        path: routesConfig.ALBUMS,
        element: <Albums />,
      },
      {
        path: routesConfig.POSTS,
        element: <Posts />,
      },
      {
        path: routesConfig.TODOS,
        element: <Todos />,
      },
      {
        path: routesConfig.USERS,
        element: <Users />,
      },
    ],
  },
]);
