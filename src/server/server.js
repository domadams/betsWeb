/** *****************************************************
 * Server Entry Point
 * Load the server and set it to listen on the port
 * specified in config.
 ***************************************************** */
import app from './app';

const PORT = process.env.PORT || 8080;

const server = app().listen(
  PORT,
  '0.0.0.0',
  () => console.log(`Blue Monkey started ${JSON.stringify(server.address())}`), // eslint-disable-line no-console
);
