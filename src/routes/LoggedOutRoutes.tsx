import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import routesNames from '../constants/routesNames';
import Auth from '../pages/Auth';

function LoggedOutRoutes() {
  return (
    <Routes>
      <Route path={routesNames.auth} element={<Auth />} />
    </Routes>
  );
}

export default LoggedOutRoutes;
