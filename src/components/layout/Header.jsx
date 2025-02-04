import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userDetailsAtom } from '../../storges/user';

const Header = () => {
  const [userDetails] = useAtom(userDetailsAtom);
  return (
    <nav className='navbar navbar-expand-lg bg-dark' data-bs-theme='dark'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          <img src='/images/logo.webp' alt='logo' width='45' height='45' />
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
                <ul className='navbar-nav me-auto'>
                  <li className='nav-item dropdown'>
                    <a
                      className='nav-link dropdown-toggle'
                      data-bs-toggle='dropdown'
                      href='#'
                      role='button'
                      aria-haspopup='true'
                      aria-expanded='false'
                      style={{ color: 'white' }}
                    >
                      {userDetails.supplierName}
                    </a>
                    <div className='dropdown-menu dropdown-menu-end'>
                      <Link
                        className='dropdown-item'
                        to={`${JSON.parse(
                          localStorage.getItem('user')
                        )?.userType?.toLowerCase()}/profile`}
                      >
                        Dashboard
                      </Link>

                      <div className='dropdown-divider'></div>
                      <button
                        className='dropdown-item'
                        onClick={() => {
                          localStorage.removeItem('user');
                          window.location.href = '/';
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </li>
                </ul>
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
