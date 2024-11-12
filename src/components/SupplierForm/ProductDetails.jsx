import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import * as yup from "yup";

const step3Schema = yup.object().shape({
  zip: yup
    .string()
    .required("ZIP Code is required")
    .matches(/^\d{5}$/, "ZIP Code must be 5 digits"),
});

const ProductDetails = ({ onSubmit, onPrevious, saveData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step3Schema),
    mode: "onTouched",
  });

  const handleFinalSubmit = (data) => {
    saveData(data); // Save final step data
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(handleFinalSubmit)}>
      <h2>Step 3</h2>
      <div className="mb-2">
        <label>ZIP Code</label>
        <input
          type="text"
          {...register("zip")}
          className={`form-control ${errors.zip ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors.zip?.message}</div>
      </div>
      <button
        type="button"
        className="btn btn-secondary me-2"
        onClick={onPrevious}
      >
        Previous
      </button>
      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  );
};

ProductDetails.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
};

export default ProductDetails;
