const requests = {};
// 10 minutes
const maxTime = 10 * 60 * 1000;
// max requests per IP
const maxRequests = 120;

function rateLimiter(req, res, next) {
  const ip = req.ip;
  const currentTime = Date.now();
  const requestData = requests[ip];

  // for initial or time completed
  if (!requestData || currentTime - requestData.startTime > maxTime) {
    requests[ip] = {count: 1, startTime: currentTime};
    return next();
  }

  // increment and allow if under limit
  if (requestData.count++ < maxRequests) {
    return next();
  }

  // too many requests
  return res.status(429).json({
    success: false,
    error: 'Too many requests, please try later.',
  });
}

module.exports = rateLimiter;
