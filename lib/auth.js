import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Check if admin credentials are correct
export function verifyAdminCredentials(username, password) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

// Create a token for admin
export function generateToken(data) {
  return jwt.sign(data, JWT_SECRET, { expiresIn: "7d" });
}

// Verify if token is valid
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Get token from request header
export function getTokenFromRequest(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  return null;
}

// Check if request is from admin
export function isAdmin(request) {
  const token = getTokenFromRequest(request);
  const decoded = verifyToken(token);
  return decoded && decoded.role === "admin";
}
