// const {verify} = require('jsonwebtoken');

// const validateToken = (req,res,next)=>{
//     const accessToken = req.header("accessToken");
//     if(!accessToken){
//         return res.json({error:"user not loged in"})
//     }
//     try{
//         const validToken = verify(accessToken,"importantsecret");
//         req.user = validToken;
//         if(validToken){
//             return next();
//         }
//     }
//     catch(error){
//         return res.json({error:error})
//     }
// }

// module.exports = {validateToken};
const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const accessToken = req.headers['accesstoken']; // Correctly retrieve the header
  
  if (!accessToken) {
    return res.status(401).json({ error: 'User not logged in' });
  }

  try {
    // Verify the token
    const validToken = verify(accessToken, 'importantsecret');
    req.user = validToken; // Attach the token data to the request object
    
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { validateToken };
