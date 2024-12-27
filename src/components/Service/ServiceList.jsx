import axiosInstance from '../../axios';
import { useEffect, useState } from 'react';
import { bussinessProfile, userDetailsAtom } from '../../storges/user';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

const ServiceList = () => {
  const [uploadedProducts, setUploadedProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [movedProducts, setMovedProducts] = useState([]);
  const [isLeftSelected, setIsLeftSelected] = useState(false);
  const [isRightSelected, setIsRightSelected] = useState(false);
  const [supplier] = useAtom(userDetailsAtom);
  const [productValue, setProductValue] = useState('');
  const [bussiness] = useAtom(bussinessProfile);

  const handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();

      if (file) {
        formData.append('file', file);
        formData.append('supplierId', supplier.id);
        formData.append('supplierBusinessId', bussiness.id);
        formData.append('type', 'SERVICE');
        const res = await axiosInstance.post(
          '/proxy/productsearchsupplier/api/supplier/file/uploadSupplierBusinessDetails',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        toast.success(res.data.message);
        setUploadedProducts([
          ...uploadedProducts,
          ...(res.data?.serviceDetailsList || []),
        ]);
      }
    } catch (e) {
      console.log(e);
      toast.error('file uplaod error');
    }
  };

  const toggleSelectProduct = (service, type) => {
    if (type === 'left') {
      setIsLeftSelected(false);
      setIsRightSelected(true);
    } else {
      setIsLeftSelected(true);
      setIsRightSelected(false);
    }
    setSelectedProducts((prevSelected) => {
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
    setMovedProducts((prev) => [...prev, ...selectedProducts]);
    setUploadedProducts((prev) =>
      prev.filter((p) => !selectedProducts.includes(p))
    );
    setSelectedProducts([]);
    setIsRightSelected(false);
  };

  const moveToLeft = () => {
    setUploadedProducts((prev) => [...prev, ...selectedProducts]);
    setMovedProducts((prev) =>
      prev.filter((p) => !selectedProducts.includes(p))
    );
    setSelectedProducts([]);
    setIsLeftSelected(false);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!productValue) return;
    const [brand, serviceName, serviceDescription] = productValue.split(',');
    if (!serviceName || !serviceDescription || !brand) {
      toast.error('Please upload service in correct format');
      return;
    }
    setUploadedProducts([
      ...uploadedProducts,
      { id: 1, serviceName, serviceDescription },
    ]);
    const res = axiosInstance.post(
      'proxy/productsearchsupplier/api/supplier/file/addProductsOrServices',
      {
        fileRowDataList: [
          {
            name: serviceName,
            brand,
            serviceDescription,
          },
        ],
        supplierBusinessId: bussiness.id,
        type: 'PRODUCT',
        supplierId: supplier.id,
      }
    );
    console.log('res', res);
    setProductValue('');
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        supplierBusinessId: supplier.id,
        serviceId: movedProducts.map((item) => item.id),
        status: true,
        supplierId: supplier.id,
      };
      const res = await axiosInstance.post(
        '/proxyproductsearchsupplier/api/supplier/file/productservicestatus',
        data
      );
      console.log(res);
      toast.success(res.data.message);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          `/proxy/productsearchsupplier/services/getAllServiceDetails?supplierBusinessId=${bussiness.id}`
        );
        setUploadedProducts(res.data.filter((item) => !item.active));
        setMovedProducts(res.data.filter((item) => item.active));
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='container'>
      <div className='mb-3'>
        <div className='d-flex justify-content-between mb-2'>
          <h3>Upload Service File</h3>
          <button
            className='btn btn-primary mt-2'
            onClick={submit}
            disabled={!movedProducts.length}
          >
            Update
          </button>
        </div>
        <input
          type='file'
          className='form-control'
          onChange={handleFileUpload}
        />
      </div>
      <form>
        <div className='row'>
          <div className='col-10'>
            <div className='mb-2'>
              <input
                type='text'
                value={productValue}
                className={`form-control`}
                onChange={(e) => setProductValue(e.target.value)}
              />
            </div>
          </div>
          <div className='col-2'>
            <button className=' btn btn-primary ' onClick={handleAddProduct}>
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
          <h5 className='mb-3'>Uploaded Service</h5>

          {uploadedProducts.length > 0 ? (
            uploadedProducts.map((service) => (
              <div key={service.id} className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id={`uploaded-${service.id}`}
                  checked={selectedProducts.includes(service)}
                  onChange={() => toggleSelectProduct(service, 'left')}
                />
                <label
                  className='form-check-label'
                  htmlFor={`uploaded-${service.id}`}
                >
                  {service.serviceName}
                </label>
              </div>
            ))
          ) : (
            <p className='text-muted'>No products uploaded.</p>
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
          <h5 className='mb-3'>Selected Service</h5>
          {movedProducts.length > 0 ? (
            movedProducts.map((service) => (
              <div key={service.id} className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id={`moved-${service.id}`}
                  checked={selectedProducts.includes(service)}
                  onChange={() => toggleSelectProduct(service, 'right')}
                />
                <label
                  className='form-check-label'
                  htmlFor={`moved-${service.id}`}
                >
                  {service.serviceName}
                </label>
              </div>
            ))
          ) : (
            <p className='text-muted'>No products selected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
