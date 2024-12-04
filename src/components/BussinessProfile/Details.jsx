import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useAtom } from 'jotai';
import { userDetailsAtom } from '../../storges/user';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const step2Schema = yup.object().shape({
  businessName: yup.string().required('Business name is required'),
  businessTaxId: yup.string().required('Business tax ID is required'),
  website: yup.string().url('Invalid URL'),
  email: yup.string().email('Invalid email').required('Email is required'),
  sector: yup.string().required('Sector is required'),
});

const Details = () => {
  const [supplier] = useAtom(userDetailsAtom);

  // const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/proxy/productsearchsupplier/api/supplier/file/supplierBusinessProfileDetails?supplierBusinessId=${supplier.id}`
        );
        console.log(res.data.supplierBusinessDetails);
        if (res.data.supplierBusinessDetails) {
          // setIsUpdating(true);
          setData(res.data.supplierBusinessDetails);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Profile data={data} />
    </>
  );
};

const Profile = (data) => {
  const [supplier] = useAtom(userDetailsAtom);
  // const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(step2Schema),
    mode: 'onTouched',
  });
  const onSubmit = async (data) => {
    try {
      data.supplierId = supplier?.id;
      const res = await axios.post(
        `/proxy/productsearchsupplier/api/supplier/file/saveSupplierBusinessDetails`,
        data
      );
      console.log(res);
      toast.success(res.data?.data?.message || 'Supplier profile updated');
      // saveData(data); // Save step data before moving on
    } catch (e) {
      console.log(e);
      toast.error(
        e.response?.data?.error || 'failed: Supplier profile updated'
      );
    }
  };

  useEffect(() => {
    reset(data.data);
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-2'>
        <label className='form-label'>Business Name</label>
        <input
          type='text'
          {...register('businessName')}
          className={`form-control ${errors.businessName ? 'is-invalid' : ''}`}
        />
        <div className='invalid-feedback'>{errors.businessName?.message}</div>
      </div>

      <div className='mb-2'>
        <label className='form-label'>Business Tax ID</label>
        <input
          type='text'
          {...register('businessTaxId')}
          className={`form-control ${errors.businessTaxId ? 'is-invalid' : ''}`}
        />
        <div className='invalid-feedback'>{errors.businessTaxId?.message}</div>
      </div>

      <div className='mb-2'>
        <label className='form-label'>Website</label>
        <input
          type='url'
          {...register('website')}
          className={`form-control ${errors.website ? 'is-invalid' : ''}`}
        />
        <div className='invalid-feedback'>{errors.website?.message}</div>
      </div>

      <div className='mb-2'>
        <label className='form-label'>Email</label>
        <input
          type='email'
          {...register('email')}
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
        />
        <div className='invalid-feedback'>{errors.email?.message}</div>
      </div>

      <div className='mb-2'>
        <label className='form-label'>Sector</label>
        <select
          {...register('sector')}
          className={`form-control ${errors.sector ? 'is-invalid' : ''}`}
        >
          <option value=''>Select Sector</option>
          <option value='manufacturing'>Manufacturing</option>
          <option value='service'>Service</option>
          <option value='retail'>Retail</option>
          <option value='wholesale'>Wholesale</option>
        </select>
        <div className='invalid-feedback'>{errors.sector?.message}</div>
      </div>

      <button type='submit' className='btn btn-primary my-2'>
        Save
      </button>
    </form>
  );
};

export default Details;
