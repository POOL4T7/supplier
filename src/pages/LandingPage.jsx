import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Spinner from '../components/common/Spinner';
import LocationIcon from '../components/common/LocationIcon';
import Select from 'react-select';

const formSchema = yup.object().shape({
  country: yup.string().required('country is required'),
  address: yup.object().required('address is required'),
  searchTerm: yup.string().optional(),
});

const formSchema2 = yup.object().shape({
  country: yup.string().required('country is required'),
  address: yup.object().required('address is required'),
  searchTerm: yup.string().optional(),
  premises: yup.string().required('premises is required'),
  shop: yup.string().required('shop is required'),
});

const LandingPage = () => {
  const [productList, setProductList] = useState([]);
  // const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationSuggestion, setLocationSuggestion] = useState([
    // { label: '110091', value: '110091' },
  ]);
  const [premisesSuggestion, setPremisesSuggestion] = useState([
    // { label: '110091', value: '110091' },
  ]);
  const [shopSuggestion, setShopSuggestion] = useState([
    // { label: '110091', value: '110091' },
  ]);

  const [showShopLoading, setShowShopLoading] = useState(false);
  const [showPremisesLoading, setShowPremisesLoading] = useState(false);

  const [country, setCountry] = useState('');

  const [formData, setFormData] = useState({
    address: {
      addressLine1: '',
      addressLine2: '',
      zipcode: '',
      city: '',
    },
    country: '',
    searchTerm: '',
    premises: '',
    shop: '',
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
      // data.address = formData.address;
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
      data.address = formData.address;
      const res = await axios.post(`/proxy/productsearchsupplier/search`, data);
      setProductList(res.data);
      setLoading(false);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Something went wrong');
    }
  };

  const handleInputChange = async (inputValue) => {
    if (!inputValue.trim()) {
      // setDescription([]);
      return;
    }
    try {
      const res = await axios.get(
        `/proxy/productsearchsupplier/getLocationSuggestions?location=${inputValue}&country=${country}`
      );

      setLocationSuggestion(
        res.data.map((item) => ({
          label: [item.addressLine1, item.city, item.zipcode].join(' '),
          value: item,
        }))
      );
    } catch (error) {
      console.error('Error fetching business descriptions:', error);
    }
  };
  const handlePremisesAndShopInputChange = async (inputValue, type) => {
    if (!inputValue.trim()) {
      // setDescription([]);
      return;
    }
    try {
      setShowPremisesLoading(true);
      const res = await axios.post(
        `/proxy/productsearchsupplier/getPremisesOrShopSuggestions`,
        {
          premisesOrShopName: inputValue,
          type: type,
          location: formData.address,
        }
      );

      if (type === 'shop') {
        console.log(res);
        setShopSuggestion(
          res.data.map((item) => ({ label: item, value: item }))
        );
      } else if (type == 'premises') {
        setPremisesSuggestion(
          res.data.map((item) => ({ label: item, value: item }))
        );
      }
      setShowPremisesLoading(false);
    } catch (error) {
      console.error('Error fetching business descriptions:', error);
    }
  };
  const handleShopInputChange = async (inputValue, type) => {
    if (!inputValue.trim()) {
      return;
    }
    try {
      setShowShopLoading(true);
      const res = await axios.post(
        `/proxy/productsearchsupplier/getPremisesOrShopSuggestions`,
        {
          premisesOrShopName: inputValue,
          type: type,
          location: formData.address,
        }
      );

      setShopSuggestion(res.data.map((item) => ({ label: item, value: item })));
      setShowShopLoading(false);
    } catch (error) {
      console.error('Error fetching business descriptions:', error);
    }
  };

  // Update `onInputChange` to handle only the string and debounce the API calls
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
  const debouncedShopInputChange = debounceFetch(handleShopInputChange, 500);

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
              {/* Country Field */}
              <div className='col-12 col-md-1 mb-2'>
                <input
                  type='text'
                  className={`form-control ${
                    form1.formState.errors.country ? 'is-invalid' : ''
                  }`}
                  placeholder='Country'
                  {...form1.register('country')}
                />
                {form1.formState.errors.country && (
                  <div className='invalid-feedback'>
                    {form1.formState.errors.country.message}
                  </div>
                )}
              </div>

              {/* Location Name Field */}
              <div className='col-12 col-md-4 mb-2'>
                <Select
                  className='basic-single'
                  classNamePrefix='select'
                  placeholder='Location Name'
                  isClearable
                  isSearchable
                  name='address'
                  options={locationSuggestion}
                  onChange={(selectedOption) => {
                    form1.setValue('address', selectedOption || null);
                    setFormData({ ...formData, address: selectedOption.value });
                    form1.trigger('address');
                  }}
                  onInputChange={(inputValue) => {
                    if (inputValue.length > 2) debouncedInputChange(inputValue);
                    return inputValue;
                  }}
                />
                {form1.formState.errors.address && (
                  <div style={{ color: '#d9534f' }}>
                    {form1.formState.errors.address.message}
                  </div>
                )}
              </div>

              {/* Product/Service Name Field */}
              <div className='col-12 col-md-4 mb-2'>
                <input
                  type='text'
                  className={`form-control ${
                    form1.formState.errors.searchTerm ? 'is-invalid' : ''
                  }`}
                  placeholder='Product / Service Name'
                  {...form1.register('searchTerm')}
                />
                {form1.formState.errors.searchTerm && (
                  <div className='invalid-feedback'>
                    {form1.formState.errors.searchTerm.message}
                  </div>
                )}
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
                <input
                  type='text'
                  className={`form-control ${
                    form2.formState.errors.country ? 'is-invalid' : ''
                  }`}
                  placeholder='Country'
                  {...form2.register('country', {
                    required: 'Country is required',
                  })}
                  onChange={(e) => setCountry(e.target.value)}
                />
                {form2.formState.errors.country && (
                  <div className='invalid-feedback'>
                    {form2.formState.errors.country.message}
                  </div>
                )}
              </div>

              {/* Location Name Field */}
              <div className='col-12 col-md-2 mb-2'>
                <Select
                  className='basic-single'
                  classNamePrefix='select'
                  placeholder='Location Name'
                  isClearable
                  isSearchable
                  name='address'
                  options={locationSuggestion}
                  onChange={(selectedOption) => {
                    form2.setValue('address', selectedOption || null);
                    setFormData({ ...formData, address: selectedOption.value });
                    form2.trigger('address');
                  }}
                  onInputChange={(inputValue) => {
                    if (inputValue.length > 2) debouncedInputChange(inputValue);
                    return inputValue;
                  }}
                />
                {form2.formState.errors.address && (
                  <div style={{ color: '#d9534f' }}>
                    {form2.formState.errors.address.message}
                  </div>
                )}
              </div>

              {/* Premises Field */}
              <div className='col-12 col-md-3 mb-2'>
                <Select
                  className='basic-single'
                  classNamePrefix='select'
                  placeholder='Premises Name'
                  isClearable
                  isSearchable
                  name='premises'
                  isLoading={showPremisesLoading}
                  options={premisesSuggestion}
                  onChange={(value, { action }) => {
                    if (action == 'select-option') {
                      setFormData({ ...formData, premises: value.value });
                      form2.setValue('premises', value.value);
                    } else {
                      setFormData({ ...formData, premises: '' });
                      form2.setValue('premises', '');
                    }
                    form2.trigger('premises');
                  }}
                  onInputChange={(inputValue) => {
                    if (inputValue.length > 2)
                      debouncedPremisesInputChange(inputValue, 'premises');
                    return inputValue;
                  }}
                />
                {form2.formState.errors.premises && (
                  <div style={{ color: '#d9534f' }}>
                    {form2.formState.errors.premises.message}
                  </div>
                )}
              </div>

              <div className='col-12 col-md-2 mb-2'>
                <Select
                  className='basic-shop-single'
                  classNamePrefix='select'
                  placeholder='Search for Shop'
                  isClearable
                  isSearchable
                  name='shop-form2'
                  isLoading={showShopLoading}
                  options={shopSuggestion}
                  onChange={(value, { action }) => {
                    if (action == 'select-option') {
                      setFormData({ ...formData, shop: value.value });
                      form2.setValue('shop', value.value);
                    } else {
                      setFormData({ ...formData, shop: '' });
                      form2.setValue('shop', '');
                    }
                    form2.trigger('shop');
                  }}
                  onInputChange={(inputValue) => {
                    if (inputValue.length > 2)
                      debouncedShopInputChange(inputValue, 'shop');
                    return inputValue;
                  }}
                />
                {form2.formState.errors.shop && (
                  <div style={{ color: '#d9534f' }}>
                    {form2.formState.errors.shop.message}
                  </div>
                )}
              </div>

              {/* Product/Service Name Field */}
              <div className='col-12 col-md-3 mb-2'>
                <input
                  type='text'
                  className={`form-control ${
                    form2.formState.errors.searchTerm ? 'is-invalid' : ''
                  }`}
                  placeholder='Product / Service Name'
                  {...form2.register('searchTerm', {
                    required: 'Product/Service name is required',
                  })}
                />
                {form2.formState.errors.searchTerm && (
                  <div className='invalid-feedback'>
                    {form2.formState.errors.searchTerm.message}
                  </div>
                )}
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
