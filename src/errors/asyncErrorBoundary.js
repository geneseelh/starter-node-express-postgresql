
// delegate -- an async/await handler or middleware function. will be called by the asyncErrorBoundary
// defaultStatus -- optional param that allows u to override the status code returned when delegate throws an error
// asyncErrorBoundary == returns express handler / middleware function which is eventually called by express in place of the delegate function
function asyncErrorBoundary(delegate, defaultStatus) {
    return (request, response, next) => {
      Promise.resolve()
      //makes sure delegate function is called in a promise chain. value returned guaranteed to have catch() method even if delegate isnt an async function
        .then(() => delegate(request, response, next))
        // catch will default error to {} if error is undefined so that the destructuring in the next line doesnt fail
        .catch((error = {}) => {
            // err obj is destructured to status & message variables. defaulting message to error = error can be a String or Error obj
          const { status = defaultStatus, message = error } = error;
          // next is called, passing in status and message
          next({
            status,
            message,
          });
        });
    };
  }
  
  module.exports = asyncErrorBoundary;