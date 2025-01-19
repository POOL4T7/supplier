import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as yup from 'yup';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { bussinessProfile, userDetailsAtom } from '../../storges/user';
import Spinner from '../../components/common/Spinner';
import { Button } from '@mui/material';

const bussinessSchema = yup.object().shape({
  businessName: yup.string().required('Business name is required'),
  businessNickName: yup
    .string()
    .required('Business nick name is required')
    .test('nickname-length', 'max 4 nick name are allowed', (value) => {
      if (!value) return true;
      const commaCount = value.split(',').length - 1;
      return commaCount <= 3;
    }),
  businessKeyWords: yup
    .string()
    .required('Business key word  is required')
    .test('keyword-length', 'max 20 nick keyword are allowed', (value) => {
      if (!value) return true;
      const commaCount = value.split(',').length - 1;
      return commaCount <= 20;
    }),
  aboutUs: yup.string().required('about us is required'),
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function BussinessProfile() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [supplier] = useAtom(userDetailsAtom);
  const [bussiness] = useAtom(bussinessProfile);
  const [certificate, setCertificate] = useState(null);
  // const [shopImageFile, setShopImageFile] = useState(null);
  const [certificateLink, setCertificateLink] = useState('');
  const [shopImageLink, setShopImageLink] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [shopImageLoading, setShopImageLoading] = useState(false);
  const [certificateBase64, setCertificateBase64] = useState({
    file: '',
    extension: '',
  });
  const [shopImage, setShopImage] = useState({
    file: '',
    extension: '',
  });

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
      businessNickName: '',
      businessKeyWords: '',
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
    if (bussiness?.id) {
      if (bussiness.businessName) x.businessName = bussiness.businessName;
      if (bussiness.businessNickName)
        x.businessNickName = bussiness.businessNickName.join(',');
      if (bussiness.businessKeyWords)
        x.businessKeyWords = bussiness.businessKeyWords.join(',');
      if (bussiness.streetName) x.streetName = bussiness.streetName;
      if (bussiness.aboutUs) x.aboutUs = bussiness.aboutUs;
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
      if (bussiness.businessTaxId) x.businessTaxId = bussiness.businessTaxId;
      setCertificateLink(bussiness.certificateImagePath);
      setShopImageLink(bussiness.businessImagePath);
      reset(x);
      const fetchByteArray = async (type) => {
        try {
          const response = await axiosInstance.get(
            `/proxy/productsearchsupplier/api/supplier/file/getCertificateOrBusinessImage?supplierBusinessId=${bussiness.id}&type=${type}`,
            {
              responseType: 'arraybuffer', // Important for binary data
            }
          );

          let docType = 'application/pdf'; // Default to PDF

          if (type === 'Certificate' && bussiness.certificateImagePath) {
            const extension = bussiness.certificateImagePath
              .split('.')
              .pop()
              .toLowerCase(); // Extract file extension
            if (['jpeg', 'jpg', 'png'].includes(extension)) {
              docType = `image/${extension}`;
            }
          }

          if (type === 'BusinessImage') {
            // Assuming BusinessImage is always PNG for now
            docType = 'image/png';
          }

          console.log('Determined Content-Type:', docType);

          const blob = new Blob([response.data], { type: docType });
          const url = URL.createObjectURL(blob);

          if (type == 'BusinessImage') {
            setShopImage({ file: url, extension: docType.split('/').pop() });
          } else {
            setCertificateBase64({
              file: url,
              extension: docType.split('/').pop(),
            });
          }

          console.log('Generated Blob URL:', url);
        } catch (error) {
          console.error('Error fetching byte array:', error);
        }
      };

      if (bussiness.certificateImagePath) fetchByteArray('Certificate');
      if (bussiness.businessImagePath) fetchByteArray('BusinessImage');
    }
  }, [reset, bussiness]);

  const onSubmit = async (data) => {
    try {
      delete data.businessDescription;
      // console.log('data', data);
      data.businessKeyWords = data.businessKeyWords.split(',');
      data.businessNickName = data.businessNickName.split(',');
      data.certificateImagePath = certificateLink;
      data.businessImagePath = shopImageLink;
      // productsearchsupplier/api/supplier/file/saveSupplierBusinessDetails
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

  const uplaodCertificate = async () => {
    // e.preventDefault();
    setImageLoading(true);

    const formData = new FormData();
    formData.append('file', certificate[0]);
    formData.append('supplierBusinessId', bussiness.id);
    formData.append('type', 'Certificate');
    try {
      const res = await axiosInstance.post(
        '/proxy/productsearchsupplier/api/supplier/file/uploadBusinessImageOrCertificatePreview',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const contentType = certificate[0].type || 'application/octet-stream';
      const blob = new Blob([certificate[0]], {
        type: contentType,
      });

      const url = URL.createObjectURL(blob);
      setCertificateBase64({
        file: url,
        extension: contentType.split('/').pop(),
      });

      setCertificateLink(res.data?.filePath);
      setImageLoading(false);

      // const url = URL.createObjectURL(blob);
      // setShopImage({
      //   file: url,
      //   extension: contentType.split('/').pop(),
      // });

      // setShopImageLink(res.data?.filePath);
      // setShopImageLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const uplaodShopImage = async (e) => {
    // e.preventDefault();
    setShopImageLoading(true);
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('supplierBusinessId', bussiness.id);
    formData.append('type', 'BusinessImage');
    try {
      const res = await axiosInstance.post(
        '/proxy/productsearchsupplier/api/supplier/file/uploadBusinessImageOrCertificatePreview',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const contentType = file.type || 'image/png';
      const blob = new Blob([file], {
        type: contentType,
      });

      const url = URL.createObjectURL(blob);
      setShopImage({
        file: url,
        extension: contentType.split('/').pop(),
      });

      setShopImageLink(res.data?.filePath);
      setShopImageLoading(false);

      // const url = URL.createObjectURL(blob);
      // setShopImage({
      //   file: url,
      //   extension: contentType.split('/').pop(),
      // });

      // setShopImageLink(res.data?.filePath);
      // setShopImageLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='row'>
      <div className='col-8'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Box
              sx={{
                bgcolor: 'background.paper',
                marginTop: '2rem',
                // width: '700px',
              }}
            >
              <AppBar position='static'>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor='secondary'
                  textColor='inherit'
                  variant='fullWidth'
                  aria-label='full width tabs example'
                  centered
                  sx={{
                    bgcolor: 'primary.light',
                  }}
                >
                  <Tab label='Bussiness Address' {...a11yProps(0)} />
                  <Tab
                    label='Business Web Address Contact details'
                    {...a11yProps(1)}
                  />
                  <Tab
                    label='Business Nature & Tax details'
                    {...a11yProps(2)}
                  />
                </Tabs>
              </AppBar>
              <TabPanel
                value={value}
                index={0}
                dir={theme.direction}
                sx={{ color: 'primary-light' }}
              >
                <>
                  <div className='row'>
                    <div className='col-6'>
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
                    </div>
                    <div className='col-6'>
                      <div className='mb-2'>
                        <label className='form-label'>
                          Bussiness Nick Name
                        </label>
                        <input
                          type='text'
                          {...register('businessNickName')}
                          className={`form-control ${
                            errors.businessNickName ? 'is-invalid' : ''
                          }`}
                        />
                        <div className='invalid-feedback'>
                          {errors.businessNickName?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mb-2'>
                    <label className='form-label'>Bussiness Keywords</label>
                    <input
                      type='text'
                      {...register('businessKeyWords')}
                      className={`form-control ${
                        errors.businessKeyWords ? 'is-invalid' : ''
                      }`}
                      // value={keywordsInput}
                      // onChange={(e) => setKeywordsInput(e.target.value)}
                    />
                    <small>comma seperated keywords (ex: key1, key2)</small>
                    <div className='invalid-feedback'>
                      {errors.businessKeyWords?.message}
                    </div>
                  </div>
                  <div className='mb-2'>
                    <label className='form-label'>About Us</label>
                    <textarea
                      type='text'
                      {...register('aboutUs')}
                      className={`form-control ${
                        errors.aboutUs ? 'is-invalid' : ''
                      }`}
                    />

                    <div className='invalid-feedback'>
                      {errors.aboutUs?.message}
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
                    <div className='invalid-feedback'>
                      {errors.area?.message}
                    </div>
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
                      <label className='form-label'>
                        City / Town / Village
                      </label>
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
                  onClick={() => setValue(1)}
                >
                  Next
                </button>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <>
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
                      className={`form-control ${
                        errors.email ? 'is-invalid' : ''
                      }`}
                    />
                    <div className='invalid-feedback'>
                      {errors.email?.message}
                    </div>
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
                    onClick={() => setValue(2)}
                  >
                    Next
                  </button>
                </>
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
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
                      <option value='retail'>Retail</option>
                      <option value='wholesale traders'>
                        Wholesale traders
                      </option>
                      <option value='retail and wholesale'>
                        Retail and wholesale
                      </option>
                      <option value='manufacturing'>Manufacturing</option>
                      <option value='service'>Service</option>
                      <option value='charity organizations'>
                        Charity organizations
                      </option>

                      <option value='wholeGovt organizationssale'>
                        Govt Organizations
                      </option>
                      <option value='Individuals/ freelancers'>
                        Individuals/ freelancers
                      </option>
                    </select>
                    <div className='invalid-feedback'>
                      {errors.sector?.message}
                    </div>
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
                        // accept='image/*'
                        onChange={(e) => setCertificate(e.target.files)}
                      />
                      <button
                        type='button'
                        className='btn btn-primary'
                        id='uploadButton'
                        onClick={async (e) => {
                          e.preventDefault();
                          await uplaodCertificate('Certificate');
                        }}
                      >
                        {imageLoading ? (
                          <Spinner width='15px' height='15px' />
                        ) : (
                          'Upload'
                        )}
                      </button>
                    </div>
                  </div>

                  <div className='preview-box' id='previewBox'>
                    {!certificateBase64 && (
                      <span className='preview-placeholder'>
                        No Certificate Uploaded
                      </span>
                    )}
                    {['jpeg', 'png'].includes(certificateBase64.extension) ? (
                      <img
                        src={certificateBase64.file}
                        alt='Preview'
                        style={{ width: '300px' }}
                      />
                    ) : (
                      <iframe
                        src={certificateBase64.file}
                        title='PDF Preview'
                        width='300px'
                        height='100%'
                        style={{ border: 'none' }}
                      />
                    )}
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
                      {isSubmitting && <Spinner width='15px' height='15px' />}{' '}
                      Save
                    </button>
                  </div>
                </div>
              </TabPanel>
            </Box>
          </Box>
        </form>
      </div>
      <div className='col-4'>
        <label
          htmlFor='image-upload'
          style={{
            display: 'block',
            width: '100%',
            cursor: 'pointer',
          }}
        >
          <Box
            sx={{
              marginTop: '2rem',
              height: '300px',
              width: '100%',
              border: '1px dashed gray',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f8f8f8',
            }}
          >
            {shopImage ? (
              <img
                src={shopImage.file}
                alt='Preview'
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              />
            ) : (
              <p style={{ color: 'gray' }}>Click to upload shop image</p>
            )}
          </Box>
          <input
            id='image-upload'
            type='file'
            accept='image/*'
            hidden
            onChange={uplaodShopImage}
          />
        </label>
        <Box
          sx={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            component='label'
            variant='outlined'
            sx={{
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => {}}
          >
            {shopImageLoading ? 'Upoading' : 'Save'}
          </Button>
        </Box>
      </div>
    </div>
  );
}
