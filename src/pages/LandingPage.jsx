import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

const formSchema = yup
  .object()
  .shape({
    country: yup.string().optional(),
    location: yup.string().optional(),
    mall: yup.string().optional(),
    premises: yup.string().optional(),
  })
  .test('at-least-one', 'At least one field is required', (values) =>
    Object.values(values).some((value) => value && value.trim().length > 0)
  );

const LandingPage = () => {
  const form1 = useForm({
    resolver: yupResolver(formSchema),
  });
  const form2 = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitForm1 = async (data) => {
    try {
      const res = await axios.post(`/api/productsearchsupplier/search`, data);
      console.log(res);
      // setUserDetails(res.data?.supplierProfile);
      // localStorage.setItem('user', JSON.stringify(res.data?.supplierProfile));
    } catch (e) {
      toast.error(e.response?.data?.message || 'Something went wrong');
    }
  };

  const onSubmitForm2 = async (data) => {
    try {
      const res = await axios.post(`/api/productsearchsupplier/search`, data);
      console.log(res);
      // setUserDetails(res.data?.supplierProfile);
      // localStorage.setItem('user', JSON.stringify(res.data?.supplierProfile));
    } catch (e) {
      toast.error(e.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className='container form-container mt-5'>
      <form onSubmit={form1.handleSubmit(onSubmitForm1)}>
        <div className='row mb-3 justify-content-center'>
          <div className='col-12 col-md-2 mb-2'>
            <input
              type='text'
              className='form-control'
              placeholder='Country'
              {...form1.register('country')}
            />
          </div>
          <div className='col-12 col-md-3 mb-2'>
            <input
              type='text'
              className='form-control'
              placeholder='Location Name/Pincode'
              {...form1.register('location')}
            />
          </div>
          <div className='col-12 col-md-4 mb-2'>
            <input
              type='text'
              className='form-control'
              placeholder='product / service name'
              {...form1.register('mall')}
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
          <div className='col-12 col-md-2 mb-2'>
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
              placeholder='Location Name/Pincode'
              {...form2.register('location')}
            />
          </div>
          <div className='col-12 col-md-4 mb-2'>
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
              placeholder='product / service name'
              {...form2.register('mall')}
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
    </div>
  );
};

export default LandingPage;
