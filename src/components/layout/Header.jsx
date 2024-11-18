import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userDetailsAtom } from '../../storges/user';
const Header = () => {
  const [userDetails] = useAtom(userDetailsAtom);
  return (
    <nav className='navbar navbar-expand-lg bg-dark' data-bs-theme='dark'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          Supplier
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarColor02'
          aria-controls='navbarColor02'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarColor02'>
          <ul className='navbar-nav me-auto'>
            {/* <li className="nav-item">
              <a className="nav-link active" href="#">
                Home
                <span className="visually-hidden">(current)</span>
              </a>
            </li> */}
          </ul>
          <div className='d-flex'>
            {userDetails?.id ? (
              <>
                <Link to={'/supplier'} className='nav-link text-white'>
                  Dashboard
                </Link>
              </>
            ) : (
              <Link to={'/signin'} className='nav-link text-white'>
                login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
