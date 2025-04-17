export const sendResponse = (res, statusCode, data = null, message = null) => {
  const defaultMessages = {
    200: 'Request successful',
    201: 'Resource created',
    400: 'Bad request',
    404: 'Resource not found',
    500: 'Internal server error'
  };

  return res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    data,
    message: message || defaultMessages[statusCode] || 'OK'
  });
};


// 'success' will be true only if the status code is between 200 and 299
// This range is used for HTTP success responses:
//  200: OK 
//  201: Created 
//  204: No Content 

