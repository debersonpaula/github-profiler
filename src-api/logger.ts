import winston, { format } from 'winston';
const { combine, timestamp, prettyPrint, simple } = format;

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File({
      filename: './dist/error.log',
      level: 'error',
      format: combine(timestamp(), simple()),
    }),
    new winston.transports.File({
      filename: './dist/combined.log',
      format: combine(timestamp(), simple()),
    }),
    new winston.transports.Console({
      format: combine(simple()),
    }),
  ],
});

export default logger;
