const { consoleError } = require('../app/common/consoleLog');
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind =
    typeof port === 'string'
      ? // eslint-disable-next-line no-undef
        `Pipe ${port}`
      : // eslint-disable-next-line no-undef
        `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      consoleError(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      consoleError(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

exports.normalizePort = normalizePort;
exports.onError = onError;
