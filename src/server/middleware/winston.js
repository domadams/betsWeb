import Winston from 'winston';
// creates a new Winston Logger
const logger = new Winston.createLogger({
  level: 'info',
  transports: [
    new Winston.transports.File({ filename: './dist/logs/error.log', level: 'error' }),
  ],
  exitOnError: false,
});

export default logger;
