import React, { Component, useEffect, useState } from 'react';
import './Styles/App.scss';
import Nav from './Nav';
import MainRouter from './MainRouter';
import axios from 'axios';

// Routes
const App = () => {
  return (
    <div>
      <Nav />
      <MainRouter />
    </div>
  )
};

export default App;
