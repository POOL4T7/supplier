import axios from 'axios';
import { useState } from 'react';
import { userDetailsAtom } from '../../storges/user';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

const ProductTransfer = () => {
  const [uploadedProducts, setUploadedProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [movedProducts, setMovedProducts] = useState([]);
  const [isLeftSelected, setIsLeftSelected] = useState(false);
  const [isRightSelected, setIsRightSelected] = useState(false);
  const [supplier] = useAtom(userDetailsAtom);

  const handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();

      if (file) {
        formData.append('file', file);
        formData.append('supplierId', supplier.id);
        formData.append('type', 'PRODUCT');
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

  const toggleSelectProduct = (product, type) => {
    if (type === 'left') {
      setIsLeftSelected(false);
      setIsRightSelected(true);
    } else {
      setIsLeftSelected(true);
      setIsRightSelected(false);
    }
    setSelectedProducts((prevSelected) => {
      const newTemp = prevSelected.includes(product)
        ? prevSelected.filter((p) => p !== product)
        : [...prevSelected, product];
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

  return (
    <div className='container'>
      <div className='mb-3'>
        <h3>Upload Product File</h3>
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
          className='col-md-5 border p-3'
          style={{ height: '60vh', overflow: 'scroll' }}
        >
          <h5 className='mb-3'>Uploaded Product</h5>
          {uploadedProducts.length > 0 ? (
            uploadedProducts.map((product) => (
              <div key={product.id} className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id={`uploaded-${product.id}`}
                  checked={selectedProducts.includes(product)}
                  onChange={() => toggleSelectProduct(product, 'left')}
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
          <h5 className='mb-3'>Selected Product</h5>
          {movedProducts.length > 0 ? (
            movedProducts.map((product) => (
              <div key={product.id} className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id={`moved-${product.id}`}
                  checked={selectedProducts.includes(product)}
                  onChange={() => toggleSelectProduct(product, 'right')}
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
            <p className='text-muted'>No products selected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductTransfer;
