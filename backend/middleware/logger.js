// ===============================================================
// Custom Middleware: Request Logger
// Demonstrates how middleware intercepts incoming requests
// before they reach the route handlers.
//
// Flow: Request -> Middleware -> next() -> Route Handler
// ===============================================================

function logger(req, res, next) {
  // Log current timestamp, HTTP method (GET, POST, etc.), and requested URL
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);

  // next() passes control to the next middleware or route handler in line
  next();
}

module.exports = logger;
