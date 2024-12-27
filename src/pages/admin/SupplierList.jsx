import { useEffect, useState } from 'react';
import axiosInstance from '../../axios';

const SupplierList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get(
          '/proxy/productsearchsupplier/api/supplier/profile/getAllSuppliers'
        );

        setData(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th scope='col'>S.no.</th>
            <th scope='col'>supplierId</th>
            <th scope='col'>Supplier Name</th>
            <th scope='col'>Bussiness Name</th>
            <th scope='col'>Bussiness Description</th>
            <th scope='col'>Bussiness address</th>
            <th scope='col'>premises</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={item.id}>
              <th scope='row'>{idx}</th>
              <td> {item.supplierProfile?.id} </td>
              <td> {item.supplierProfile?.supplierName} </td>
              <td> {item.supplierBusinessDetails?.businessName} </td>
              <td> {item.supplierBusinessDetails?.businessDescription} </td>
              <td> {item.supplierBusinessDetails?.addressLine1} </td>
              <td> {item.supplierBusinessDetails?.premisesType} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierList;
