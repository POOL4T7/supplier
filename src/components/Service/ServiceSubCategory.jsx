import { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { useAtom } from "jotai";
import { bussinessProfile } from "../../storges/user";

const ServiceSubCategory = () => {
  const [uploadedSubCategories, setUploadedSubCategories] = useState([]);
  const [movedSubCategories, setMovedSubCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [isLeftSelected, setIsLeftSelected] = useState(false);
  const [isRightSelected, setIsRightSelected] = useState(false);

  const [subCategoriesValue, setSubCategoriesValue] = useState("");
  const [category, setCategory] = useState(null);
  const [bussiness] = useAtom(bussinessProfile);

  const [allCategoryList, setAllCategoryList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [searchUploaded, setSearchUploaded] = useState("");
  const [searchMoved, setSearchMoved] = useState("");
  const [descriptionList, setDescriptionList] = useState([]);
  const [d, setD] = useState("");
  const [filteredUploadedCategories, setFilteredUploadedCategories] = useState(
    []
  );

  const [filteredMovedCategories, setFilteredMovedCategories] = useState([]);

  useEffect(() => {
    setFilteredUploadedCategories(uploadedSubCategories);
  }, [uploadedSubCategories]);

  useEffect(() => {
    setFilteredMovedCategories(movedSubCategories);
  }, [movedSubCategories]);

  const toggleSelectProduct = (product, type) => {
    if (type === "left") {
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
      "/proxy/productsearchsupplier/supplierSubCategoryDetailsStatus",
      {
        supplierBusinessId: bussiness.id,
        subCategoryIds: [...movedSubCategories, ...selectedSubCategories].map(
          (item) => item.id
        ),
        status: true,
        categoryId: category.id,
        supplierBusinessDescription: d,
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
      "/proxy/productsearchsupplier/supplierSubCategoryDetailsStatus",
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
      "/proxy/productsearchsupplier/saveSupplierSubCategoryDetails",
      {
        subCategoryName: subCategoriesValue,
        productsServices: "services",
        categoryId: category.id,
        supplierBusinessId: bussiness.id,
        supplierBusinessDescription: d,
      }
    );

    const newCategory = {
      subCategoryName: res.data.supplierSubCategoryName,
      id: res.data.id,
    };
    setUploadedSubCategories([...uploadedSubCategories, newCategory]);
    setSubCategoriesValue("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          `/proxy/productsearchsupplier/getSupplierCategoryDetails?type=services&supplierBusinessId=${bussiness.id}`
        );

        setAllCategoryList(
          res.data
            // .filter((item) => item.active)
            .map((item) => ({
              id: item.categoryId,
              categoryName: item.supplierCategoryName,
              supplierCategoryDescription: item.supplierCategoryDescription,
              supplierBusinessDescription: item.supplierBusinessDescription,
            }))
        );
        // Assuming res.data is an array of objects
        const uniqueDescriptions = Array.from(
          new Set(res.data.map((item) => item.supplierBusinessDescription))
        );

        // return uniqueDescriptions;

        setDescriptionList(uniqueDescriptions);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const changeCategory = async (e) => {
    const cate = JSON.parse(e.target.value);
    setCategory(cate);
    if(!cate){
      return;
    }

    const res = await axiosInstance.get(
      `/proxy/productsearchsupplier/getSubCategoryDetails?categoryId=${cate.id}&type=services`
    );
    const res2 = await axiosInstance.get(
      `/proxy/productsearchsupplier/getSupplierSubCategoryDetails?supplierCategoryId=${cate.id}&type=services`
    );
    setMovedSubCategories(
      res2.data.map((item) => ({
        id: item.id,
        subCategoryName: item.supplierSubCategoryName,
        supplierBusinessDescription: item.supplierBusinessDescription,
        subCategoryDescription: item.supplierCategoryDescription,
      }))
    );

    setUploadedSubCategories(res.data);
  };

  const bussinessDescription = async (e) => {
    const cateList = allCategoryList.filter(
      (item) => item.supplierBusinessDescription === e.target.value
    );
    // console.log(allCategoryList,cateList, e.target.value);
    setCategoryList(cateList);
    setD(e.target.value);
    setCategory(null);
  };

  return (
    <div className="container">
      <div className="mb-3">
        <div className="row">
          <div className="col-10">
            <h3>Add Service Sub Category</h3>
          </div>
        </div>
        <div className="mb-2">
          <select
            className="form-select"
            id="categoryName"
            onChange={bussinessDescription}
          >
            <option value="">Select bussiness description</option>
            {descriptionList.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="form-select"
            id="categoryName"
            onChange={changeCategory}
          >
            <option value="null">Select Category</option>
            {categoryList.map((item) => (
              <option key={item.id} value={JSON.stringify(item)}>
                {item.categoryName}
              </option>
            ))}
          </select>
        </div>
      </div>
      {category && (
        <>
          <form>
            <div className="row">
              <div className="col-10">
                <div className="mb-2">
                  <input
                    type="text"
                    value={subCategoriesValue}
                    className="form-control"
                    placeholder="Enter sub category name"
                    onChange={(e) => setSubCategoriesValue(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-2">
                <button
                  className="btn btn-primary"
                  onClick={handleAddProduct}
                  disabled={!subCategoriesValue}
                >
                  Add
                </button>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col-md-5">
              <input
                type="text"
                value={searchUploaded}
                className="form-control mb-3"
                placeholder="Search uploaded sub categories"
                onChange={(e) => setSearchUploaded(e.target.value, "uploaded")}
              />
              <div
                className="border p-3"
                style={{ height: "60vh", overflowY: "scroll" }}
              >
                <h5>Uploaded Categories</h5>
                {filteredUploadedCategories?.map((product) => (
                  <div key={product.id} className="form-check mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedSubCategories.includes(product)}
                      onChange={() => toggleSelectProduct(product, "left")}
                    />
                    <label className="form-check-label">
                      {product.subCategoryName}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-2 d-flex flex-column justify-content-center align-items-center">
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

            <div className="col-md-5">
              <input
                type="text"
                value={searchMoved}
                className="form-control mb-3"
                placeholder="Search moved sub categories"
                onChange={(e) => setSearchMoved(e.target.value, "moved")}
              />
              <div
                className="border p-3"
                style={{ height: "60vh", overflowY: "scroll" }}
              >
                <h5>Moved Categories</h5>

                {filteredMovedCategories.map((product) => (
                  <div key={product.id} className="form-check mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedSubCategories.includes(product)}
                      onChange={() => toggleSelectProduct(product, "right")}
                    />
                    <label className="form-check-label">
                      {product.subCategoryName}
                    </label>
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

export default ServiceSubCategory;
