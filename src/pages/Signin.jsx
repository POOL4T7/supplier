import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormContainer from '../components/common/FormContainer';
import axiosInstance from '../axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { userDetailsAtom } from '../storges/user';
import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(3, 'Password must be at least 6 characters')
    .required('Password is required'),
  userType: yup.string().oneOf(['supplier', 'admin'], 'Select a user type'),
});

const LoginForm = () => {
  const [userDetails, setUserDetails] = useAtom(userDetailsAtom);
  const navigate = useNavigate();
  console.log('userDetails', userDetails);
  useEffect(() => {
    if (userDetails?.id) {
      navigate('/profile');
    }
  }, [navigate, userDetails]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post(
        `/proxy/productsearchsupplier/api/supplier/profile/login`,
        data
      );
      setUserDetails(res.data?.supplierProfile);
      localStorage.setItem('user', JSON.stringify(res.data?.supplierProfile));
      localStorage.setItem('authAccessToken', res.data.accessToken);
      window.location.href = '/profile';
    } catch (e) {
      toast.error(e.response?.data?.errorMessage || 'Something went wrong');
    }
  };

  return (
    <FormContainer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='login-form'
        style={{ maxWidth: '500px' }}
      >
        <h2>Login</h2>
        <div className='mb-3'>
          <label className='form-label d-block'>User Type</label>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              id='supplier'
              value='supplier'
              {...register('userType')}
              defaultChecked
            />
            <label className='form-check-label' htmlFor='supplier'>
              Supplier
            </label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              id='admin'
              value='admin'
              {...register('userType')}
            />
            <label className='form-check-label' htmlFor='admin'>
              Admin
            </label>
          </div>
          {errors.userType && (
            <small className='text-danger d-block'>
              {errors.userType.message}
            </small>
          )}
        </div>
        <div className='mb-3'>
          <label>Email</label>
          <input
            type='email'
            {...register('email')}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && (
            <div className='invalid-feedback'>{errors.email.message}</div>
          )}
        </div>

        <div className='mb-3'>
          <label>Password</label>
          <input
            type='password'
            {...register('password')}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          {errors.password && (
            <div className='invalid-feedback'>{errors.password.message}</div>
          )}
        </div>
        <button type='submit' className='btn btn-primary'>
          Login
        </button>
      </form>
      <div className='row pt-3'>
        <div className='col'>
          New Customer?
          <Link className='link-primary' to='/register'>
            {' '}
            Register
          </Link>
        </div>
      </div>
    </FormContainer>
  );
};

export default LoginForm;
