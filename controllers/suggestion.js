const Sug=require('../models/Suggestion');

exports.sugRegister=async(req,res)=>{
    var optionName=[];
    for (var i = 0; i < req.body.option.length; i++) {
        optionName.push({name: req.body.option[i], count:0});
      }
    const sug=new Sug({
        manager_id:req.body.manager_id,
        suggestion:req.body.suggestion,
        status:true,
        option:optionName
    });
    try{
        console.log(optionName);
        const savedSug=await sug.save();
        console.log('Registered');
        res.send(savedSug);
    }catch(err){
        res.status(400).send(err);
    }
}

exports.sugView=async(req,res)=>{
    try{
        const allSug=await Sug.find({status:true});
        res.status(200).send(allSug);
    }catch(err){
        res.status(400).send(err);
    }
  
}