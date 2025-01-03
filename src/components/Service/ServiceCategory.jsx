// import axiosInstance from '../../axios';
import { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { useAtom } from "jotai";
import {
  bussinessProfile,
  serviceCategory,
  userDetailsAtom,
} from "../../storges/user";
// import { userDetailsAtom } from '../../storges/user';
// import { useAtom } from 'jotai';
// import { toast } from 'react-toastify';

const ServiceCategory = () => {
  const [uploadedCategories, setUploadedCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [movedCategories, setMovedCategories] = useState([]);
  const [isLeftSelected, setIsLeftSelected] = useState(false);
  const [isRightSelected, setIsRightSelected] = useState(false);

  const [categoriesValue, setCategoriesValue] = useState("");
  const [description, setDescription] = useState("");
  const [allDesc, setAllDesc] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [supplier] = useAtom(userDetailsAtom);
  const [bussiness] = useAtom(bussinessProfile);
  const [categoryList] = useAtom(serviceCategory);

  const toggleSelectProduct = (service, type) => {
    if (type === "left") {
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

  const moveToRight = async () => {
    await axiosInstance.post(
      "/proxy/productsearchsupplier/supplierCategoryDetailsStatus",
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
      "/proxy/productsearchsupplier/supplierCategoryDetailsStatus",
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

    // const list = categoriesValue.split(',').map((item, idx) => {
    //   return {
    //     id: idx,
    //     name: item,
    //   };
    // });
    const res = await axiosInstance.post(
      "/proxy/productsearchsupplier/saveSupplierCategoryDetails",
      {
        categoryName: categoriesValue,
        productsServices: "services",
        supplierBusinessId: bussiness.id,
        categoryDescription: description,
      }
    );
    const p = {
      categoryName: res.data.supplierCategoryName,
      id: res.data.id,
    };

    setUploadedCategories([p, ...uploadedCategories]);
    setCategoriesValue("");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          "/proxy/productsearchsupplier/getSupplierCategoryDetails?type=services"
        );

        setMovedCategories(
          res.data
            .filter((item) => item.active)
            .map((item) => ({
              id: item.categoryId,
              categoryName: item.supplierCategoryName,
            }))
        );
        // setMovedCategories(
        //   res.data
        //     .filter((item) => item.active)
        //     .map((item) => {
        //       return {
        //         id: item.categoryId,
        //         name: item.categoryName,
        //       };
        //     })
        // );
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
    <div className="container">
      <div className="mb-3">
        <div className="row">
          <div className="col-10">
            <h3>Add Service Category</h3>
          </div>
          {/* <div className='col-2'>
            <button
              className='btn btn-primary'
              // onClick={submit}
              disabled={!movedCategories.length}
            >
              Update
            </button>
          </div> */}
        </div>
      </div>
      <form>
        <div className="row">
          <div className="col-10">
            <div className="mb-2">
              <input
                type="text"
                value={categoriesValue}
                className={`form-control`}
                placeholder="enter category name"
                onChange={(e) => setCategoriesValue(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                value={description}
                className={`form-control`}
                placeholder="enter category description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="col-2">
            <button
              className=" btn btn-primary "
              onClick={handleAddProduct}
              disabled={!categoriesValue}
            >
              Add
            </button>
          </div>
        </div>
      </form>
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
      <div
        className="row align-items-center justify-content-between"
        style={{ maxHeight: "80vh", height: "100%" }}
      >
        <div
          className="col-md-5 border p-3"
          style={{ height: "60vh", overflow: "scroll" }}
        >
          <h5 className="mb-3">Service Category</h5>

          {uploadedCategories.length > 0 ? (
            uploadedCategories.map((service) => (
              <div key={service.id} className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`uploaded-${service.id}`}
                  checked={selectedCategories.includes(service)}
                  onChange={() => toggleSelectProduct(service, "left")}
                />
                <label
                  className="form-check-label"
                  htmlFor={`uploaded-${service.id}`}
                >
                  {service.categoryName}
                </label>
              </div>
            ))
          ) : (
            <p className="text-muted">No service category added.</p>
          )}
        </div>

        <div className="col-md-2 d-flex flex-column align-items-center">
          <button
            className="btn btn-primary mb-2"
            onClick={moveToRight}
            disabled={!isRightSelected}
          >
            &gt;&gt;
          </button>
          <button
            className="btn btn-primary"
            onClick={moveToLeft}
            disabled={!isLeftSelected}
          >
            &lt;&lt;
          </button>
        </div>

        <div
          className="col-md-5 border pt-3"
          style={{ height: "60vh", overflow: "scroll" }}
        >
          <h5 className="mb-3">Selected Service Category</h5>
          {movedCategories.length > 0 ? (
            movedCategories.map((service) => (
              <div key={service.id} className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`moved-${service.id}`}
                  checked={selectedCategories.includes(service)}
                  onChange={() => toggleSelectProduct(service, "right")}
                />
                <label
                  className="form-check-label"
                  htmlFor={`moved-${service.id}`}
                >
                  {service.categoryName}
                </label>
              </div>
            ))
          ) : (
            <p className="text-muted">No service category selected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCategory;
