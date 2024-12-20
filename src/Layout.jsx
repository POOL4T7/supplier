import { useEffect } from 'react';
import Header from './components/layout/Header.jsx';
import { Outlet } from 'react-router-dom';
import {
  bussinessProfile,
  // productCategory,
  // serviceCategory,
  userDetailsAtom,
} from './storges/user.js';
import { useAtom } from 'jotai';
import axiosInstance from './axios.js';

const Layout = () => {
  const [, setUserDetails] = useAtom(userDetailsAtom);
  const [, setBussinessProfile] = useAtom(bussinessProfile);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('authAccessToken');
    async function fetchProfileData() {
      try {
        const res = await axiosInstance.get(
          `/proxy/productsearchsupplier/api/supplier/profile/supplierProfileDetails?supplierUserId=${user?.id}`,
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
          `/proxy/productsearchsupplier/api/supplier/file/supplierBusinessProfileDetails?supplierProfileId=${user.id}`
        );

        if (res.data.supplierBusinessDetails) {
          setBussinessProfile(res.data.supplierBusinessDetails);
        }
      } catch (e) {
        console.log(e);
      }
    }

    // async function fetchCategoryData() {
    //   try {
    //     const res = await axiosInstance.get(
    //       `/proxy/productsearchsupplier/getCategoryAndSubCategoryDetailsDetails?type=products`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );
    //     console.log(res);
    //     // setUserDetails(res.data);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
    if (user?.id) {
      fetchProfileData();
      fetchBussinessProfile();
      // fetchCategoryData();
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
