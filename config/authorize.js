const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

const isAuthenticated = async (req, res, next) => {
    //console.log("Cookies:", req.cookies); 
 //   const token = req.header("Authorization")?.split(" ")[1];
    const token = req.cookies.token;
    if(!token){
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {          
        console.error(error);
        return res.status(401).json({ error: "Token is not valid or has expired." });
    }
}

module.exports = isAuthenticated;

// /middleware/auth.js

// const protect = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.id; // Save user ID in request
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// module.exports = protect;
