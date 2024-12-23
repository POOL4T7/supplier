import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormContainer from '../components/common/FormContainer';
import axiosInstance from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  fullName: yup
    .string()
    .min(3, 'fullName must be at least 3 characters')
    .required('fullName is required'),
  userType: yup.string().oneOf(['supplier', 'admin'], 'Select a user type'),
});

const Signup = () => {
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post(
        `/proxy/productsearchsupplier/api/supplier/profile/register`,
        data
      );
      toast.success(
        res.data?.message || 'Email is sended on your registred email id'
      );
      localStorage.setItem('userEmail', data.email);
      // navigate('/register-completeion');
      reset();
    } catch (e) {
      toast.error('something went wrong, please try again after some time');
      console.log(e);
    }
  };

  return (
    <FormContainer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='register-form'
        style={{ maxWidth: '500px' }}
      >
        <h2>Signup</h2>
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
          <label>Full Name</label>
          <input
            type='text'
            {...register('fullName')}
            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
          />
          {errors.fullName && (
            <div className='invalid-feedback'>{errors.fullName.message}</div>
          )}
        </div>
        <button
          type='submit'
          className='btn btn-primary'
          disabled={isSubmitting}
        >
          Signup
        </button>
      </form>
      <div className='row pt-3'>
        <div className='col'>
          Already have account?
          <Link className='link-primary' to='/signin'>
            {' '}
            Login
          </Link>
        </div>
      </div>
    </FormContainer>
  );
};

export default Signup;
