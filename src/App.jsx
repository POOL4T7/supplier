import { RouterProvider } from 'react-router-dom';
import router from './router';

const authState = {
  isAuth: false,
  token: '',
  user: {},
};

function App() {
  return (
    <>
      <RouterProvider router={router(authState)} />
    </>
  );
}

export default App;
