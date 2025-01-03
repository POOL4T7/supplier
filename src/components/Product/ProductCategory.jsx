import { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { useAtom } from 'jotai';
import {
  bussinessProfile,
  productCategory,
  userDetailsAtom,
} from '../../storges/user';

const ProductCategory = () => {
  const [uploadedCategories, setUploadedCategories] = useState([]);
  const [filteredUploadedCategories, setFilteredUploadedCategories] = useState(
    []
  );
  const [movedCategories, setMovedCategories] = useState([]);
  const [filteredMovedCategories, setFilteredMovedCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLeftSelected, setIsLeftSelected] = useState(false);
  const [isRightSelected, setIsRightSelected] = useState(false);
  const [categoriesValue, setCategoriesValue] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedSearch, setUploadedSearch] = useState('');
  const [movedSearch, setMovedSearch] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [supplier] = useAtom(userDetailsAtom);
  const [bussiness] = useAtom(bussinessProfile);
  const [categoryList] = useAtom(productCategory);
  const [allDesc, setAllDesc] = useState([]);

  useEffect(() => {
    setFilteredUploadedCategories(uploadedCategories);
  }, [uploadedCategories]);

  useEffect(() => {
    setFilteredMovedCategories(movedCategories);
  }, [movedCategories]);

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

  const moveToRight = async () => {
    await axiosInstance.post(
      '/proxy/productsearchsupplier/supplierCategoryDetailsStatus',
      {
        supplierBusinessId: bussiness.id,
        categoryIds: [...movedCategories, ...selectedCategories].map(
          (item) => item.id
        ),
        status: true,
        supplierBusinessDescription: description,
      }
    );
    setMovedCategories((prev) => [...prev, ...selectedCategories]);
    setUploadedCategories((prev) =>
      prev.filter((p) => !selectedCategories.includes(p))
    );
    setSelectedCategories([]);
    setIsRightSelected(false);
    if (!allDesc.includes(description)) {
      setAllDesc([...allDesc, description]);
    }
    setDescription('');
  };

  const moveToLeft = async () => {
    await axiosInstance.post(
      '/proxy/productsearchsupplier/supplierCategoryDetailsStatus',
      {
        supplierBusinessId: bussiness.id,
        categoryIds: [...uploadedCategories, ...selectedCategories].map(
          (item) => item.id
        ),
        status: false,
      }
    );
    setUploadedCategories((prev) => [...prev, ...selectedCategories]);
    setMovedCategories((prev) =>
      prev.filter((p) => !selectedCategories.includes(p))
    );
    setSelectedCategories([]);
    setIsLeftSelected(false);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const res = await axiosInstance.post(
      '/proxy/productsearchsupplier/saveSupplierCategoryDetails',
      {
        categoryName: categoriesValue,
        productsServices: 'products',
        supplierBusinessId: bussiness.id,
        categoryDescription: description,
      }
    );
    const p = {
      categoryName: res.data.supplierCategoryName,
      id: res.data.id,
    };

    setUploadedCategories([p, ...uploadedCategories]);
    setCategoriesValue('');
    setDescription('');
  };

  const handleSearch = (query, type) => {
    if (type === 'uploaded') {
      setUploadedSearch(query);
      setFilteredUploadedCategories(
        uploadedCategories.filter((category) =>
          category.categoryName.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      console.log(query, type, movedCategories);
      setMovedSearch(query);
      setFilteredMovedCategories(
        movedCategories.filter((category) =>
          category.categoryName?.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          '/proxy/productsearchsupplier/getSupplierCategoryDetails?type=products'
        );
        // console.log(res);

        setMovedCategories(
          res.data
            .filter((item) => item.active)
            .map((item) => ({
              id: item.categoryId,
              categoryName: item.supplierCategoryName,
            }))
        );
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [bussiness.id, description]);

  useEffect(() => {
    if (bussiness) {
      setDescription(bussiness.businessDescription);
    }
    if (categoryList?.length) {
      setUploadedCategories(categoryList);
    }
  }, []);

  return (
    <div className='container'>
      <>
        <div className='row mb-2'>
          <div className='col-10'>
            <input
              type='text'
              value={categoriesValue}
              className='form-control'
              placeholder='Enter category name'
              onChange={(e) => setCategoriesValue(e.target.value)}
            />
            <input
              type='text'
              value={description}
              className='form-control mt-2'
              placeholder='Enter bussiness description'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='col-2'>
            <button
              className='btn btn-primary'
              onClick={handleAddProduct}
              disabled={!categoriesValue}
            >
              Add
            </button>
          </div>
        </div>
        <div className='mb-4 d-flex flex-wrap gap-2'>
          {allDesc.map((item, index) => (
            <span
              key={index}
              className='badge rounded-pill bg-primary px-3 py-2 text-white'
              style={{ cursor: 'pointer' }}
            >
              {item}
            </span>
          ))}
        </div>
      </>
      <div className='row'>
        <div className='col-md-5'>
          <input
            type='text'
            value={uploadedSearch}
            className='form-control mb-3'
            placeholder='Search uploaded categories'
            onChange={(e) => handleSearch(e.target.value, 'uploaded')}
          />
          <div
            className='border p-3'
            style={{ height: '60vh', overflowY: 'scroll' }}
          >
            <h5>Uploaded Categories</h5>
            {filteredUploadedCategories.map((product) => (
              <div key={product.id} className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  checked={selectedCategories.includes(product)}
                  onChange={() => toggleSelectProduct(product, 'left')}
                />
                <label className='form-check-label'>
                  {product.categoryName}
                </label>
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
            value={movedSearch}
            className='form-control mb-3'
            placeholder='Search moved categories'
            onChange={(e) => handleSearch(e.target.value, 'moved')}
          />
          <div
            className='border p-3'
            style={{ height: '60vh', overflowY: 'scroll' }}
          >
            <h5>Moved Categories</h5>
            {filteredMovedCategories.map((product) => (
              <div key={product.id} className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  checked={selectedCategories.includes(product)}
                  onChange={() => toggleSelectProduct(product, 'right')}
                />
                <label className='form-check-label'>
                  {product.categoryName}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
