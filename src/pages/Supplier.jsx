import { useState } from "react";

import SupplierDetails from "../components/SupplierForm/SupplierDetails";
import BussinessProfile from "../components/SupplierForm/BussinessProfile";
import ProductDetails from "../components/SupplierForm/ProductDetails";

// Main SupplierForm Component
const SupplierForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const saveData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrevious = () => setCurrentStep((prev) => prev - 1);
  const handleSubmit = () => {
    console.log("Final form data:", formData);
    alert("Form submitted!");
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "850px" }}>
      <div className="row">
        <div className="col-md-4">
          <div className="list-group">
            {[
              "Supplier Profile",
              "Bussiness Profile",
              "Product Details",
              "Service Details",
            ].map((name, step) => (
              <button
                key={step}
                type="button"
                className={`list-group-item list-group-item-action ${
                  currentStep === step ? "active" : ""
                }`}
                onClick={() => setCurrentStep(step)}
                disabled={currentStep <= step}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="col-md-8">
          {currentStep === 0 && (
            <SupplierDetails onNext={handleNext} saveData={saveData} />
          )}
          {currentStep === 1 && (
            <BussinessProfile
              onNext={handleNext}
              onPrevious={handlePrevious}
              saveData={saveData}
            />
          )}
          {currentStep === 2 && (
            <ProductDetails
              onSubmit={handleSubmit}
              onPrevious={handlePrevious}
              saveData={saveData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierForm;
