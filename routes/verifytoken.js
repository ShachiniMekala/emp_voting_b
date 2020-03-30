const jwt=require('jsonwebtoken');

module.exports=function auth(req,res,next){
const token=req.header('auth-token');
if(!token) return res.status(400).send('Access denied');

try{
const veryfied=jwt.verify(token,process.env.TOKEN_SECRET);
req.user=veryfied;
next();
}catch(err){
res.status(400).send('Invalid token');
}
}