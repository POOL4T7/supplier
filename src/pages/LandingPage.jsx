import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Spinner from '../components/common/Spinner';

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
  const [serviceList, setServiceList] = useState([]);
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

      setProductList(res.data.products);
      setServiceList(res.data.services);
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

      setProductList(res.data.products);
      setServiceList(res.data.services);
      setLoading(false);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className='container form-container mt-5'>
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

      {productList.length != 0 && <h2>Product List</h2>}
      <div className='row'>
        {productList?.map((item) => {
          return (
            <div className='col-3 mb-2' key={item.id}>
              <div className='card' style={{ maxWidth: '18rem' }}>
                <div className='card-body'>
                  <h5 className='card-title'>{item.productName}</h5>
                  {/* <h6 className='card-subtitle mb-2 text-muted'>Card subtitle</h6> */}
                  <p className='card-text'>{item.productDescription}</p>
                  {/* <a href='#' className='card-link'>
                    Card link
                  </a>
                  <a href='#' className='card-link'>
                    Another link
                  </a> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {serviceList.length != 0 && <h2>Service List</h2>}
      <div className='row'>
        {serviceList?.map((item) => {
          return (
            <div className='col-3 mb-2' key={item.id}>
              <div className='card' style={{ maxWidth: '18rem' }}>
                <div className='card-body'>
                  <h5 className='card-title'>{item?.serviceName}</h5>
                  {/* <h6 className='card-subtitle mb-2 text-muted'>Card subtitle</h6> */}
                  <p className='card-text'>{item?.serviceDescription}</p>
                  {/* <a href='#' className='card-link'>
                    Card link
                  </a>
                  <a href='#' className='card-link'>
                    Another link
                  </a> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {productList.length == 0 && serviceList.length == 0 && (
        <div className='d-flex justify-content-center'>
          <h4>No Product found?</h4>
        </div>
      )}
      {loading && <Spinner />}
    </div>
  );
};

export default LandingPage;
