import { useEffect } from 'react';
import MainLayout from '../components/MainLayout/MainLayout';
import { auth } from '../firebase/config';
import { getUserData } from '../firebase/services';
import { useDispatch } from 'react-redux';
import { setUserData } from '../store/slices/authSilce';
import DataTable from '../components/Home/DataTable/DataTable';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const func = async () => {
      const res = await getUserData(
        auth.currentUser?.uid ? auth.currentUser?.uid : ''
      );
      dispatch(setUserData({ userData: res }));
    };

    func();
  }, []);

  return (
    <MainLayout>
      <DataTable />
    </MainLayout>
  );
};

export default Home;
