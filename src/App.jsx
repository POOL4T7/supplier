import { RouterProvider } from 'react-router-dom';
import router from './router';
// import { userDetailsAtom } from './storges/user';
// import { useAtom } from 'jotai';

function App() {
  const isLoggedIn = localStorage.getItem('user');
  return (
    <>
      <RouterProvider router={router({ isLoggedIn: isLoggedIn && true })} />
    </>
  );
}

export default App;
