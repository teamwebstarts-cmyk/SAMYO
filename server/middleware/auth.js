import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT token if provided
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token', error: err.message });
  }
};

/**
 * Middleware to enforce Admin-only access on write / update / delete operations
 */
export const requireAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Access Denied: Only Admin can create, modify, or delete CRM records. Please log in as Admin.'
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = decoded;

    if (!decoded.isAdmin && decoded.accessRole !== 'admin') {
      return res.status(403).json({
        message: 'Access Denied: You have Viewer (Read-Only) permissions. Only Admin can modify CRM data.'
      });
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token', error: err.message });
  }
};
