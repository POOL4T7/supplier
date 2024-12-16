// import axiosInstance from '../../axios';
import { useState } from 'react';
// import { userDetailsAtom } from '../../storges/user';
// import { useAtom } from 'jotai';
// import { toast } from 'react-toastify';

const ServiceCategory = () => {
  const [uploadedCategories, setUploadedCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [movedCategories, setMovedCategories] = useState([]);
  const [isLeftSelected, setIsLeftSelected] = useState(false);
  const [isRightSelected, setIsRightSelected] = useState(false);
  // const [supplier] = useAtom(userDetailsAtom);
  const [categoriesValue, setCategoriesValue] = useState('');

  const toggleSelectProduct = (service, type) => {
    if (type === 'left') {
      setIsLeftSelected(false);
      setIsRightSelected(true);
    } else {
      setIsLeftSelected(true);
      setIsRightSelected(false);
    }
    setSelectedCategories((prevSelected) => {
      const newTemp = prevSelected.includes(service)
        ? prevSelected.filter((p) => p !== service)
        : [...prevSelected, service];
      if (newTemp.length == 0) {
        setIsLeftSelected(false);
        setIsRightSelected(false);
      }
      return newTemp;
    });
  };

  const moveToRight = () => {
    setMovedCategories((prev) => [...prev, ...selectedCategories]);
    setUploadedCategories((prev) =>
      prev.filter((p) => !selectedCategories.includes(p))
    );
    setSelectedCategories([]);
    setIsRightSelected(false);
  };

  const moveToLeft = () => {
    setUploadedCategories((prev) => [...prev, ...selectedCategories]);
    setMovedCategories((prev) =>
      prev.filter((p) => !selectedCategories.includes(p))
    );
    setSelectedCategories([]);
    setIsLeftSelected(false);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const list = categoriesValue.split(',').map((item, idx) => {
      return {
        id: idx,
        name: item,
      };
    });
    // if (!productName || !description) {
    //   toast.error('Please upload service in correct format');
    //   return;
    // }
    setUploadedCategories([...uploadedCategories, ...list]);
    setCategoriesValue('');
  };

  // const submit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const data = {
  //       supplierBusinessId: supplier.id,
  //       productId: movedCategories.map((item) => item.id),
  //       status: true,
  //     };
  //     const res = await axiosInstance.post(
  //       '/proxyproductsearchsupplier/api/supplier/file/productservicestatus',
  //       data
  //     );
  //     console.log(res);
  //     toast.success(res.data.message);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <div className='container'>
      <div className='mb-3'>
        <div className='row'>
          <div className='col-10'>
            <h3>Add Service Category</h3>
          </div>
          <div className='col-2'>
            <button
              className='btn btn-primary'
              // onClick={submit}
              disabled={!movedCategories.length}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <form>
        <div className='row'>
          <div className='col-10'>
            <div className='mb-2'>
              <input
                type='text'
                value={categoriesValue}
                className={`form-control`}
                placeholder='enter category name'
                onChange={(e) => setCategoriesValue(e.target.value)}
              />
            </div>
          </div>
          <div className='col-2'>
            <button
              className=' btn btn-primary '
              onClick={handleAddProduct}
              disabled={!categoriesValue}
            >
              Add
            </button>
          </div>
        </div>
      </form>
      <div
        className='row align-items-center justify-content-between'
        style={{ maxHeight: '80vh', height: '100%' }}
      >
        <div
          className='col-md-5 border p-3'
          style={{ height: '60vh', overflow: 'scroll' }}
        >
          <h5 className='mb-3'>Service Category</h5>

          {uploadedCategories.length > 0 ? (
            uploadedCategories.map((service) => (
              <div key={service.id} className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id={`uploaded-${service.id}`}
                  checked={selectedCategories.includes(service)}
                  onChange={() => toggleSelectProduct(service, 'left')}
                />
                <label
                  className='form-check-label'
                  htmlFor={`uploaded-${service.id}`}
                >
                  {service.name}
                </label>
              </div>
            ))
          ) : (
            <p className='text-muted'>No service category added.</p>
          )}
        </div>

        <div className='col-md-2 d-flex flex-column align-items-center'>
          <button
            className='btn btn-primary mb-2'
            onClick={moveToRight}
            disabled={!isRightSelected}
          >
            &gt;&gt;
          </button>
          <button
            className='btn btn-primary'
            onClick={moveToLeft}
            disabled={!isLeftSelected}
          >
            &lt;&lt;
          </button>
        </div>

        <div
          className='col-md-5 border pt-3'
          style={{ height: '60vh', overflow: 'scroll' }}
        >
          <h5 className='mb-3'>Selected Service Category</h5>
          {movedCategories.length > 0 ? (
            movedCategories.map((service) => (
              <div key={service.id} className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id={`moved-${service.id}`}
                  checked={selectedCategories.includes(service)}
                  onChange={() => toggleSelectProduct(service, 'right')}
                />
                <label
                  className='form-check-label'
                  htmlFor={`moved-${service.id}`}
                >
                  {service.name}
                </label>
              </div>
            ))
          ) : (
            <p className='text-muted'>No service category selected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCategory;
