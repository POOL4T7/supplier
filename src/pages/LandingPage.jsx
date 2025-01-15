import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Spinner from '../components/common/Spinner';
import LocationIcon from '../components/common/LocationIcon';
// import Select from 'react-select';
import { Autocomplete, TextField } from '@mui/material';

const formSchema = yup.object().shape({
  country: yup.string().required('country is required'),
  address: yup.string().required('location is required'),
  searchTerm: yup.string().optional(),
});

const formSchema2 = yup.object().shape({
  country: yup.string().required('country is required'),
  address: yup.string().required('address is required'),
  searchTerm: yup.string().optional(),
  premises: yup.string().required('premises is required'),
  shop: yup.string().required('shop is required'),
});

const LandingPage = () => {
  const [productList, setProductList] = useState([]);
  // const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationSuggestion, setLocationSuggestion] = useState([]);
  const [premisesSuggestion, setPremisesSuggestion] = useState([]);
  const [shopSuggestion, setShopSuggestion] = useState([]);

  const [country, setCountry] = useState('');

  const [formData, setFormData] = useState({
    address: '',
    country: '',
    searchTerm: '',
    premises: '',
    shop: '',
    location: '',
  });

  const form1 = useForm({
    resolver: yupResolver(formSchema),
  });
  const form2 = useForm({
    resolver: yupResolver(formSchema2),
  });

  const onSubmitForm1 = async (data) => {
    try {
      setLoading(true);
      let loc = {};
      try {
        const x = JSON.parse(data.address);
        loc = x;
      } catch (e) {
        console.log(e);
        loc = {
          houseNo: '',
          area: null,
          streetName: data.address,
          zipcode: null,
          city: null,
        };
      }
      const newData = JSON.parse(JSON.stringify(data));
      newData.address = loc;
      const res = await axios.post(
        `/proxy/productsearchsupplier/search`,
        newData
      );

      setProductList(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || 'Something went wrong');
    }
  };

  const onSubmitForm2 = async (data) => {
    try {
      setLoading(true);
      let loc = {};
      try {
        const x = JSON.parse(data.address);
        loc = x;
      } catch (e) {
        console.log(e);
        loc = {
          houseNo: '',
          area: null,
          streetName: data.address,
          zipcode: null,
          city: null,
        };
      }
      const newData = JSON.parse(JSON.stringify(data));
      newData.address = loc;
      const res = await axios.post(
        `/proxy/productsearchsupplier/search`,
        newData
      );
      setProductList(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || 'Something went wrong');
    }
  };

  const handleInputChange = async (inputValue) => {
    if (!inputValue.trim()) {
      return;
    }
    try {
      const res = await axios.post(
        `/proxy/productsearchsupplier/locationSuggestions`,
        {
          country: country,
          location: inputValue,
        }
      );

      setLocationSuggestion(
        res.data.map((item) => ({
          label: Object.values(item)
            .filter((x) => x != null)
            .join(', '),
          value: JSON.stringify(item),
        }))
      );
    } catch (error) {
      console.error('Error fetching business descriptions:', error);
    }
  };

  const handlePremisesAndShopInputChange = async (inputValue) => {
    if (!inputValue.trim()) {
      return;
    }
    let loc = {};
    try {
      try {
        const x = JSON.parse(form2.watch('address'));

        loc = x;
      } catch (e) {
        console.log(e);
        loc = {
          houseNo: '',
          area: null,
          streetName: form2.watch('address'),
          zipcode: null,
          city: null,
        };
      }

      const res = await axios.post(
        `/proxy/productsearchsupplier/premisesOrShopSuggestions`,
        {
          premisesOrShopName: inputValue,
          type: 'premises',
          location: loc,
        }
      );

      setPremisesSuggestion(
        res.data.map((item) => ({ label: item, value: item }))
      );
      // setShowPremisesLoading(false);
    } catch (error) {
      console.error('Error fetching business descriptions:', error);
    }
  };
  const handleShopInputChange = async (inputValue) => {
    if (!inputValue.trim()) {
      return;
    }
    let loc = {};
    try {
      try {
        const x = JSON.parse(form2.watch('address'));
        loc = x;
      } catch (e) {
        console.log(e);
        loc = {
          houseNo: '',
          area: null,
          streetName: form2.watch('address'),
          zipcode: null,
          city: null,
        };
      }

      const res = await axios.post(
        `/proxy/productsearchsupplier/premisesOrShopSuggestions`,
        {
          premisesOrShopName: inputValue,
          type: 'shop',
          location: loc,
        }
      );
      console.log('API Response:', res.data);
      setShopSuggestion(res.data.map((item) => ({ label: item, value: item })));
    } catch (error) {
      console.error('Error fetching business descriptions:', error);
    }
  };

  const debounceFetch = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedInputChange = debounceFetch(handleInputChange, 500);

  const debouncedPremisesInputChange = debounceFetch(
    handlePremisesAndShopInputChange,
    500
  );

  console.log('address', form1.watch('address'), form1.formState.errors);

  return (
    <div className='m-5'>
      {/* Tabs Navigation */}
      <ul className='nav nav-tabs' id='formTabs' role='tablist'>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link active'
            id='location-tab'
            data-bs-toggle='tab'
            data-bs-target='#location'
            type='button'
            role='tab'
            aria-controls='location'
            aria-selected='true'
            onClick={() => {
              setProductList([]);
              setFormData({ ...formData, address: null });
            }}
          >
            Location
          </button>
        </li>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link'
            id='premises-tab'
            data-bs-toggle='tab'
            data-bs-target='#premises'
            type='button'
            role='tab'
            aria-controls='premises'
            aria-selected='false'
            onClick={() => {
              setProductList([]);
            }}
          >
            Premises
          </button>
        </li>
      </ul>

      {/* Tabs Content */}
      <div className='tab-content' id='formTabsContent'>
        {/* Location Form */}
        <div
          className='tab-pane fade show active'
          id='location'
          role='tabpanel'
          aria-labelledby='location-tab'
        >
          <form onSubmit={form1.handleSubmit(onSubmitForm1)} className='mt-4'>
            <div className='row mb-3 justify-content-center'>
              <div className='col-12 col-md-1 mb-2'>
                <TextField
                  id='outlined-basic'
                  label='Country'
                  variant='outlined'
                  {...form1.register('country')}
                  // placeholder='Country'
                  error={!!form1.formState.errors.country}
                  helperText={form1.formState.errors.country?.message}
                  size='small'
                  fullWidth
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>

              {/* Location Name Field */}
              <div className='col-12 col-md-4 mb-2'>
                <Controller
                  name='address'
                  control={form1.control}
                  defaultValue=''
                  rules={{
                    required: 'Location is required',
                  }}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      freeSolo
                      options={locationSuggestion} // Array of objects with label and value
                      getOptionLabel={(option) =>
                        typeof option === 'string' ? option : option.label
                      }
                      onInputChange={(event, value) => {
                        console.log(value); // For debugging
                        field.onChange(value || ''); // Ensure value is always a string
                        if (value.length > 2) {
                          debouncedInputChange(value); // Fetch suggestions
                        }
                      }}
                      onChange={(event, value) => {
                        console.log('changed', value); // For debugging
                        field.onChange(value?.value || ''); // Store only the `value` string
                      }}
                      size='small'
                      fullWidth
                      value={
                        locationSuggestion.find(
                          (option) => option.value === field.value
                        ) || null
                      } // Map `field.value` back to the selected option
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label='Type a location'
                          variant='outlined'
                          fullWidth
                          error={!!form1.formState.errors.address} // Show error if validation fails
                          helperText={form1.formState.errors.address?.message} // Display error message
                        />
                      )}
                      renderOption={(props, option) => (
                        <li key={option.value} {...props}>
                          {option.label}
                        </li>
                      )}
                    />
                  )}
                />
              </div>

              <div className='col-12 col-md-4 mb-2'>
                <TextField
                  id='outlined-basic'
                  label='Product / Service Name'
                  variant='outlined'
                  {...form1.register('searchTerm')}
                  error={!!form1.formState.errors.searchTerm}
                  helperText={form1.formState.errors.searchTerm?.message}
                  size='small'
                  fullWidth
                />
              </div>

              {/* Submit Button */}
              <div className='col-12 col-md-2'>
                <button type='submit' className='btn btn-outline-success w-100'>
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Premises Form */}
        <div
          className='tab-pane fade'
          id='premises'
          role='tabpanel'
          aria-labelledby='premises-tab'
        >
          <form onSubmit={form2.handleSubmit(onSubmitForm2)} className='mt-4'>
            <div className='row mb-3 justify-content-center'>
              {/* Country Field */}
              <div className='col-12 col-md-1 mb-2'>
                <TextField
                  id='outlined-basic'
                  label='Country'
                  variant='outlined'
                  {...form2.register('country')}
                  // placeholder='Country'
                  error={!!form1.formState.errors.country}
                  helperText={form1.formState.errors.country?.message}
                  size='small'
                  fullWidth
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>

              {/* Location Name Field */}
              <div className='col-12 col-md-2 mb-2'>
                <Controller
                  name='address'
                  control={form2.control}
                  defaultValue=''
                  rules={{
                    required: 'Location is required',
                  }}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      freeSolo
                      options={locationSuggestion} // Array of objects with label and value
                      getOptionLabel={(option) =>
                        typeof option === 'string' ? option : option.label
                      }
                      onInputChange={(event, value) => {
                        field.onChange(value || '');
                        if (value.length > 2) {
                          debouncedInputChange(value);
                        }
                      }}
                      onChange={(event, value) => {
                        field.onChange(value.value || '');
                      }}
                      size='small'
                      fullWidth
                      value={
                        locationSuggestion.find(
                          (option) => option.value === field.value
                        ) || null
                      } // Map `field.value` back to the selected option
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label='Type a location'
                          variant='outlined'
                          fullWidth
                          error={!!form2.formState.errors.address} // Show error if validation fails
                          helperText={form2.formState.errors.address?.message} // Display error message
                        />
                      )}
                      renderOption={(props, option) => (
                        <li key={props} {...props}>
                          {option.label}
                        </li>
                      )}
                    />
                  )}
                />
              </div>

              <div className='col-12 col-md-3 mb-2'>
                <Controller
                  name='premises'
                  control={form2.control}
                  defaultValue=''
                  rules={{
                    required: 'premises is required',
                  }}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      freeSolo
                      fullWidth
                      size='small'
                      options={premisesSuggestion.map((item) => item.label)}
                      getOptionLabel={(option) =>
                        typeof option === 'string' ? option : ''
                      }
                      onInputChange={(event, value) => {
                        console;

                        field.onChange(value || '');
                        if (value.length > 2)
                          debouncedPremisesInputChange(value);
                      }}
                      value={field.premises}
                      onChange={(event, newValue) => {
                        field.onChange(newValue || '');
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label='Type a premises'
                          variant='outlined'
                          fullWidth
                          error={!!form2.formState.errors.premises}
                          helperText={form2.formState.errors.premises?.message}
                        />
                      )}
                    />
                  )}
                />
              </div>

              <div className='col-12 col-md-2 mb-2'>
                <Controller
                  name='shop'
                  control={form2.control}
                  defaultValue=''
                  rules={{
                    required: 'shop is required',
                  }}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      freeSolo
                      fullWidth
                      size='small'
                      options={shopSuggestion.map((item) => item.label)}
                      getOptionLabel={(option) =>
                        typeof option === 'string' ? option : ''
                      }
                      onInputChange={(event, value) => {
                        field.onChange(value || '');
                        if (value.length > 2) handleShopInputChange(value);
                      }}
                      value={formData.shop}
                      onChange={(event, newValue) => {
                        field.onChange(newValue || '');
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label='Type a shop'
                          variant='outlined'
                          fullWidth
                          error={!!form2.formState.errors.shop}
                          helperText={form2.formState.errors.shop?.message}
                        />
                      )}
                    />
                  )}
                />
              </div>

              {/* Product/Service Name Field */}
              <div className='col-12 col-md-3 mb-2'>
                <TextField
                  id='outlined-basic'
                  label='Product / Service Name'
                  variant='outlined'
                  {...form2.register('searchTerm')}
                  error={!!form1.formState.errors.searchTerm}
                  helperText={form1.formState.errors.searchTerm?.message}
                  size='small'
                  fullWidth
                />
              </div>

              {/* Submit Button */}
              <div className='col-12 col-md-1'>
                <button type='submit' className='btn btn-outline-success w-100'>
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Product List Section */}
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

      {/* No Product Found */}
      {productList?.length === 0 && (
        <div className='d-flex justify-content-center'>
          <h4>No Product found?</h4>
        </div>
      )}
      {loading && <Spinner />}
    </div>
  );
};

export default LandingPage;
