import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Spinner from '../components/common/Spinner';
import LocationIcon from '../components/common/LocationIcon';

const formSchema = yup
  .object()
  .shape({
    country: yup.string().optional(),
    locationName: yup.string().optional(),
    zipcode: yup.string().optional(),
    name: yup.string().optional(),
    premises: yup.string().optional(),
    shop: yup.string().optional(),
  })
  .test('at-least-one', 'At least one field is required', (values) =>
    Object.values(values).some((value) => value && value.trim().length > 0)
  );

const LandingPage = () => {
  const [productList, setProductList] = useState([]);
  // const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(false);

  const form1 = useForm({
    resolver: yupResolver(formSchema),
  });
  const form2 = useForm({
    resolver: yupResolver(formSchema),
  });

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
          <div className='col-12 col-md-1 mb-2'>
            <input
              type='text'
              className='form-control'
              placeholder='Country'
              {...form1.register('country')}
            />
          </div>
          <div className='col-12 col-md-2 mb-2'>
            <input
              type='text'
              className='form-control'
              placeholder='Location Name'
              {...form1.register('locationName')}
            />
          </div>
          <div className='col-12 col-md-2 mb-2'>
            <input
              type='text'
              className='form-control'
              placeholder='Zipcode'
              {...form1.register('zipcode')}
            />
          </div>
          <div className='col-12 col-md-4 mb-2'>
            <input
              type='text'
              className='form-control'
              placeholder='product / service name'
              {...form1.register('name')}
            />
          </div>
          <div className='col-12 col-md-2'>
            <button type='submit' className='btn btn-outline-success w-100'>
              Search
            </button>
          </div>
        </div>
      </form>

      <>
        {Object.keys(form1.formState.errors).length != 0 && (
          <div className='text-danger'>Please select at least one value</div>
        )}
      </>

      <form onSubmit={form2.handleSubmit(onSubmitForm2)}>
        <div className='row mb-3 justify-content-center'>
          <div className='col-12 col-md-1 mb-2'>
            <input
              type='text'
              className='form-control'
              placeholder='Country'
              {...form2.register('country')}
            />
          </div>
          <div className='col-12 col-md-2 mb-2'>
            <input
              type='text'
              className='form-control'
              placeholder='Location Name'
              {...form2.register('locationName')}
            />
          </div>
          <div className='col-12 col-md-1 mb-2'>
            <input
              type='text'
              className='form-control'
              placeholder='Zipcode'
              {...form2.register('zipcode')}
            />
          </div>
          <div className='col-12 col-md-2 mb-2'>
            <input
              type='text'
              className='form-control'
              placeholder='Select your fav premises'
              {...form2.register('premises')}
            />
          </div>
          <div className='col-12 col-md-2 mb-2'>
            <input
              type='text'
              className='form-control'
              placeholder='search for shop'
              {...form2.register('shop')}
            />
          </div>
          <div className='col-12 col-md-2 mb-2'>
            <input
              type='text'
              className='form-control'
              placeholder='product / service name'
              {...form2.register('name')}
            />
          </div>
          <div className='col-12 col-md-2'>
            <button type='submit' className='btn btn-outline-success w-100'>
              Search
            </button>
          </div>
        </div>
      </form>
      <>
        {Object.keys(form2.formState.errors).length != 0 && (
          <p className='text-danger'>Please select at least one value</p>
        )}
      </>
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
