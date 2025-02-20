import jsonwebtoken from 'jsonwebtoken'

const validateToken = (req, res, next) => {

    const tokenHeader = req.headers.authorization;    // "bearer 76t48tfh4t76784"
    if (!tokenHeader) return res.status(401).json({ error: "Access denied. No token provided." });
    
    const tokenArr = tokenHeader.split(' ');
    if(tokenArr.length !== 2) return res.status(400).json({ error: "Invalid token" });
    try {
        const token = tokenArr[1];
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ error: "Invalid token", details: error.message });
    }
}

export default validateToken;
