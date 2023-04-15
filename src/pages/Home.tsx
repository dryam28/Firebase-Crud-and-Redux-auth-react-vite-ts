import React, { useEffect, useState } from 'react';
import MainLayout from '../components/MainLayout/MainLayout';
import { auth } from '../firebase/config';
import {
  addDevice,
  createGateway,
  deleteGateways,
  getUserData,
} from '../firebase/services';
import { useDispatch } from 'react-redux';
import { setUserData } from '../store/slices/authSilce';
import DataTable from '../components/Home/DataTable/DataTable';
import EditGatewayModal from '../components/Home/DataTable/EditGatewayModal';

const Home = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    createGateway('1234', 'testGateway', '192.168.225.255');
  };
  const handleClick2 = () => {
    addDevice('1234', '1', 'poccholo', new Date(), 'online');
  };

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
