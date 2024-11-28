import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import PropTypes from 'prop-types';
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
  businessCategory: yup.string().required('Business category is required'),
  sector: yup.string().required('Sector is required'),
  premisesType: yup.string().required('Premises type is required'),
  premisesName: yup.string().optional(),
  productsServices: yup.string().required('Product/Service is required'),
});

const addressSchema = yup.object().shape({
  addressLine1: yup.string().required('Address Line 1 is required'),
  addressLine2: yup.string().optional(),
  zipcode: yup.string().required('zipcode is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
});

const BussinessProfile = () => {
  const [supplier] = useAtom(userDetailsAtom);
  const [step, setStep] = useState(0);
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
      <div className='d-flex gap-2 mb-2'>
        <button
          className={`btn ${step == 0 ? 'btn-primary' : 'btn-outline-primary'}`}
          type='button'
          style={{ width: '100%' }}
          onClick={() => setStep(0)}
        >
          Address
        </button>
        <button
          className={`btn ${step == 1 ? 'btn-primary' : 'btn-outline-primary'}`}
          type='button'
          style={{ width: '100%' }}
          onClick={() => setStep(1)}
        >
          Bussiness Profile
        </button>
      </div>
      {step == 0 && <AddressForm data={data} />}
      {step == 1 && <Profile data={data} />}
    </>
  );
};

// BussinessProfile.propTypes = {
//   onNext: PropTypes.func.isRequired,
// };

const AddressForm = (data) => {
  // eslint-disable-next-line no-unused-vars
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addressSchema),
    mode: 'onTouched',
  });
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `/proxy/productsearchsupplier/api/supplier/file/saveSupplierBusinessDetails`,
        data
      );
      console.log(res);
      toast.success(
        res.data?.data?.message || 'Supplier bussiness profile updated'
      );
      // saveData(data); // Save step data before moving on
    } catch (e) {
      console.log(e);
      toast.error(
        e.response?.data?.error || 'failed: Supplier profile updated'
      );
    }
  };

  useEffect(() => {
    // console.log('data', data);
    reset(data.data);
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='row'>
        <div className='mb-2'>
          <label className='form-label'>Business Address</label>
          <input
            type='text'
            {...register('addressLine1')}
            placeholder='Address Line 1'
            className={`form-control ${
              errors.addressLine1 ? 'is-invalid' : ''
            }`}
            // disabled={isUpdating}
          />
          <div className='invalid-feedback'>{errors.addressLine1?.message}</div>
        </div>
        <div className='mb-2'>
          <input
            type='text'
            {...register('addressLine2')}
            placeholder='Address Line 2'
            className='form-control'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-4 mb-2'>
          <label className='form-label'>Zipcode</label>
          <input
            type='text'
            {...register('zipcode')}
            className={`form-control ${errors.zipcode ? 'is-invalid' : ''}`}
            disabled={isUpdating}
          />
          <div className='invalid-feedback'>{errors.zipcode?.message}</div>
        </div>

        <div className='col-sm-4 mb-2'>
          <label className='form-label'>City</label>
          <input
            type='text'
            {...register('city')}
            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
            disabled={isUpdating}
          />
          <div className='invalid-feedback'>{errors.city?.message}</div>
        </div>

        <div className='col-sm-4 mb-2'>
          <label className='form-label'>Country</label>
          <input
            type='text'
            {...register('country')}
            className={`form-control ${errors.country ? 'is-invalid' : ''}`}
            disabled={isUpdating}
          />
          <div className='invalid-feedback'>{errors.country?.message}</div>
        </div>
      </div>
      <button type='submit' className='btn btn-primary my-2'>
        Send OTP
      </button>
    </form>
  );
};

const Profile = (data) => {
  const [supplier] = useAtom(userDetailsAtom);
  // const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
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
        <label className='form-label'>Business Category</label>
        <input
          type='text'
          {...register('businessCategory')}
          className={`form-control ${
            errors.businessCategory ? 'is-invalid' : ''
          }`}
        />
        <div className='invalid-feedback'>
          {errors.businessCategory?.message}
        </div>
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

      <div className='mb-2'>
        <label className='form-label'>Premises Type</label>
        <div>
          <label className='form-label'>
            <input
              type='radio'
              value='individual'
              {...register('premisesType')}
            />
            Individual Premises
          </label>
          <label className='form-label m-2'>
            <input type='radio' value='group' {...register('premisesType')} />
            Group of Bussiness Premises (Malls)
          </label>
        </div>
        <div className='invalid-feedback'>{errors.premisesType?.message}</div>
      </div>

      {watch('type') == 'group' && (
        <div className='mb-2'>
          <label className='form-label'>Premises name</label>
          <select
            {...register('sector')}
            className={`form-control ${errors.sector ? 'is-invalid' : ''}`}
          >
            <option value=''>Select Premises</option>
            <option value='manufacturing'>Manufacturing</option>
            <option value='service'>Service</option>
            <option value='retail'>Retail</option>
            <option value='wholesale'>Wholesale</option>
          </select>
          <div className='invalid-feedback'>{errors.sector?.message}</div>
        </div>
      )}

      {/* <div className='mb-2'>
        <label>Premises Name</label>
        <input
          type='text'
          {...register('premisesName')}
          className={`form-control ${errors.premisesName ? 'is-invalid' : ''}`}
        />
        <div className='invalid-feedback'>{errors.premisesName?.message}</div>
      </div> */}

      <div className='mb-2'>
        <label className='form-label'>Products / Services</label>
        <select
          {...register('productsServices')}
          className={`form-control ${errors.sector ? 'is-invalid' : ''}`}
        >
          <option value=''>Select Type</option>
          <option value='products'>Products</option>
          <option value='services'>Services</option>
          <option value='both'>Both</option>
        </select>
        <div className='invalid-feedback'>{errors.sector?.message}</div>
      </div>

      <button type='submit' className='btn btn-primary my-2'>
        Save
      </button>
    </form>
  );
};

export default BussinessProfile;
