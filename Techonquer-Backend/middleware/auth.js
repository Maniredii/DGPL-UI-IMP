// Check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    return res.status(401).json({
        success: false,
        message: 'Access denied. Please login first.'
    });
};

// Protect middleware (alias for isAuthenticated with user attachment)
const protect = (req, res, next) => {
    if (req.session && req.session.user) {
        req.user = req.session.user;
        return next();
    }
    return res.status(401).json({
        success: false,
        message: 'Access denied. Please login first.'
    });
};

// Check if user is admin
const isAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
    });
};

// Check if admin registration is enabled
const isAdminRegEnabled = (req, res, next) => {
    if (process.env.ADMIN_REG === 'true') {
        return next();
    }
    return res.status(403).json({
        success: false,
        message: 'Admin registration is currently disabled.'
    });
};

module.exports = {
    isAuthenticated,
    protect,
    isAdmin,
    isAdminRegEnabled
};
