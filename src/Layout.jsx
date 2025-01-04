import { useEffect } from 'react';
import Header from './components/layout/Header.jsx';
import { Outlet } from 'react-router-dom';
import { bussinessProfile, userDetailsAtom, roles } from './storges/user.js';
import { useAtom } from 'jotai';
import axiosInstance from './axios.js';

const Layout = () => {
  const [, setUserDetails] = useAtom(userDetailsAtom);
  const [, setBussinessProfile] = useAtom(bussinessProfile);

  const [, setRoles] = useAtom(roles);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('authAccessToken');
    async function fetchProfileData() {
      try {
        const res = await axiosInstance.get(
          `/proxy/productsearchsupplier/api/supplier/profile/supplierProfileDetails?supplierUserId=${user?.supplierId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserDetails(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    async function fetchBussinessProfile() {
      try {
        const res = await axiosInstance.get(
          `/proxy/productsearchsupplier/api/supplier/file/supplierBusinessProfileDetails?supplierProfileId=${user?.supplierId}`
        );

        if (res.data.supplierBusinessDetails) {
          setBussinessProfile(res.data.supplierBusinessDetails);
        }
      } catch (e) {
        console.log(e);
      }
    }

    async function fetchRolesData() {
      try {
        const res = await axiosInstance.get(
          `/proxy/productsearchsupplier/role/getAllRoles`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log('res.data', res.data);
        setRoles(res.data);
      } catch (e) {
        console.log(e);
      }
    }

    if (user?.supplierId) {
      fetchProfileData();
      fetchBussinessProfile();
    }
    fetchRolesData();
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
