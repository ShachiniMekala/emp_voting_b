const router=require('express').Router();
const auth=require('../controllers/auth');
const verify=require('./verifytoken');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename:function(req, file, cb){
        cb(null, Date.now()+'_' + file.originalname);
    }
}); 

const fileFilter  = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null,false);
    }
}

const upload = multer({storage: storage, limits:{
    fileSize: 1024*1024*5 //5MB file size
},fileFilter:fileFilter
}); 


router.post('/register',verify,upload.single('prof_img'),auth.userRegister);
router.post('/login',auth.userLogin);

module.exports=router;