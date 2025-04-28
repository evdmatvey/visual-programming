import { RouterProvider } from 'react-router';
import { router } from './router/router';

export const Providers = () => {
  return <RouterProvider router={router} />;
};
