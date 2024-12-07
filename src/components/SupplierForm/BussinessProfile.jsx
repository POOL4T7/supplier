import { useEffect, useState } from 'react';
import Address from '../BussinessProfile/Address';
import BussinessCategory from '../BussinessProfile/BussinessCategory';
import Details from '../BussinessProfile/Details';
import axiosInstance from '../../axios';
import { userDetailsAtom } from '../../storges/user';
import { useAtom } from 'jotai';

const BussinessProfile = () => {
  const [data, setData] = useState({});
  const [supplier] = useAtom(userDetailsAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          `/proxy/productsearchsupplier/api/supplier/file/supplierBusinessProfileDetails?supplierBusinessId=${supplier.id}`
        );
        // console.log(res.data.supplierBusinessDetails, '666');
        if (res.data.supplierBusinessDetails) {
          // setIsUpdating(true);
          setData(res.data.supplierBusinessDetails);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [supplier.id]);

  return (
    <div>
      <div className='accordion' id='accordionExample'>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='headingOne'>
            <button
              className='accordion-button'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseOne'
              aria-expanded='true'
              aria-controls='collapseOne'
            >
              <span style={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                Bussiness Address
              </span>
            </button>
          </h2>
          <div
            id='collapseOne'
            className='accordion-collapse collapse show'
            aria-labelledby='headingOne'
            data-bs-parent='#accordionExample'
          >
            <div className='accordion-body'>
              <Address data={data} />
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='headingTwo'>
            <button
              className='accordion-button collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseTwo'
              aria-expanded='false'
              aria-controls='collapseTwo'
            >
              <span style={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                Bussiness Details
              </span>
            </button>
          </h2>
          <div
            id='collapseTwo'
            className='accordion-collapse collapse'
            aria-labelledby='headingTwo'
            data-bs-parent='#accordionExample'
          >
            <div className='accordion-body'>
              <Details data={data} />
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='headingThree'>
            <button
              className='accordion-button collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseThree'
              aria-expanded='false'
              aria-controls='collapseThree'
            >
              <span style={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                Bussiness Category
              </span>
            </button>
          </h2>
          <div
            id='collapseThree'
            className='accordion-collapse collapse'
            aria-labelledby='headingThree'
            data-bs-parent='#accordionExample'
          >
            <div className='accordion-body'>
              <BussinessCategory data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BussinessProfile;
