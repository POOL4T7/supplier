import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormContainer from '../components/common/FormContainer';
import axios from 'axios';
import { toast } from 'react-toastify';

const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  fullName: yup
    .string()
    .min(3, 'fullName must be at least 3 characters')
    .required('fullName is required'),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `/api/productsearchsupplier/api/supplier/profile/register`,
        data
      );
      toast.success(
        res.data?.message || 'Email is sended on your registred email id'
      );
      console.log(res);
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
          Login
        </button>
      </form>
    </FormContainer>
  );
};

export default Signup;