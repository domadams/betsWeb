/** ********************************************************************
 * Server Router
 *
 * This exports a function that returns an Express
 * middleware handle to render the application using React-Router
 ******************************************************************** */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { ServerStyleSheets } from '@material-ui/core/styles';
import AppRoot from '../shared/AppRoot';
import routes from '../shared/routes';
import htmlTemplate from './pageTemplates/html-template';

const router = require('express').Router();

export default function routers(nonce) {
  return router.get('*', (req, res, next) => {
    const activeRoute = routes.find((route) => matchPath(req.url, route)) || {};

    const promise = activeRoute.fetchInitialData
      ? activeRoute.fetchInitialData()
      : Promise.resolve();

    promise.then((data) => {
      const sheets = new ServerStyleSheets();
      const content = renderToString(
        sheets.collect(
          <StaticRouter location={req.url} context={data}>
            <AppRoot />
          </StaticRouter>,
        ),
      );

      // Grab the CSS from the sheets.
      const css = sheets.toString();

      res.send(htmlTemplate(activeRoute.title, content, data, req.url, nonce, css));
    }).catch(next);
  });
}
