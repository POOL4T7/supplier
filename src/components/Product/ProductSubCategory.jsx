// import axiosInstance from '../../axios';
import { useState } from 'react';
// import { userDetailsAtom } from '../../storges/user';
// import { useAtom } from 'jotai';
// import { toast } from 'react-toastify';

const ProductSubCategory = () => {
  const [uploadedCategories, setUploadedCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [movedCategories, setMovedCategories] = useState([]);
  const [isLeftSelected, setIsLeftSelected] = useState(false);
  const [isRightSelected, setIsRightSelected] = useState(false);
  // const [supplier] = useAtom(userDetailsAtom);
  const [categoriesValue, setCategoriesValue] = useState('');

  const [category, setCategory] = useState('');

  const toggleSelectProduct = (product, type) => {
    if (type === 'left') {
      setIsLeftSelected(false);
      setIsRightSelected(true);
    } else {
      setIsLeftSelected(true);
      setIsRightSelected(false);
    }
    setSelectedCategories((prevSelected) => {
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
    //   toast.error('Please upload product in correct format');
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
            <h3>Add Product Sub Category</h3>
          </div>
          <div className='col-2'>
            {category && (
              <button
                className='btn btn-primary'
                // onClick={submit}
                disabled={!movedCategories.length}
              >
                Update
              </button>
            )}
          </div>
        </div>
        <div>
          <select
            className='form-select'
            id='categoryName'
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={''}>Select Category</option>
            <option value={'option1s'}>Option 1</option>
          </select>
        </div>
      </div>
      {category && (
        <>
          <form>
            <div className='row'>
              <div className='col-10'>
                <div className='mb-2'>
                  <input
                    type='text'
                    value={categoriesValue}
                    className={`form-control`}
                    placeholder='enter sub category name'
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
              <h5 className='mb-3'>Product sub category</h5>

              {uploadedCategories.length > 0 ? (
                uploadedCategories.map((product) => (
                  <div key={product.id} className='form-check mb-2'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id={`uploaded-${product.id}`}
                      checked={selectedCategories.includes(product)}
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
                <p className='text-muted'>No product sub category added.</p>
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
              <h5 className='mb-3'>Selected Product sub category</h5>
              {movedCategories.length > 0 ? (
                movedCategories.map((product) => (
                  <div key={product.id} className='form-check mb-2'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id={`moved-${product.id}`}
                      checked={selectedCategories.includes(product)}
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
                <p className='text-muted'>No product sub category selected.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductSubCategory;
