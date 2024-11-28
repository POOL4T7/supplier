import { useState } from 'react';
import { userDetailsAtom } from '../../storges/user';
import { useAtom } from 'jotai';
import axios from 'axios';
import { toast } from 'react-toastify';

const ServiceTransfer = () => {
  const [uploadedProducts, setUploadedProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [movedProducts, setMovedProducts] = useState([]);
  const [supplier] = useAtom(userDetailsAtom);

  const handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();

      if (file) {
        formData.append('file', file);
        formData.append('supplierId', supplier.id);
        formData.append('type', 'SERVICE');
        const res = await axios.post(
          '/proxy/productsearchsupplier/api/supplier/file/uploadSupplierBusinessDetails',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        toast.success(res.data.message);
        setUploadedProducts(res.data?.productDetailsList || []);
      }
    } catch (e) {
      console.log(e);
      toast.error('file uplaod error');
    }
  };

  const toggleSelectProduct = (product) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(product)
        ? prevSelected.filter((p) => p !== product)
        : [...prevSelected, product]
    );
  };

  const moveToRight = () => {
    setMovedProducts((prev) => [...prev, ...selectedProducts]);
    setUploadedProducts((prev) =>
      prev.filter((p) => !selectedProducts.includes(p))
    );
    setSelectedProducts([]);
  };

  const moveToLeft = () => {
    setUploadedProducts((prev) => [...prev, ...selectedProducts]);
    setMovedProducts((prev) =>
      prev.filter((p) => !selectedProducts.includes(p))
    );
    setSelectedProducts([]);
  };

  return (
    <div className='container'>
      <div className='mb-3'>
        <h3>Upload Service File</h3>
        <input
          type='file'
          className='form-control'
          onChange={handleFileUpload}
        />
      </div>

      <div
        className='row align-items-center justify-content-between'
        style={{ maxHeight: '80vh', height: '100%' }}
      >
        <div
          className='col-md-5 border p-3 '
          style={{ height: '60vh', overflow: 'scroll' }}
        >
          <h5 className='mb-3'>Uploaded Services</h5>
          {uploadedProducts.length > 0 ? (
            uploadedProducts.map((product) => (
              <div key={product.id} className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id={`uploaded-${product.id}`}
                  checked={selectedProducts.includes(product)}
                  onChange={() => toggleSelectProduct(product)}
                />
                <label
                  className='form-check-label'
                  htmlFor={`uploaded-${product.id}`}
                >
                  {product.name}
                </label>
              </div>
            ))
          ) : (
            <p className='text-muted'>No service uploaded.</p>
          )}
        </div>

        <div className='col-md-2 d-flex flex-column align-items-center'>
          <button
            className='btn btn-primary mb-2'
            onClick={moveToRight}
            disabled={selectedProducts.length === 0}
          >
            &gt;&gt;
          </button>
          <button
            className='btn btn-primary'
            onClick={moveToLeft}
            disabled={selectedProducts.length === 0}
          >
            &lt;&lt;
          </button>
        </div>

        <div
          className='col-md-5 border p-3'
          style={{ height: '60vh', overflow: 'scroll' }}
        >
          <h5 className='mb-3'>Selected Services</h5>
          {movedProducts.length > 0 ? (
            movedProducts.map((product) => (
              <div key={product.id} className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id={`moved-${product.id}`}
                  checked={selectedProducts.includes(product)}
                  onChange={() => toggleSelectProduct(product)}
                />
                <label
                  className='form-check-label'
                  htmlFor={`moved-${product.id}`}
                >
                  {product.name}
                </label>
              </div>
            ))
          ) : (
            <p className='text-muted'>No services selected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceTransfer;
