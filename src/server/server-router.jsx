/** ********************************************************************
 * Server Router
 *
 * This exports a function that returns an Express
 * middleware handle to render the application using React-Router
 ******************************************************************** */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import AppRoot from '../shared/AppRoot';
import routes from '../shared/routes';
import htmlTemplate from './html-template';

const router = require('express').Router();

router.get('*', (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {};

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve();

  promise.then((data) => {
    const content = renderToString(
      <StaticRouter location={req.url} context={data}>
        <AppRoot />
      </StaticRouter>,
    );

    res.send(htmlTemplate(activeRoute.title, content, data));
  }).catch(next);
});

export default router;
