import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from './store/store';
import LoggedInRoutes from './routes/LoggedInRoutes';
import LoggedOutRoutes from './routes/LoggedOutRoutes';
import { checkUserSesion } from './store/slices/authSilce';
import PageLoader from './pages/PageLoader';

function App() {
  const dispatch = useDispatch();
  const isUserAuth = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isPageLoading = useSelector(
    (state: RootState) => state.auth.isPageLoading
  );

  useEffect(() => {
    dispatch(checkUserSesion());

    // logoutFirebase()
  }, []);

  if (isPageLoading) return <PageLoader />;
  return <div>{isUserAuth ? <LoggedInRoutes /> : <LoggedOutRoutes />}</div>;
}

export default App;
