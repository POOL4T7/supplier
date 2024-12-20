// import axiosInstance from '../../axios';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { useAtom } from 'jotai';
import { bussinessProfile } from '../../storges/user';
// import { userDetailsAtom } from '../../storges/user';
// import { useAtom } from 'jotai';
// import { toast } from 'react-toastify';

const ProductSubCategory = () => {
  const [uploadedSubCategories, setUploadedSubCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [movedSubCategories, setMovedCategories] = useState([]);
  const [isLeftSelected, setIsLeftSelected] = useState(false);
  const [isRightSelected, setIsRightSelected] = useState(false);
  // const [supplier] = useAtom(userDetailsAtom);
  const [subCategoriesValue, setSubCategoriesValue] = useState('');
  const [description, setDescription] = useState('');

  const [category, setCategory] = useState('');

  const [bussiness] = useAtom(bussinessProfile);

  const [categoryList, setCategoryList] = useState([]);

  const toggleSelectProduct = (product, type) => {
    if (type === 'left') {
      setIsLeftSelected(false);
      setIsRightSelected(true);
    } else {
      setIsLeftSelected(true);
      setIsRightSelected(false);
    }
    setSelectedSubCategories((prevSelected) => {
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

  const moveToRight = async () => {
    
    await axiosInstance.post(
      '/proxy/productsearchsupplier/supplierSubCategoryDetailsStatus',
      {
        supplierBusinessId: bussiness.id,
        categoryIds: [...movedSubCategories, ...selectedSubCategories].map(
          (item) => item.id
        ),
        status: true,
      }
    );
    setMovedCategories((prev) => [...prev, ...selectedSubCategories]);
    setUploadedSubCategories((prev) =>
      prev.filter((p) => !selectedSubCategories.includes(p))
    );
    setSelectedSubCategories([]);
    setIsRightSelected(false);
  };

  const moveToLeft = async () => {
    await axiosInstance.post(
      '/proxy/productsearchsupplier/supplierSubCategoryDetailsStatus',
      {
        supplierBusinessId: bussiness.id,
        categoryIds: [...uploadedSubCategories, ...selectedSubCategories].map(
          (item) => item.id
        ),
        status: false,
      }
    );
    setUploadedSubCategories((prev) => [...prev, ...selectedSubCategories]);
    setMovedCategories((prev) =>
      prev.filter((p) => !selectedSubCategories.includes(p))
    );
    setSelectedSubCategories([]);
    setIsLeftSelected(false);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const res = await axiosInstance.post(
      '/proxy/productsearchsupplier/saveSupplierSubCategoryDetails',
      {
        subCategoryName: subCategoriesValue,
        subCategoryDecription: description,
        productsServices: 'products',
        categoryId: category.id,
        supplierBusinessId: bussiness.id,
      }
    );
    console.log(res);
    const p = {
      name: res.data.supplierSubCategoryName,
      id: res.data.id,
    };
    setUploadedSubCategories([...uploadedSubCategories, p]);
    setSubCategoriesValue('');
    setDescription('');
  };

  // const submit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const data = {
  //       supplierBusinessId: supplier.id,
  //       productId: movedSubCategories.map((item) => item.id),
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.post(
          '/proxy/productsearchsupplier/getCategoryAndSubCategoryDetails',
          {
            supplierBusinessId: bussiness.id,
            businessDescription: bussiness.businessDescription,
            productsServices: 'services',
          }
        );
        console.log(res);
        setCategoryList(
          res.data
            .filter((item) => item.active)
            .map((item) => {
              return {
                id: item.categoryId,
                name: item.categoryName,
              };
            })
        );
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='container'>
      <div className='mb-3'>
        <div className='row'>
          <div className='col-10'>
            <h3>Add Product Sub Category</h3>
          </div>
          {/* <div className='col-2'>
            {category && (
              <button
                className='btn btn-primary'
                // onClick={submit}
                disabled={!movedSubCategories.length}
              >
                Update
              </button>
            )}
          </div> */}
        </div>
        <div>
          <select
            className='form-select'
            id='categoryName'
            onChange={(e) => {
              setCategory(JSON.parse(e.target.value));
              console.log(category);
              // setUploadedSubCategories(JSON.parse(e.target.value));
            }}
          >
            <option value={''}>Select Category</option>

            {categoryList.map((item) => (
              <option key={item.id} value={JSON.stringify(item)}>
                {item.name}
              </option>
            ))}
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
                    value={subCategoriesValue}
                    className={`form-control`}
                    placeholder='enter sub category name'
                    onChange={(e) => setSubCategoriesValue(e.target.value)}
                  />
                </div>
                <div className='mb-2'>
                  <input
                    type='text'
                    value={description}
                    className={`form-control`}
                    placeholder='enter category description'
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className='col-2'>
                <button
                  className=' btn btn-primary '
                  onClick={handleAddProduct}
                  disabled={!subCategoriesValue}
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

              {uploadedSubCategories?.length > 0 ? (
                uploadedSubCategories.map((product) => (
                  <div key={product.id} className='form-check mb-2'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id={`uploaded-${product.id}`}
                      checked={selectedSubCategories.includes(product)}
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
              {movedSubCategories.length > 0 ? (
                movedSubCategories.map((product) => (
                  <div key={product.id} className='form-check mb-2'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id={`moved-${product.id}`}
                      checked={selectedSubCategories.includes(product)}
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
