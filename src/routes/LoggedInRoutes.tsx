import React from 'react';
import routesNames from '../constants/routesNames';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';

function LoggedInRoutes() {
  return (
    <Routes>
      <Route path={routesNames.home} element={<Home />} />
      <Route path={'*'} element={<h1>Home</h1>} />
    </Routes>
  );
}

export default LoggedInRoutes;
