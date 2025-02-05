import { useRef, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axiosInstance from '../../axios';
import { SquareArrowOutUpRight } from 'lucide-react';
import Spinner from '../../components/common/Spinner';
import { User, MapPin, List, Briefcase, Link as LinkIcon } from 'lucide-react';

const SupplierDetails = () => {
  const [supplierData, setSupplierData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const supplierBusinessId = searchParams.get('id');

  useEffect(() => {
    if (supplierBusinessId) {
      axiosInstance
        .get(
          `/proxy/productsearchsupplier/api/supplier/file/getBusinessProfileDetailsForSupplier?supplierBusinessId=${supplierBusinessId}`
        )
        .then((response) => {
          setSupplierData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching supplier details:', error);
          setLoading(false);
        });
    }
  }, [supplierBusinessId]);

  const profileRef = useRef(null);
  const addressRef = useRef(null);
  const productsRef = useRef(null);
  const servicesRef = useRef(null);
  const connectRef = useRef(null);

  const handleScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // setTimeout(() => {
    //   window.scrollBy(0, -20);
    // }, 200);
  };

  if (loading)
    return (
      <div className='d-flex' style={{ marginTop: '6rem' }}>
        <Spinner />
      </div>
    );
  if (!supplierData)
    return (
      <div className='container' style={{ marginTop: '6rem' }}>
        <p>Supplier details not found.</p>
      </div>
    );

  return (
    <div className='container' style={{ marginTop: '6rem' }}>
      <div className='row'>
        {/* Sidebar */}
        <div
          className='col-md-3 position-fixed'
          style={{ height: '100vh', overflowY: 'auto', maxWidth: '300px' }}
        >
          <div className='list-group'>
            <button
              className='list-group-item list-group-item-action'
              onClick={() => handleScroll(profileRef)}
            >
              <User size={18} /> Profile
            </button>
            <button
              className='list-group-item list-group-item-action'
              onClick={() => handleScroll(addressRef)}
            >
              <MapPin size={18} /> Address
            </button>
            <button
              className='list-group-item list-group-item-action'
              onClick={() => handleScroll(connectRef)}
            >
              <LinkIcon size={18} /> Connect
            </button>
            <button
              className='list-group-item list-group-item-action'
              onClick={() => handleScroll(productsRef)}
            >
              <List size={18} /> Categories
            </button>
            <button
              className='list-group-item list-group-item-action'
              onClick={() => handleScroll(servicesRef)}
            >
              <Briefcase size={18} /> Services
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className='col-md-9 offset-md-3'>
          <div
            ref={profileRef}
            className='p-4 border rounded mb-4 bg-light shadow-lg'
            style={style}
          >
            <div className='row align-items-center'>
              {/* Image Section */}
              <div className='col-md-4 text-center' style={{ height: '200px' }}>
                <div
                  className='border rounded overflow-hidden'
                  style={{ width: '100%', height: '100%' }}
                >
                  <img
                    src={
                      supplierData.businessImage ||
                      'https://via.placeholder.com/200?text=No+Image'
                    }
                    alt='Business'
                    className='img-fluid'
                    style={{ borderRadius: '10px' }}
                  />
                </div>
              </div>

              {/* Details Section */}
              <div className='col-md-8'>
                <h3 className='mb-3'>{supplierData.businessName}</h3>
                <p>
                  <strong>Type:</strong> {supplierData.businessType}
                </p>
                <p>{supplierData.aboutUs}</p>
                <p>
                  <a
                    href={supplierData.webSite}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-primary'
                  >
                    Visit Website
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div
            ref={addressRef}
            className='p-3 border rounded mb-4 bg-light'
            style={style}
          >
            <h3>Address</h3>
            <p>
              {supplierData.street}, {supplierData.businessHouseNo},{' '}
              {supplierData.area}
            </p>
            <p>
              {supplierData.businessCity}, {supplierData.businessCountry},{' '}
              {supplierData.businessZipCode}
            </p>
            {/* <p>
              <strong>Email:</strong> {supplierData.email}
            </p>
            <p>
              <strong>Phone:</strong> {supplierData.phoneNumber}
            </p> */}
          </div>

          <div
            ref={connectRef}
            className='p-3 border rounded mb-4 bg-light'
            style={style}
          >
            <h3>Connect</h3>
            <p>
              <strong>Website: </strong> {supplierData.webSite || 'NA'}{' '}
              {supplierData.webSite && (
                <Link to={supplierData.webSite} target='_blank'>
                  <SquareArrowOutUpRight height={'15px'} />
                </Link>
              )}
            </p>
            <p>
              <strong>Email:</strong> {supplierData.email || 'NA'}
            </p>
            <p>
              <strong>Phone:</strong> {supplierData.phoneNumber || 'NA'}
            </p>
            <p>
              <strong>Fax:</strong> {supplierData.faxNumber || 'NA'}
            </p>
            <p>
              <strong>WhatsApp:</strong> {supplierData.whatsapp || 'NA'}
            </p>
          </div>

          <div
            ref={productsRef}
            className='p-3 border rounded mb-4 bg-light'
            style={style}
          >
            <h3>Categories</h3>
            <ul>
              {supplierData.categories.map((category, index) => (
                <li key={index}>{category}</li>
              ))}
            </ul>
          </div>

          <div
            ref={servicesRef}
            className='p-3 border rounded mb-4 bg-light'
            style={style}
          >
            <h3>Services</h3>
            <ul>
              {supplierData.subCategories.map((subCategory, index) => (
                <li key={index}>{subCategory}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetails;

const style = { scrollMarginTop: '80px' };
