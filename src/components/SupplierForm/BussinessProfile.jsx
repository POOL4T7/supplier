import { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { bussinessProfile, userDetailsAtom } from '../../storges/user';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const bussinessSchema = yup.object().shape({
  businessName: yup.string().required('Business name is required'),
  businessDescription: yup.string().optional(),
  addressLine1: yup.string().required('Address Line 1 is required'),
  addressLine2: yup.string().optional(),
  zipcode: yup.string().required('zipcode is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  premisesType: yup.string().required('Premises type is required'),
  premisesName: yup.string().optional(),
  businessTaxId: yup.string().required('Business tax ID is required'),
  website: yup.string().url('Invalid URL'),
  email: yup.string().email('Invalid email').required('Email is required'),
  sector: yup.string().required('Sector is required'),
  // businessCategory: yup.string().optional(),
  // businessSubCategory: yup.string().optional(),
  // serviceCategory: yup.string().optional(),
  // serviceSubCategory: yup.string().optional(),
});

const BussinessProfile = () => {
  // const [data, setData] = useState({});
  const [supplier] = useAtom(userDetailsAtom);
  const [bussiness] = useAtom(bussinessProfile);
  // eslint-disable-next-line no-unused-vars
  const [category, setCategory] = useState({
    category: [],
    subCategory: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    // setValue,
  } = useForm({
    resolver: yupResolver(bussinessSchema),
    mode: 'onTouched',
  });

  useEffect(() => {
    if (bussiness) {
      reset(bussiness);
    }
  }, [reset, bussiness]);

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post(
        `/proxy/productsearchsupplier/api/supplier/file/saveSupplierBusinessDetails`,
        { ...data, supplierId: supplier.id, supplierBusinessId: bussiness.id }
      );

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axiosInstance.get(
  //         '/proxy/productsearchsupplier/getCategoryAndSubCategoryDetailsDetails?type=products'
  //       );
  //       console.log(res);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   if (watch('productsServices')) fetchData();
  // }, [watch('productsServices')]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              <>
                <div className='mb-2'>
                  <label className='form-label'>Business Name</label>
                  <input
                    type='text'
                    {...register('businessName')}
                    className={`form-control ${
                      errors.businessName ? 'is-invalid' : ''
                    }`}
                  />
                  <div className='invalid-feedback'>
                    {errors.businessName?.message}
                  </div>
                </div>
                <div className='mb-2'>
                  <label className='form-label'>Business Description</label>
                  <textarea
                    {...register('businessDescription')}
                    className={`form-control ${
                      errors.businessDescription ? 'is-invalid' : ''
                    }`}
                  />
                  <div className='invalid-feedback'>
                    {errors.businessDescription?.message}
                  </div>
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
                      <input
                        type='radio'
                        value='group'
                        {...register('premisesType')}
                      />
                      Group of Bussiness Premises (Malls)
                    </label>
                  </div>
                  <div className='invalid-feedback'>
                    {errors.premisesType?.message}
                  </div>
                </div>

                {watch('premisesType') == 'group' && (
                  <div className='mb-2'>
                    <label className='form-label'>Premises name</label>
                    <input
                      type='text'
                      {...register('premisesName')}
                      placeholder='Premises name'
                      className={`form-control ${
                        errors.premisesName ? 'is-invalid' : ''
                      }`}
                    />
                    <div className='invalid-feedback'>
                      {errors.premisesName?.message}
                    </div>
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
                    />
                    <div className='invalid-feedback'>
                      {errors.addressLine1?.message}
                    </div>
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
                      className={`form-control ${
                        errors.zipcode ? 'is-invalid' : ''
                      }`}
                      // disabled={isUpdating}
                    />
                    <div className='invalid-feedback'>
                      {errors.zipcode?.message}
                    </div>
                  </div>

                  <div className='col-sm-4 mb-2'>
                    <label className='form-label'>City</label>
                    <input
                      type='text'
                      {...register('city')}
                      className={`form-control ${
                        errors.city ? 'is-invalid' : ''
                      }`}
                      // disabled={isUpdating}
                    />
                    <div className='invalid-feedback'>
                      {errors.city?.message}
                    </div>
                  </div>

                  <div className='col-sm-4 mb-2'>
                    <label className='form-label'>Country</label>
                    <input
                      type='text'
                      {...register('country')}
                      className={`form-control ${
                        errors.country ? 'is-invalid' : ''
                      }`}
                      // disabled={isUpdating}
                    />
                    <div className='invalid-feedback'>
                      {errors.country?.message}
                    </div>
                  </div>
                </div>
              </>
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
              <div className='mb-2'>
                <label className='form-label'>Business Tax ID</label>
                <input
                  type='text'
                  {...register('businessTaxId')}
                  className={`form-control ${
                    errors.businessTaxId ? 'is-invalid' : ''
                  }`}
                />
                <div className='invalid-feedback'>
                  {errors.businessTaxId?.message}
                </div>
              </div>

              <div className='mb-2'>
                <label className='form-label'>Website</label>
                <input
                  type='url'
                  {...register('website')}
                  className={`form-control ${
                    errors.website ? 'is-invalid' : ''
                  }`}
                />
                <div className='invalid-feedback'>
                  {errors.website?.message}
                </div>
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
                  className={`form-control ${
                    errors.sector ? 'is-invalid' : ''
                  }`}
                >
                  <option value=''>Select Sector</option>
                  <option value='manufacturing'>Manufacturing</option>
                  <option value='service'>Service</option>
                  <option value='retail'>Retail</option>
                  <option value='wholesale'>Wholesale</option>
                </select>
                <div className='invalid-feedback'>{errors.sector?.message}</div>
              </div>
              <button
                type='submit'
                className='btn btn-primary my-2'
                disabled={isSubmitting}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BussinessProfile;

const ProductList = ({ setValue, errors, type }) => {
  return (
    <>
      <div className='mb-2'>
        <label className='form-label'>
          {type == 'product'
            ? 'Product'
            : type === 'service'
            ? 'Service'
            : 'Product/Service'}{' '}
          Category
        </label>
        <select
          className={`form-control ${
            errors.businessCategory ? 'is-invalid' : ''
          }`}
          onChange={(e) => setValue('businessCategory', e.target.value)}
        >
          <option value=''>Select Category</option>
          <option value='electronics'>Electronics</option>
          <option value='apparel'>Apparel</option>
        </select>
        <div className='invalid-feedback'>
          {errors.businessCategory?.message}
        </div>
      </div>
      <div className='mb-2'>
        <label className='form-label'>
          {' '}
          {type == 'product'
            ? 'Product'
            : type === 'service'
            ? 'Service'
            : 'Product/Service'}{' '}
          Sub Category
        </label>
        <select
          className={`form-control ${
            errors.businessSubCategory ? 'is-invalid' : ''
          }`}
          onChange={(e) => setValue('businessSubCategory', e.target.value)}
        >
          <option value=''>Select Subcategory</option>
          <option value='phones'>Phones</option>
          <option value='computers'>Computers</option>
        </select>
        <div className='invalid-feedback'>
          {errors.businessSubCategory?.message}
        </div>
      </div>
    </>
  );
};

const ServiceList = ({ setValue, errors }) => {
  return (
    <>
      <div className='mb-2'>
        <label className='form-label'>Service Category</label>
        <select
          className={`form-control ${
            errors.serviceCategory ? 'is-invalid' : ''
          }`}
          onChange={(e) => setValue('serviceCategory', e.target.value)}
        >
          <option value=''>Select Category</option>
          <option value='consulting'>Consulting</option>
          <option value='maintenance'>Maintenance</option>
        </select>
        <div className='invalid-feedback'>
          {errors.serviceCategory?.message}
        </div>
      </div>
      <div className='mb-2'>
        <label className='form-label'>Service Sub Category</label>
        <select
          className={`form-control ${
            errors.serviceSubCategory ? 'is-invalid' : ''
          }`}
          onChange={(e) => setValue('serviceSubCategory', e.target.value)}
        >
          <option value=''>Select Subcategory</option>
          <option value='it'>IT</option>
          <option value='plumbing'>Plumbing</option>
        </select>
        <div className='invalid-feedback'>
          {errors.serviceSubCategory?.message}
        </div>
      </div>
    </>
  );
};

ProductList.propTypes = {
  setValue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  type: PropTypes.string,
};

ServiceList.propTypes = {
  setValue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
