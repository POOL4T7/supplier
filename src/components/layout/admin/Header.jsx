import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userDetailsAtom } from '../../../storges/user';
import { User } from 'lucide-react';
// import SidebarToggle from '../../hooks/useSidebar';

const Header = () => {
  const [userDetails] = useAtom(userDetailsAtom);
  // SidebarToggle();
  return (
    <>
      {/* <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          Search
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
          <ul className='navbar-nav me-auto'></ul>
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
                    >
                      {userDetails.supplierFullName}
                    </a>
                    <div className='dropdown-menu dropdown-menu-end'>
                      <Link className='dropdown-item' to='/profile'>
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
      </div> */}
      <nav className='sb-topnav navbar navbar-expand navbar-dark bg-dark'>
        <Link className='navbar-brand ps-3' to='/'>
          Supplier
        </Link>

        {/* <button
          className='btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0'
          id='sidebarToggle'
        >
          <Menu />
        </button> */}

        <div className='d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0'>
          {/* <div className='input-group'>
            <input
              className='form-control'
              type='text'
              placeholder='Search for...'
              aria-label='Search for...'
              aria-describedby='btnNavbarSearch'
            />
            <button
              className='btn btn-primary'
              id='btnNavbarSearch'
              type='button'
            >
            </button>
          </div> */}
        </div>

        <ul className='navbar-nav ms-auto ms-md-0 me-3 me-lg-4'>
          {userDetails ? (
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                id='navbarDropdown'
                href='#'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                <User />
              </a>
              <ul
                className='dropdown-menu dropdown-menu-end'
                aria-labelledby='navbarDropdown'
              >
                <li>
                  <Link className='dropdown-item' to='/admin'>
                    Profile
                  </Link>
                </li>

                <li>
                  <hr className='dropdown-divider' />
                </li>
                <li>
                  <button
                    className='dropdown-item'
                    onClick={() => {
                      localStorage.removeItem('user');
                      window.location.href = '/';
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          ) : (
            <Link to={'/signin'} className='nav-link text-primary mr-2'>
              login
            </Link>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
