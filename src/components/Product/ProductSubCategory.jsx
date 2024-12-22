import { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { useAtom } from 'jotai';
import { bussinessProfile } from '../../storges/user';

const ProductSubCategory = () => {
  const [uploadedSubCategories, setUploadedSubCategories] = useState([]);
  const [movedSubCategories, setMovedSubCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [isLeftSelected, setIsLeftSelected] = useState(false);
  const [isRightSelected, setIsRightSelected] = useState(false);

  const [subCategoriesValue, setSubCategoriesValue] = useState('');
  const [category, setCategory] = useState('');
  const [bussiness] = useAtom(bussinessProfile);
  const [categoryList, setCategoryList] = useState([]);

  // Search states
  const [searchUploaded, setSearchUploaded] = useState('');
  const [searchMoved, setSearchMoved] = useState('');

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
      if (newTemp.length === 0) {
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
        subCategoryIds: [...movedSubCategories, ...selectedSubCategories].map(
          (item) => item.id
        ),
        status: true,
        categoryId: category.id,
      }
    );

    setMovedSubCategories((prev) => [...prev, ...selectedSubCategories]);
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
        subCategoryIds: [
          ...uploadedSubCategories,
          ...selectedSubCategories,
        ].map((item) => item.id),
        status: false,
        categoryId: category.id,
      }
    );

    setUploadedSubCategories((prev) => [...prev, ...selectedSubCategories]);
    setMovedSubCategories((prev) =>
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
        productsServices: 'products',
        categoryId: category.id,
        supplierBusinessId: bussiness.id,
      }
    );

    const newCategory = {
      name: res.data.supplierSubCategoryName,
      id: res.data.id,
    };
    setUploadedSubCategories([...uploadedSubCategories, newCategory]);
    setSubCategoriesValue('');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.post(
          '/proxy/productsearchsupplier/getCategoryAndSubCategoryDetails',
          {
            supplierBusinessId: bussiness.id,
            businessDescription: bussiness.businessDescription,
            productsServices: 'products',
          }
        );

        setCategoryList(
          res.data
            .filter((item) => item.active)
            .map((item) => ({
              id: item.categoryId,
              name: item.categoryName,
              subCategories: item.subCategories,
            }))
        );
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  // Filtered lists for search
  const filteredUploadedSubCategories = uploadedSubCategories.filter((item) =>
    item.name.toLowerCase().includes(searchUploaded.toLowerCase())
  );
  const filteredMovedSubCategories = movedSubCategories.filter((item) =>
    item.name.toLowerCase().includes(searchMoved.toLowerCase())
  );

  return (
    <div className='container'>
      <div className='mb-3'>
        <div className='row'>
          <div className='col-10'>
            <h3>Add Product Sub Category</h3>
          </div>
        </div>
        <div>
          <select
            className='form-select'
            id='categoryName'
            onChange={(e) => {
              setCategory(JSON.parse(e.target.value));
              console.log(JSON.parse(e.target.value));
              const cat = categoryList.find(
                (item) => item.id === JSON.parse(e.target.value).id
              );
              console.log(cat);
              setUploadedSubCategories(
                cat.subCategories
                  .filter((item) => !item.active)
                  .map((item) => {
                    return {
                      id: item.subCategoryId,
                      name: item.subCategoryName,
                    };
                  })
              );
              setMovedSubCategories(
                cat.subCategories
                  .filter((item) => item.active)
                  .map((item) => {
                    return {
                      id: item.subCategoryId,
                      name: item.subCategoryName,
                    };
                  })
              );
            }}
          >
            <option value=''>Select Category</option>
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
                    className='form-control'
                    placeholder='Enter sub category name'
                    onChange={(e) => setSubCategoriesValue(e.target.value)}
                  />
                </div>
              </div>
              <div className='col-2'>
                <button
                  className='btn btn-primary'
                  onClick={handleAddProduct}
                  disabled={!subCategoriesValue}
                >
                  Add
                </button>
              </div>
            </div>
          </form>
          <div className='row'>
            <div className='col-md-5'>
              <input
                type='text'
                value={searchUploaded}
                className='form-control mb-3'
                placeholder='Search uploaded sub categories'
                onChange={(e) => setSearchUploaded(e.target.value, 'uploaded')}
              />
              <div
                className='border p-3'
                style={{ height: '60vh', overflowY: 'scroll' }}
              >
                <h5>Uploaded Categories</h5>
                {filteredUploadedSubCategories?.map((product) => (
                  <div key={product.id} className='form-check mb-2'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={selectedSubCategories.includes(product)}
                      onChange={() => toggleSelectProduct(product, 'left')}
                    />
                    <label className='form-check-label'>{product.name}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className='col-md-2 d-flex flex-column justify-content-center align-items-center'>
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

            <div className='col-md-5'>
              <input
                type='text'
                value={searchMoved}
                className='form-control mb-3'
                placeholder='Search moved sub categories'
                onChange={(e) => setSearchMoved(e.target.value, 'moved')}
              />
              <div
                className='border p-3'
                style={{ height: '60vh', overflowY: 'scroll' }}
              >
                <h5>Moved Categories</h5>
                {filteredMovedSubCategories.map((product) => (
                  <div key={product.id} className='form-check mb-2'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={selectedSubCategories.includes(product)}
                      onChange={() => toggleSelectProduct(product, 'right')}
                    />
                    <label className='form-check-label'>{product.name}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductSubCategory;
