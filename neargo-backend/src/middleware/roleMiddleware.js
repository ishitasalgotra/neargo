// src/middleware/roleMiddleware.js
export const requireRole = (role) => {
  return (req, res, next) => {
    // req.user should be set by requireAuth middleware
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    next();
  };
};
