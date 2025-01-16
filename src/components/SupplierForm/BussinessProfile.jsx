import { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { bussinessProfile, userDetailsAtom } from '../../storges/user';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';

const bussinessSchema = yup.object().shape({
  businessName: yup.string().required('Business name is required'),
  nickName: yup.string().required('Business nick name is required'),
  keyWord: yup.string().required('Business key word  is required'),
  streetName: yup.string().required('Stree tName is required'),
  area: yup.string().optional(),
  houseNo: yup.string().required('building no. is required'),
  zipcode: yup.string().required('zipcode is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  premisesType: yup.string().required('Premises type is required'),
  premisesName: yup.string().optional(),
  website: yup
    .string()
    .required('Website is required')
    .matches(/.*\..*/, 'Invalid website'),
  email: yup.string().email('Invalid email').required('Email is required'),

  faxCountryCode: yup.string().required('country code required'),
  faxNumber: yup.string().required('fax number is required'),
  mobileCountryCode: yup.string().required('required'),
  mobileNumber: yup.string().required('mobile number is required'),

  whatsappCountryCode: yup.string().required('required'),
  whatsappNumber: yup.string().required('whatsapp number is required'),

  sector: yup.string().required('Sector is required'),
  businessTaxId: yup.string().required('Business tax ID is required'),
});

const BussinessProfile = () => {
  // const [data, setData] = useState({});
  const [supplier] = useAtom(userDetailsAtom);
  const [bussiness] = useAtom(bussinessProfile);

  const [tab, setTab] = useState(0);
  // const [keywords, setKeywords] = useState([]);
  // const [keywordsInput, setKeywordsInput] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    // control,
    // setValue,
  } = useForm({
    resolver: yupResolver(bussinessSchema),
    mode: 'onTouched',
    defaultValues: {
      businessName: '',
      streetName: '',
      area: '',
      houseNo: '',
      zipcode: '',
      city: '',
      country: '',
      premisesType: '',
      premisesName: '',
      businessTaxId: '',
      website: '',
      email: '',
      sector: '',
    },
  });
  console.log('errors', errors);
  useEffect(() => {
    const x = {
      businessName: '',
      nickName: '',
      keyWord: '',
      streetName: '',
      area: '',
      houseNo: '',
      zipcode: '',
      city: '',
      country: '',
      premisesType: '',
      premisesName: '',
      website: '',
      email: '',
      faxCountryCode: '',
      faxNumber: '',
      mobileCountryCode: '',
      mobileNumber: '',
      whatsappCountryCode: '',
      whatsappNumber: '',
      sector: '',
      businessTaxId: '',
    };
    if (bussiness) {
      if (bussiness.businessName) x.businessName = bussiness.businessName;
      if (bussiness.nickName) x.nickName = bussiness.nickName;
      if (bussiness.keyWord) x.keyWord = bussiness.keyWord.join(',');
      if (bussiness.streetName) x.streetName = bussiness.streetName;
      if (bussiness.area) x.area = bussiness.area;
      if (bussiness.houseNo) x.houseNo = bussiness.houseNo;
      if (bussiness.zipcode) x.zipcode = bussiness.zipcode;
      if (bussiness.city) x.city = bussiness.city;
      if (bussiness.country) x.country = bussiness.country;
      if (bussiness.premisesType) x.premisesType = bussiness.premisesType;
      if (bussiness.premisesName) x.premisesName = bussiness.premisesName;
      if (bussiness.faxCountryCode) x.faxCountryCode = bussiness.faxCountryCode;
      if (bussiness.faxNumber) x.faxNumber = bussiness.faxNumber;
      if (bussiness.mobileCountryCode)
        x.mobileCountryCode = bussiness.mobileCountryCode;
      if (bussiness.mobileNumber) x.mobileNumber = bussiness.mobileNumber;
      if (bussiness.whatsappCountryCode)
        x.whatsappCountryCode = bussiness.whatsappCountryCode;
      if (bussiness.whatsappCountryCode)
        x.whatsappCountryCode = bussiness.whatsappCountryCode;
      if (bussiness.whatsappNumber) x.whatsappNumber = bussiness.whatsappNumber;
      if (bussiness.website) x.website = bussiness.website;
      if (bussiness.email) x.email = bussiness.email;
      if (bussiness.sector) x.sector = bussiness.sector;
      reset(x);
    }
  }, [reset, bussiness]);

  const onSubmit = async (data) => {
    try {
      delete data.businessDescription;
      // console.log('data', data);
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
  // console.log('Object.keys(errors)', Object.keys(errors));
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='accordion' id='accordionExample'>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='headingOne'>
            <button
              className={`accordion-button ${tab !== 0 && 'collapsed'}`}
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseOne'
              aria-expanded='true'
              aria-controls='collapseOne'
              onClick={() => setTab(0)}
            >
              <span style={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                Bussiness Address
              </span>
            </button>
          </h2>
          <div
            id='collapseOne'
            className={`accordion-collapse collapse ${tab == 0 && 'show'}`}
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
                  <label className='form-label'>Bussiness Nick Name</label>
                  <input
                    type='text'
                    {...register('nickName')}
                    className={`form-control ${
                      errors.nickName ? 'is-invalid' : ''
                    }`}
                  />
                  <div className='invalid-feedback'>
                    {errors.nickName?.message}
                  </div>
                </div>
                <div className='mb-2'>
                  <label className='form-label'>Bussiness Keywords</label>
                  <input
                    type='text'
                    {...register('keyWord')}
                    className={`form-control ${
                      errors.keyWord ? 'is-invalid' : ''
                    }`}
                    // value={keywordsInput}
                    // onChange={(e) => setKeywordsInput(e.target.value)}
                  />
                  <small>comma seperated keywords (ex: key1, key2)</small>
                  <div className='invalid-feedback'>
                    {errors.keyWord?.message}
                  </div>
                </div>
                {/* <div className='row mb-2'>
                  <div className='col-10'>
                    <div className=''>
                      <label className='form-label'>Bussiness Keywords</label>{' '}
                      array of string
                      <input
                        type='text'
                        // {...register('keyWord')}
                        className={`form-control`}
                        value={keywordsInput}
                        onChange={(e) => setKeywordsInput(e.target.value)}
                      />
                      <div className='invalid-feedback'>
                        {errors.keyWord?.message}
                      </div>
                    </div>
                  </div>
                  <div className='col-2'>
                    <button
                      type='button'
                      className='btn btn-primary mt-4'
                      onClick={() => {
                        setKeywords([...keywords, keywordsInput]);
                        setKeywordsInput('');
                      }}
                    >
                      Add
                    </button>
                  </div>
                  <div className='mt-2'>
                    {keywords.map((item, idx) => (
                      <span
                        key={idx}
                        className='badge rounded-pill bg-primary px-3 py-2 text-white m-1'
                        style={{ cursor: 'pointer' }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div> */}

                <div className='mb-2'>
                  <label className='form-label'>Premises Type</label>
                  <div>
                    <label className='form-label'>
                      <input
                        type='radio'
                        value='individual'
                        {...register('premisesType')}
                      />
                      <span className='mr-2'>Individual Premises</span>
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
                  <div className='col-6 mb-2'>
                    <label className='form-label'>Street Name</label>
                    <input
                      type='text'
                      {...register('streetName')}
                      placeholder='Stree Name'
                      className={`form-control ${
                        errors.streetName ? 'is-invalid' : ''
                      }`}
                    />
                    <div className='invalid-feedback'>
                      {errors.streetName?.message}
                    </div>
                  </div>
                  <div className='mb-2 col-6'>
                    <label className='form-label'>Building no.</label>
                    <input
                      type='text'
                      {...register('houseNo')}
                      placeholder='House no.'
                      className={`form-control ${
                        errors.houseNo ? 'is-invalid' : ''
                      }`}
                    />
                    <div className='invalid-feedback'>
                      {errors.houseNo?.message}
                    </div>
                  </div>
                </div>
                <div className='mb-2 '>
                  <label className='form-label'>Place / locality name</label>
                  <input
                    type='text'
                    {...register('area')}
                    placeholder='Area or locality'
                    className={`form-control ${
                      errors.area ? 'is-invalid' : ''
                    }`}
                  />
                  <div className='invalid-feedback'>{errors.area?.message}</div>
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
                    <label className='form-label'>City / Town / Village</label>
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
              <button
                type='button'
                className='btn btn-primary mt-3'
                onClick={() => setTab(1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='headingTwo'>
            <button
              className={`accordion-button ${tab !== 1 && 'collapsed'}`}
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseTwo'
              aria-expanded='false'
              aria-controls='collapseTwo'
              onClick={() => setTab(1)}
            >
              <span style={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                Business Web Address Contact details
              </span>
            </button>
          </h2>
          <div
            id='collapseTwo'
            className={`accordion-collapse collapse ${tab == 1 && 'show'}`}
            aria-labelledby='headingTwo'
            data-bs-parent='#accordionExample'
          >
            <div className='accordion-body'>
              <div className='mb-2'>
                <label className='form-label'>
                  Business website address / domain name
                </label>
                <input
                  type='text'
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
                <label className='form-label'>E-mail address</label>
                <input
                  type='email'
                  {...register('email')}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                />
                <div className='invalid-feedback'>{errors.email?.message}</div>
              </div>
              {/* second part start here */}
              <p className='mt-4 mb-2 fw-bold fs-4'>
                Business Contact numbers{' '}
              </p>

              <div className='row'>
                <div className='col-3'>
                  <div className='mb-2'>
                    <label className='form-label'>Country Code</label>
                    <input
                      type='text'
                      {...register('faxCountryCode')}
                      className={`form-control ${
                        errors.faxCountryCode ? 'is-invalid' : ''
                      }`}
                    />
                    <div className='invalid-feedback'>
                      {errors.faxCountryCode?.message}
                    </div>
                  </div>
                </div>
                <div className='col-9'>
                  <div className='mb-2'>
                    <label className='form-label'>
                      Fixed Number / Fax Number
                    </label>
                    <input
                      type='text'
                      {...register('faxNumber')}
                      className={`form-control ${
                        errors.faxNumber ? 'is-invalid' : ''
                      }`}
                    />
                    <div className='invalid-feedback'>
                      {errors.faxNumber?.message}
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-3'>
                  <div className='mb-2'>
                    <label className='form-label'>Country Code</label>
                    <input
                      type='text'
                      {...register('mobileCountryCode')}
                      className={`form-control ${
                        errors.mobileCountryCode ? 'is-invalid' : ''
                      }`}
                    />
                    <div className='invalid-feedback'>
                      {errors.mobileCountryCode?.message}
                    </div>
                  </div>
                </div>
                <div className='col-9'>
                  <div className='mb-2'>
                    <label className='form-label'>
                      Mobile / Cell Phone number
                    </label>
                    <input
                      type='text'
                      {...register('mobileNumber')}
                      className={`form-control ${
                        errors.mobileNumber ? 'is-invalid' : ''
                      }`}
                    />
                    <div className='invalid-feedback'>
                      {errors.mobileNumber?.message}
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-3'>
                  <div className='mb-2'>
                    <label className='form-label'>Country Code</label>
                    <input
                      type='text'
                      {...register('whatsappCountryCode')}
                      className={`form-control ${
                        errors.whatsappCountryCode ? 'is-invalid' : ''
                      }`}
                    />
                    <div className='invalid-feedback'>
                      {errors.whatsappCountryCode?.message}
                    </div>
                  </div>
                </div>
                <div className='col-9'>
                  <div className='mb-2'>
                    <label className='form-label'>WhatsApp number</label>
                    <input
                      type='text'
                      {...register('whatsappNumber')}
                      className={`form-control ${
                        errors.whatsappNumber ? 'is-invalid' : ''
                      }`}
                    />
                    <div className='invalid-feedback'>
                      {errors.whatsappNumber?.message}
                    </div>
                  </div>
                </div>
              </div>
              <button
                type='button'
                className='btn btn-primary mt-3'
                onClick={() => setTab(2)}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div className='accordion-item'>
          <h2 className='accordion-header' id='headingTwo'>
            <button
              className={`accordion-button ${tab !== 2 && 'collapsed'}`}
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseThree'
              aria-expanded='false'
              aria-controls='collapseThree'
              onClick={() => setTab(2)}
            >
              <span style={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                Business Nature & Tax details
              </span>
            </button>
          </h2>
          <div
            id='collapseThree'
            className={`accordion-collapse collapse ${tab == 2 ? 'show' : ''}`}
            aria-labelledby='headingTwo'
            data-bs-parent='#accordionExample'
          >
            <div className='accordion-body'>
              <div className='mb-2'>
                <label className='form-label'>Business Sector</label>
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

              <div className='mb-3'>
                <label htmlFor='certificate' className='form-label'>
                  Business Certificate
                </label>
                <div className='input-group'>
                  <input
                    type='file'
                    className='form-control mx-2'
                    id='certificateInput'
                    accept='image/*'
                  />
                  <button
                    type='button'
                    className='btn btn-primary'
                    id='uploadButton'
                  >
                    Upload
                  </button>
                </div>
              </div>

              <div className='preview-box' id='previewBox'>
                <span className='preview-placeholder'>
                  No Certificate Uploaded
                </span>
              </div>

              <div>
                {Object.keys(errors)?.length > 0 && (
                  <div style={{ color: '#d9534f' }}>
                    {' '}
                    * {Object.keys(errors)[0]} is required
                  </div>
                )}
              </div>
              <div className='div'>
                <button
                  type='submit'
                  className='btn btn-primary my-2'
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Spinner width='15px' height='15px' />} Save
                </button>
              </div>
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
