/** *****************************************************
 * Main Application
 * Exported function returns an instantiated Express
 * Application with middleware providing:
 * - Static File Routing
 * - Router - This provides a separate avenue for API / HTML response handlers
 ***************************************************** */
import express from 'express';
import { join as joinPath } from 'path';
import helmet from 'helmet';
import crypto from 'crypto';
import preCompressedAssets from 'pre-compressed-assets';
import compression from 'compression';
import contentSecurityPolicy from './middleware/contentSecurityPolicy';
import logger from './middleware/winston';
import errorHandler from './errorHandler';
import apiRoutes from './api-routes';
import router from './server-router';

const nonce = crypto.randomBytes(16).toString('base64');

export default () => express()
  .use(preCompressedAssets(/\.(js|css)$/, joinPath(__dirname, 'public')))
  .use(compression())
  .use(express.static(joinPath(__dirname, 'public')))
  .use(helmet())
  .use(contentSecurityPolicy(nonce))
  .use('/api', apiRoutes)
  .use('/', router(nonce))
  .use((err, req, res, next) => {
    logger.error(`${req.method} - ${err.message}  - ${req.originalUrl} - ${req.ip}`);
    errorHandler(err, res, nonce);
  });
