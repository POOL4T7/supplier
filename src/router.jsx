import { createBrowserRouter } from 'react-router-dom';
import Signin from './pages/Signin';
import Suppiler from './pages/Supplier';
import Layout from './Layout';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import SignupCompletion from './pages/SignupCompletion';

const router = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <LandingPage />,
        },
        {
          path: '/supplier',
          element: <Suppiler />,
        },
        {
          path: '/signin',
          element: <Signin />,
        },
        {
          path: '/register',
          element: <Signup />,
        },
        {
          path: '/register-completion',
          element: <SignupCompletion />,
        },
      ],
    },
  ]);
};

export default router;
