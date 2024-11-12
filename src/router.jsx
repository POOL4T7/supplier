import { createBrowserRouter } from 'react-router-dom';
import Signin from './pages/Signin';
import Suppiler from './pages/Supplier';

const router = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: <Signin />,
    },
    {
      path: '/suppiler',
      element: <Suppiler />,
    },
  ]);
};

export default router;
