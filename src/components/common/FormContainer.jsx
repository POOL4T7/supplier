import PropTypes from "prop-types";

const FormContainer = ({ children }) => {
  return (
    <div className="container p-5">
      <div className="row justify-content-md-center">
        <div className="col col-xs-12 col-md-6">{children}</div>
      </div>
    </div>
  );
};

export default FormContainer;

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
