import { useState } from 'react';

const ServiceTransfer = () => {
  const [uploadedProducts, setUploadedProducts] = useState([]); // Products from the uploaded file
  const [selectedProducts, setSelectedProducts] = useState([]); // Selected products in the left box
  const [movedProducts, setMovedProducts] = useState([]); // Products moved to the right box

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Mock data, replace this with actual file parsing logic
      const products = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
        { id: 3, name: 'Product 3' },
      ];
      setUploadedProducts(products);
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
      {/* Row for Product Selection */}
      <div
        className='row align-items-center justify-content-between'
        style={{ maxHeight: '80vh', height: '100%' }}
      >
        {/* Left Container */}
        <div className='col-md-5 border p-3'>
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

        {/* Move Buttons */}
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

        {/* Right Container */}
        <div className='col-md-5 border p-3'>
          <h5 className='mb-3'>Selected Products</h5>
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

      {/* File Upload Section */}
      <div>
        <h3 className='mb-3'>Upload File</h3>
        <input
          type='file'
          className='form-control'
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
};

export default ServiceTransfer;
