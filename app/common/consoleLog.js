const consoleLog = (...theArgs) => {
  const len = theArgs.length;
  switch (len) {
    case 1:
      console.log(theArgs[0]); // eslint-disable-line no-console
      break;
    case 2:
      console.log(theArgs[0], theArgs[1]); // eslint-disable-line no-console
      break;
    default:
      // eslint-disable-next-line no-console
      console.log(theArgs);
      break;
  }
};
const consoleError = (...theArgs) => {
  const len = theArgs.length;
  switch (len) {
    case 1:
      console.error(theArgs[0]); // eslint-disable-line no-console
      break;
    case 2:
      console.error(theArgs[0], theArgs[1]); // eslint-disable-line no-console
      break;
    default:
      // eslint-disable-next-line no-console
      console.error(theArgs);
      break;
  }
};
exports.consoleLog = consoleLog;
exports.consoleError = consoleError;
