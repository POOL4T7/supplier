import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import * as yup from 'yup';
// import { isValidFileType, MAX_FILE_SIZE } from '../../utils/form';
import axios from 'axios';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userDetailsAtom } from '../../storges/user';
import { toast } from 'react-toastify';

const step1Schema = yup.object().shape({
  supplierName: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  gender: yup.string().required('Gender is required'),
  phoneNumber: yup
    .string()
    .required('phoneNumber number is required')
    .matches(/^\d{10}$/, 'phoneNumber number must be 10 digits'),
  idProofFront: yup
    .mixed()
    // .required('Required')

    // .test('is-valid-type', 'Not a valid image type', (value) => {
    //   const file = value[0];
    //   return isValidFileType(file && file.name.toLowerCase(), 'image');
    // })
    // .test('is-valid-size', 'Max allowed size is 100KB', (value) => {
    //   const file = value[0];
    //   return file && file.size <= MAX_FILE_SIZE;
    // }),
    .optional(),
  idProofBack: yup
    .mixed()
    // .required('Required')

    // .test('is-valid-type', 'Not a valid image type', (value) => {
    //   const file = value[0];
    //   return isValidFileType(file && file.name.toLowerCase(), 'image');
    // })
    // .test('is-valid-size', 'Max allowed size is 100KB', (value) => {
    //   const file = value[0];
    //   return file && file.size <= MAX_FILE_SIZE;
    // })
    .optional(),
  addressLine1: yup.string().required('Address Line 1 is required'),
  addressLine2: yup.string(),
  zipcode: yup
    .string()
    .required('zipcode is required')
    .matches(/^\d{6}$/, 'zipcode must be 6 digits'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
});

const SupplierDetails = ({ onNext }) => {
  const [userDetails, setUserDetails] = useAtom(userDetailsAtom);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step1Schema),
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `/proxy/productsearchsupplier/api/supplier/profile/addSupplierInfo`,
        data
      );
      const d = {
        ...userDetails,
        ...data,
      };
      setUserDetails({
        ...userDetails,
        ...data,
      });
      localStorage.setItem('user', JSON.stringify(d));
      toast.success(res.data?.data?.message || 'Supplier profile updated');

      onNext();
    } catch (e) {
      toast.error(
        e.response?.data?.error || 'failed: Supplier profile updated'
      );
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `/proxy/productsearchsupplier/api/supplier/profile/supplierProfileDetails?supplierUserId=1`
        );
        reset(res.data);
        // setUserDetails(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [reset, userDetails]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-2'>
        <label className='form-label'>Supplier Name</label>
        <input
          type='text'
          {...register('supplierName')}
          className={`form-control ${errors.supplierName ? 'is-invalid' : ''}`}
        />
        <div className='invalid-feedback'>{errors.supplierName?.message}</div>
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-6 mb-2'>
          <label className='form-label'>Gender</label>
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

        <div className='col-sm-12 col-md-6 mb-2'>
          <label className='form-label'>Phone Number</label>
          <input
            type='text'
            {...register('phoneNumber')}
            className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
          />
          <div className='invalid-feedback'>{errors.phoneNumber?.message}</div>
        </div>
      </div>

      {/* <div className="row">
        <div className="col-sm-12 col-md-6 mb-2">
          <label>Upload ID Proof (Front)</label>
          <div
            className="upload-container"
            onClick={() => document.getElementById("idProofFront").click()}
          >
            <p className="upload-text">Click to upload or drag image here</p>
          </div>
          <input
            type="file"
            id="idProofFront"
            {...register("idProofFront")}
            className="d-none"
          />
          <div className="invalid-feedback">{errors.idProofFront?.message}</div>
        </div>

        <div className="col-sm-12 col-md-6 mb-2">
          <label>Upload ID Proof (Back)</label>
          <div
            className="upload-container"
            onClick={() => document.getElementById("idProofBack").click()}
          >
            <p className="upload-text">Click to upload or drag image here</p>
          </div>
          <input
            type="file"
            id="idProofBack"
            {...register("idProofBack")}
            className="d-none"
          />
          <div className="invalid-feedback">{errors.idProofBack?.message}</div>
        </div>
      </div> */}

      <div className='mb-2'>
        <label className='form-label'>Email</label>
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
          <label className='form-label'>Address Line 1</label>
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
          <label className='form-label'>Address Line 2</label>
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
          <label className='form-label'>Zipcode</label>
          <input
            type='text'
            {...register('zipcode')}
            className={`form-control ${errors.zipcode ? 'is-invalid' : ''}`}
          />
          <div className='invalid-feedback'>{errors.zipcode?.message}</div>
        </div>

        <div className='col-sm-12 col-md-6 mb-2'>
          <label className='form-label'>City</label>
          <input
            type='text'
            {...register('city')}
            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
          />
          <div className='invalid-feedback'>{errors.city?.message}</div>
        </div>
      </div>

      <div className='mb-2'>
        <label className='form-label'>Country</label>
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
        Save & Next
      </button>
    </form>
  );
};

SupplierDetails.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default SupplierDetails;
