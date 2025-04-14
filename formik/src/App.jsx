import { createBrowserRouter, RouterProvider } from 'react-router';
import { CreateUser } from './components/Form/Form';
import { UserList } from './components/UserList';

const router = createBrowserRouter([
  {
    path: '/form',
    element: <CreateUser />,
  },
  {
    path: '/',
    element: <UserList />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
