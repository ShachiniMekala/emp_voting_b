const router=require('express').Router();
const sug=require('../controllers/suggestion');

router.post('/registerSug',sug.sugRegister);
router.post('/sugView',sug.sugView);

module.exports=router;