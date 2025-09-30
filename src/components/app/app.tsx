import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate
} from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { Modal, OrderInfo, IngredientDetails, AppHeader } from '@components';
import { Preloader } from '@ui';
import { useAppSelector } from '../../services/store';
import '../../index.css';
import styles from './app.module.css';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  element: JSX.Element;
};

const ProtectedRoute = ({
  onlyUnAuth = false,
  element
}: TProtectedRouteProps) => {
  const location = useLocation();
  const { isAuth, isAuthChecked } = useAppSelector((state) => state.user);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuth) {
    const from = (location.state as { from?: Location })?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return element;
};

const FeedWithOrderModal = () => {
  const navigate = useNavigate();
  const onClose = () => navigate(-1);

  return (
    <Modal title='Детали заказа' onClose={onClose}>
      <OrderInfo />
    </Modal>
  );
};

const IngredientModal = () => {
  const navigate = useNavigate();
  const onClose = () => navigate(-1);

  return (
    <Modal title='Детали ингредиента' onClose={onClose}>
      <IngredientDetails />
    </Modal>
  );
};

const ProfileOrderModal = () => {
  const navigate = useNavigate();
  const onClose = () => navigate(-1);

  return (
    <Modal title='Детали заказа' onClose={onClose}>
      <OrderInfo />
    </Modal>
  );
};

const App = () => {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={<ProtectedRoute onlyUnAuth element={<Login />} />}
        />
        <Route
          path='/register'
          element={<ProtectedRoute onlyUnAuth element={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<ProtectedRoute onlyUnAuth element={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute onlyUnAuth element={<ResetPassword />} />}
        />

        <Route
          path='/profile'
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute element={<ProfileOrders />} />}
        />

        <Route path='/ingredients/:id' element={<IngredientModal />} />
        <Route path='/feed/:number' element={<FeedWithOrderModal />} />
        <Route
          path='/profile/orders/:number'
          element={<ProtectedRoute element={<ProfileOrderModal />} />}
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route path='/ingredients/:id' element={<IngredientModal />} />
          <Route path='/feed/:number' element={<FeedWithOrderModal />} />
          <Route
            path='/profile/orders/:number'
            element={<ProtectedRoute element={<ProfileOrderModal />} />}
          />
        </Routes>
      )}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />
  }
]);

const AppWrapper = () => <RouterProvider router={router} />;

export default AppWrapper;
