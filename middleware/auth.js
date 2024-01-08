// C:\Users\vivek\works\blogtest\blogtest\server\middleware\auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Extract the token from the request headers
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header is missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decodedToken);

    // Attach the decoded token to the request object
    // req.userData = { userId: decodedToken.userId };
    req.userData = { userId: decodedToken.id }; // Update this line

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
