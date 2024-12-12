import { useState } from 'react';
import SupplierDetails from '../components/SupplierForm/SupplierDetails';
// import ProductTransfer from '../components/SupplierForm/ProductTransfer';
// import ServiceTransfer from '../components/SupplierForm/ServiceTransfer';
import BussinessProfile from '../components/SupplierForm/BussinessProfile';
// import ProductList from '../components/Product/ProductList';
// import ServiceList from '../components/Services';

const SupplierForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [expanded, setExpanded] = useState(null);
  console.log('currentStep', currentStep);
  const sidebar = [
    { name: 'Supplier Profile', sub: [] },
    { name: 'Bussiness Profile', sub: [] },
    {
      name: 'Products',
      sub: ['Categories', 'Sub-categories', 'Products List'],
    },
    {
      name: 'Services',
      sub: ['Categories', 'Sub-categories', 'Services List'],
    },
  ];

  const toggleSubmenu = (index) => {
    setCurrentStep((prev) => (prev === index ? null : index));
    setExpanded((prev) => (prev === index ? null : index));
  };

  return (
    <div className='container mt-4' style={{ maxWidth: '850px' }}>
      <div className='row'>
        <div className='col-md-3'>
          <div className='list-group'>
            {sidebar.map((item, index) => (
              <div key={index}>
                <button
                  type='button'
                  className={`list-group-item list-group-item-action ${
                    currentStep === index ? 'active' : ''
                  }`}
                  onClick={() =>
                    item.sub.length
                      ? toggleSubmenu(index)
                      : setCurrentStep(index)
                  }
                >
                  <div className='d-flex justify-content-between'>
                    {item.name}
                    {item.sub.length != 0 && (
                      <>
                        {index == Number(String(currentStep).charAt(0)) ? (
                          <ChevronDown />
                        ) : (
                          <ChevronUp />
                        )}
                      </>
                    )}
                  </div>
                </button>
                {expanded === index &&
                  item.sub.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      type='button'
                      className={`list-group-item list-group-item-action ${
                        currentStep === `${index}-${subIndex}` ? 'active' : ''
                      }`}
                      onClick={() => setCurrentStep(`${index}-${subIndex}`)}
                    >
                      - {subItem}
                    </button>
                  ))}
              </div>
            ))}
          </div>
        </div>

        <div className='col-md-9'>
          {currentStep === 0 && <SupplierDetails />}
          {currentStep === 1 && <BussinessProfile />}
          {/* {currentStep === 2 && <ProductTransfer />}
          {currentStep === 3 && <ServiceTransfer />} */}
          {/* {currentStep === '2-2' && <ProductList />}
          {currentStep === '3-2' && <ServiceList />} */}
        </div>
      </div>
    </div>
  );
};

export default SupplierForm;

const ChevronUp = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className='size-6'
      style={{ width: '20px' }}
    >
      <path
        fillRule='evenodd'
        d='M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z'
        clipRule='evenodd'
      />
    </svg>
  );
};
const ChevronDown = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className='size-6'
      style={{ width: '20px' }}
    >
      <path
        fillRule='evenodd'
        d='M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z'
        clipRule='evenodd'
      />
    </svg>
  );
};
