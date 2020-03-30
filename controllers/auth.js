const User=require('../models/User');
const {registerValidation,loginValidation}=require('../validation');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

//validation


exports.userRegister=async(req,res)=>{

const {error}=registerValidation(req.body);
if(error) return res.status(400).send(error.details[0].message);

const emailExists= await User.findOne({email:req.body.email});
if(emailExists) return res.status(400).send('User already Exists');

const salt=await bcrypt.genSalt(10);
const hashedPasword=await bcrypt.hash(req.body.password,salt);

var img;
if(!req.file){
 img='default.png';
}
else
img=req.file.filename;

const user=new User({
    name:req.body.name,
    email:req.body.email,
    password:hashedPasword,
    position:req.body.position,
    prof_img:img
});

try{
    console.log('Registering');
    const savedUser=await user.save();
    console.log('Registered');
    res.send(savedUser);
}catch(err){
    res.status(400).send(err);
}
}

exports.userLogin=async(req,res)=>{
    const {error}=loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //user validation
    const userExists= await User.findOne({email:req.body.email});
    if(!userExists) return res.status(400).send('User does not exists');

    //password validation
    const pwdvalid=await bcrypt.compare(req.body.password,userExists.password);
    if(!pwdvalid) return res.status(400).send('Invalid Password');

    const token=jwt.sign({_id:userExists._id,name:userExists.name,email:userExists.email,position:userExists.position,prof_img:userExists.prof_img},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);

}