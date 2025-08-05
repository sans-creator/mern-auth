import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not Authorized. Please log in again.'
        });
    }

    try {
        // Decode the token
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
        } else {
            return res.status(401).json({
                success: false,
                message: 'Not Authorized. Please log in again.'
            });
        }

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token has expired. Please log in again.'
            });
        }

        return res.status(401).json({
            success: false,
            message: 'Not Authorized. ' + error.message
        });
    }
};

export default userAuth;
