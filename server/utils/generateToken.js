import jwt from 'jsonwebtoken';

/**
 * Generate JWT Token
 * @param {string} userId - User ID to include in token payload
 * @param {string} email - User email to include in token payload
 * @param {string} username - Username to include in token payload
 * @returns {string} JWT Token
 */
export const generateToken = (userId, email, username) => {
  const payload = { id: userId, email, username };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
    issuer: 'portfolio-app',
    audience: 'portfolio-users'
  });
};

/**
 * Generate Refresh Token
 * @param {string} userId - User ID to include in token payload
 * @returns {string} Refresh JWT Token
 */
export const generateRefreshToken = (userId) => {
  const payload = { id: userId, type: 'refresh' };

  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d',
    issuer: 'portfolio-app',
    audience: 'portfolio-users'
  });
};

/**
 * Verify JWT Token
 * @param {string} token - JWT token to verify
 * @returns {object} Decoded token payload
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new Error('Invalid token');
  }
};

/**
 * Verify Refresh Token
 * @param {string} refreshToken - Refresh token to verify
 * @returns {object} Decoded token payload
 */
export const verifyRefreshToken = (refreshToken) => {
  try {
    return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);
  } catch {
    throw new Error('Invalid refresh token');
  }
};

/**
 * Get token expiration time
 * @param {string} token - JWT token
 * @returns {Date} Expiration date
 */
export const getTokenExpiration = (token) => {
  try {
    const decoded = jwt.decode(token);
    return new Date(decoded.exp * 1000);
  } catch {
    throw new Error('Invalid token format');
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} True if expired
 */
export const isTokenExpired = (token) => {
  try {
    const expiration = getTokenExpiration(token);
    return Date.now() >= expiration.getTime();
  } catch {
    return true;
  }
};
