const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

module.exports = (context)=>{
const authHeader = context.req.headers.authorization;
if(authHeader){
    const token = authHeader.split('Bearer')[1];
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            context.req.user = decoded;
        }catch(err){
            throw new AuthenticationError('Invalid token');
        }
    }else{
        throw new Error('The Auth token must be Bearer {token}');
    }
}else{
    throw new Error('The authorization header must be provided');
}

};



