import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Spinner from '../components/common/Spinner';
import LocationIcon from '../components/common/LocationIcon';

const formSchema = yup.object().shape({
  country: yup.string().optional(),
  locationName: yup.string().required('please enter location or zipcode'),
  name: yup.string().optional(),
});

const formSchema2 = yup.object().shape({
  country: yup.string().optional(),
  locationName: yup.string().required('please enter location or zipcode'),
  name: yup.string().optional(),
  premises: yup.string().required('please enter your favorite premises'),
  shop: yup.string().optional(),
});

const LandingPage = () => {
  const [productList, setProductList] = useState([]);
  // const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(false);

  const form1 = useForm({
    resolver: yupResolver(formSchema),
  });
  const form2 = useForm({
    resolver: yupResolver(formSchema2),
  });
  console.log(form1.formState);
  const onSubmitForm1 = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`/proxy/productsearchsupplier/search`, data);

      setProductList(res.data);
      setLoading(false);
      // setUserDetails(res.data?.supplierProfile);
      // localStorage.setItem('user', JSON.stringify(res.data?.supplierProfile));
    } catch (e) {
      toast.error(e.response?.data?.message || 'Something went wrong');
    }
  };

  const onSubmitForm2 = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`/proxy/productsearchsupplier/search`, data);
      setProductList(res.data);
      setLoading(false);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className=' m-5'>
      <form onSubmit={form1.handleSubmit(onSubmitForm1)}>
        <div className='row mb-3 justify-content-center'>
          {/* Country Field */}
          <div className='col-12 col-md-1 mb-2'>
            <input
              type='text'
              className={`form-control ${
                form1.formState.errors.country ? 'is-invalid' : ''
              }`}
              placeholder='Country'
              {...form1.register('country', {
                required: 'Country is required',
              })}
            />
            {form1.formState.errors.country && (
              <div className='invalid-feedback'>
                {form1.formState.errors.country.message}
              </div>
            )}
          </div>

          {/* Location Name Field */}
          <div className='col-12 col-md-4 mb-2'>
            <input
              type='text'
              className={`form-control ${
                form1.formState.errors.locationName ? 'is-invalid' : ''
              }`}
              placeholder='Location Name'
              {...form1.register('locationName', {
                required: 'Location Name is required',
              })}
            />
            {form1.formState.errors.locationName && (
              <div className='invalid-feedback'>
                {form1.formState.errors.locationName.message}
              </div>
            )}
          </div>

          {/* Product/Service Name Field */}
          <div className='col-12 col-md-4 mb-2'>
            <input
              type='text'
              className={`form-control ${
                form1.formState.errors.name ? 'is-invalid' : ''
              }`}
              placeholder='Product / Service Name'
              {...form1.register('name', {
                required: 'Product/Service name is required',
              })}
            />
            {form1.formState.errors.name && (
              <div className='invalid-feedback'>
                {form1.formState.errors.name.message}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className='col-12 col-md-2'>
            <button type='submit' className='btn btn-outline-success w-100'>
              Search
            </button>
          </div>
        </div>
      </form>

      <form onSubmit={form2.handleSubmit(onSubmitForm2)}>
        <div className='row mb-3 justify-content-center'>
          {/* Country Field */}
          <div className='col-12 col-md-1 mb-2'>
            <input
              type='text'
              className={`form-control ${
                form2.formState.errors.country ? 'is-invalid' : ''
              }`}
              placeholder='Country'
              {...form2.register('country', {
                required: 'Country is required',
              })}
            />
            {form2.formState.errors.country && (
              <div className='invalid-feedback'>
                {form2.formState.errors.country.message}
              </div>
            )}
          </div>

          {/* Location Name Field */}
          <div className='col-12 col-md-2 mb-2'>
            <input
              type='text'
              className={`form-control ${
                form2.formState.errors.locationName ? 'is-invalid' : ''
              }`}
              placeholder='Location'
              {...form2.register('locationName', {
                required: 'Location Name is required',
              })}
            />
            {form2.formState.errors.locationName && (
              <div className='invalid-feedback'>
                {form2.formState.errors.locationName.message}
              </div>
            )}
          </div>

          {/* Premises Field */}
          <div className='col-12 col-md-3 mb-2'>
            <input
              type='text'
              className={`form-control ${
                form2.formState.errors.premises ? 'is-invalid' : ''
              }`}
              placeholder='premises name'
              {...form2.register('premises', {
                required: 'Premises is required',
              })}
            />
            {form2.formState.errors.premises && (
              <div className='invalid-feedback'>
                {form2.formState.errors.premises.message}
              </div>
            )}
          </div>

          {/* Shop Field */}
          <div className='col-12 col-md-2 mb-2'>
            <input
              type='text'
              className={`form-control ${
                form2.formState.errors.shop ? 'is-invalid' : ''
              }`}
              placeholder='Search for shop'
              {...form2.register('shop', {
                required: 'Shop name is required',
              })}
            />
            {form2.formState.errors.shop && (
              <div className='invalid-feedback'>
                {form2.formState.errors.shop.message}
              </div>
            )}
          </div>

          {/* Product/Service Name Field */}
          <div className='col-12 col-md-3 mb-2'>
            <input
              type='text'
              className={`form-control ${
                form2.formState.errors.name ? 'is-invalid' : ''
              }`}
              placeholder='Product / Service Name'
              {...form2.register('name', {
                required: 'Product/Service name is required',
              })}
            />
            {form2.formState.errors.name && (
              <div className='invalid-feedback'>
                {form2.formState.errors.name.message}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className='col-12 col-md-1'>
            <button type='submit' className='btn btn-outline-success w-100'>
              Search
            </button>
          </div>
        </div>
      </form>

      {/* <LocationIcon /> */}
      <div className='container my-4'>
        <div className='row g-4'>
          {productList?.map((item) => (
            <div
              className='col-lg-4 col-md-6'
              key={item.supplierBusinessDetails.id}
            >
              <div className='card shadow-sm border-0 h-100'>
                <div className='card-body'>
                  {/* Business Name */}
                  <h4 className='card-title text-primary mb-2'>
                    {item.supplierBusinessDetails.businessName}
                  </h4>
                  {/* Business Category */}
                  <p className='card-text text-muted mb-2'>
                    {item.supplierBusinessDetails.businessCategory} -{' '}
                    {item.supplierBusinessDetails.businessSubCategory}
                  </p>
                  {/* Address */}
                  <p className='card-text text-muted'>
                    <LocationIcon />
                    {item.supplierBusinessDetails.addressLine1},{' '}
                    {item.supplierBusinessDetails.addressLine2},{' '}
                    {item.supplierBusinessDetails.city},{' '}
                    {item.supplierBusinessDetails.country}
                  </p>
                  {/* Products */}
                  <div className='mt-3'>
                    <h6 className='text-secondary'>Products:</h6>
                    <div className='d-flex flex-wrap gap-2 mt-2'>
                      {item.names.map((productName) => (
                        <span
                          key={productName}
                          className='badge rounded-pill bg-primary px-3 py-2 text-white'
                        >
                          {productName}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Website and Email */}
                  <div className='mt-3'>
                    <a
                      href={item.supplierBusinessDetails.website}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='btn btn-outline-primary btn-sm me-2'
                    >
                      Visit Website
                    </a>
                    <a
                      href={`mailto:${item.supplierBusinessDetails.email}`}
                      className='btn btn-outline-secondary btn-sm'
                    >
                      Contact Supplier
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {productList?.length == 0 && (
        <div className='d-flex justify-content-center'>
          <h4>No Product found?</h4>
        </div>
      )}
      {loading && <Spinner />}
    </div>
  );
};

export default LandingPage;
