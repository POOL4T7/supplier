import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosInstance from '../../axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userDetailsAtom } from '../../storges/user';
import PropTypes from 'prop-types';

const addressSchema = yup.object().shape({
  addressLine1: yup.string().required('Address Line 1 is required'),
  addressLine2: yup.string().optional(),
  zipcode: yup.string().required('zipcode is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  premisesType: yup.string().required('Premises type is required'),
  premisesName: yup.string().optional(),
});

const Address = ({ data }) => {
  const [supplier] = useAtom(userDetailsAtom);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(addressSchema),
    mode: 'onTouched',
  });
  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post(
        `/proxy/productsearchsupplier/api/supplier/file/saveSupplierBusinessDetails`,
        { ...data, email: supplier.email }
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
    if (data) reset(data?.data);
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      {watch('premisesType') == 'group' && (
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
            // disabled={isUpdating}
          />
          <div className='invalid-feedback'>{errors.zipcode?.message}</div>
        </div>

        <div className='col-sm-4 mb-2'>
          <label className='form-label'>City</label>
          <input
            type='text'
            {...register('city')}
            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
            // disabled={isUpdating}
          />
          <div className='invalid-feedback'>{errors.city?.message}</div>
        </div>

        <div className='col-sm-4 mb-2'>
          <label className='form-label'>Country</label>
          <input
            type='text'
            {...register('country')}
            className={`form-control ${errors.country ? 'is-invalid' : ''}`}
            // disabled={isUpdating}
          />
          <div className='invalid-feedback'>{errors.country?.message}</div>
        </div>
      </div>
      <button
        type='submit'
        className='btn btn-primary my-2'
        disabled={isSubmitting}
      >
        Verify
      </button>
    </form>
  );
};

Address.propTypes = {
  data: PropTypes.object,
};

export default Address;
