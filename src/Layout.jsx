import { useEffect } from 'react';
import Header from './components/layout/Header.jsx';
import { Outlet } from 'react-router-dom';
import { userDetailsAtom } from './storges/user.js';
import { useAtom } from 'jotai';

const Layout = () => {
  const [, setUserDetails] = useAtom(userDetailsAtom);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUserDetails(JSON.parse(user));
    }
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
