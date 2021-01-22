import { ServerStyleSheets } from '@material-ui/core/styles';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import React from 'react';
import AppRoot from '../shared/AppRoot';
import errorTemplate from './pageTemplates/error-template';

const handleError = (err, res, nonce) => {
  const sheets = new ServerStyleSheets();
  const content = renderToString(
    sheets.collect(
      <StaticRouter location="/error">
        <AppRoot />
      </StaticRouter>,
    ),
  );

  const css = sheets.toString();

  res.send(errorTemplate('Error', content, nonce, css));
};

export default handleError;
