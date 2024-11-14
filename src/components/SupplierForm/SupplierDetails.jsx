import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { isValidFileType, MAX_FILE_SIZE } from '../../utils/form';

const step1Schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  gender: yup.string().required('Gender is required'),
  mobile: yup
    .string()
    .required('Mobile number is required')
    .matches(/^\d{10}$/, 'Mobile number must be 10 digits'),
  idProofFront: yup
    .mixed()
    .required('Required')
    .test('is-valid-type', 'Not a valid image type', (value) => {
      const file = value[0];
      return isValidFileType(file && file.name.toLowerCase(), 'image');
    })
    .test('is-valid-size', 'Max allowed size is 100KB', (value) => {
      const file = value[0];
      return file && file.size <= MAX_FILE_SIZE;
    }),
  idProofBack: yup
    .mixed()
    .required('Required')
    .test('is-valid-type', 'Not a valid image type', (value) => {
      const file = value[0];
      return isValidFileType(file && file.name.toLowerCase(), 'image');
    })
    .test('is-valid-size', 'Max allowed size is 100KB', (value) => {
      const file = value[0];
      return file && file.size <= MAX_FILE_SIZE;
    }),
  addressLine1: yup.string().required('Address Line 1 is required'),
  addressLine2: yup.string(),
  pincode: yup
    .string()
    .required('Pincode is required')
    .matches(/^\d{6}$/, 'Pincode must be 6 digits'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
});

const SupplierDetails = ({ onNext, saveData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step1Schema),
    mode: 'onTouched',
  });

  const onSubmit = (data) => {
    saveData(data); // Save step data before moving on
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Supplier Name */}
      <div className='mb-2'>
        <label>Supplier Name</label>
        <input
          type='text'
          {...register('name')}
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
        />
        <div className='invalid-feedback'>{errors.name?.message}</div>
      </div>

      <div className='row'>
        {/* Gender Dropdown */}
        <div className='col-sm-12 col-md-6 mb-2'>
          <label>Gender</label>
          <select
            {...register('gender')}
            className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
          >
            <option value=''>Select Gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>
          <div className='invalid-feedback'>{errors.gender?.message}</div>
        </div>

        {/* Mobile Number */}
        <div className='col-sm-12 col-md-6 mb-2'>
          <label>Mobile Number</label>
          <input
            type='text'
            {...register('mobile')}
            className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
          />
          <div className='invalid-feedback'>{errors.mobile?.message}</div>
        </div>
      </div>

      {/* ID Proof Images */}
      <div className='row'>
        <div className='col-sm-12 col-md-6 mb-2'>
          <label>Upload ID Proof (Front)</label>
          <input
            type='file'
            {...register('idProofFront')}
            className={`form-control ${
              errors.idProofFront ? 'is-invalid' : ''
            }`}
          />
          <div className='invalid-feedback'>{errors.idProofFront?.message}</div>
        </div>

        <div className='col-sm-12 col-md-6 mb-2'>
          <label>Upload ID Proof (Back)</label>
          <input
            type='file'
            {...register('idProofBack')}
            className={`form-control ${errors.idProofBack ? 'is-invalid' : ''}`}
          />
          <div className='invalid-feedback'>{errors.idProofBack?.message}</div>
        </div>
      </div>

      {/* Email */}
      <div className='mb-2'>
        <label>Email</label>
        <input
          type='email'
          {...register('email')}
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
        />
        <div className='invalid-feedback'>{errors.email?.message}</div>
      </div>

      {/* Address Fields */}
      <div className='row'>
        <div className='col-sm-12 col-md-6 mb-2'>
          <label>Address Line 1</label>
          <input
            type='text'
            {...register('addressLine1')}
            className={`form-control ${
              errors.addressLine1 ? 'is-invalid' : ''
            }`}
          />
          <div className='invalid-feedback'>{errors.addressLine1?.message}</div>
        </div>

        <div className='col-sm-12 col-md-6 mb-2'>
          <label>Address Line 2</label>
          <input
            type='text'
            {...register('addressLine2')}
            className={`form-control ${
              errors.addressLine2 ? 'is-invalid' : ''
            }`}
          />
          <div className='invalid-feedback'>{errors.addressLine2?.message}</div>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-6 mb-2'>
          <label>Pincode</label>
          <input
            type='text'
            {...register('pincode')}
            className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
          />
          <div className='invalid-feedback'>{errors.pincode?.message}</div>
        </div>

        <div className='col-sm-12 col-md-6 mb-2'>
          <label>City</label>
          <input
            type='text'
            {...register('city')}
            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
          />
          <div className='invalid-feedback'>{errors.city?.message}</div>
        </div>
      </div>

      <div className='mb-2'>
        <label>Country</label>
        <select
          {...register('country')}
          className={`form-control ${errors.country ? 'is-invalid' : ''}`}
        >
          <option value=''>Select Country</option>
          <option value='India'>India</option>
          <option value='USA'>USA</option>
          <option value='UK'>UK</option>
          {/* Add more countries as needed */}
        </select>
        <div className='invalid-feedback'>{errors.country?.message}</div>
      </div>

      <button type='submit' className='btn btn-primary my-2 my-sm-0'>
        Next
      </button>
    </form>
  );
};

SupplierDetails.propTypes = {
  onNext: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
};

export default SupplierDetails;
