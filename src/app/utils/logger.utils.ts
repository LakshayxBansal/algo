import pino from "pino";


const dir = `~/app.log`;

export const logger = pino(
  {
    name: process.env.APP_ID,
    level: process.env.LOG_LEVEL,
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  }
);

/*

const fileTransport = pino.transport({
  target: 'pino/file',
  options: { destination: `${__dirname}/app.log` },
});




,
  pino.destination(`${__dirname}/app.log`)
*/