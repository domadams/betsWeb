import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRoot from '../shared/AppRoot';

hydrate(
  <BrowserRouter>
    <AppRoot />
  </BrowserRouter>,
  document.getElementById('content'),
);
