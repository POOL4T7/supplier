import PropTypes from 'prop-types';

const FormContainer = ({ children }) => {
  return (
    <div className='container d-flex  vh-100'>
      <div className='row w-100 justify-content-center'>
        <div className='col col-xs-12 col-md-6 '>{children}</div>
      </div>
    </div>
  );
};

export default FormContainer;

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
