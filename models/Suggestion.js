const mongoose=require('mongoose');
const sugSchema = new mongoose.Schema({
    manager_id: {
        type: mongoose.Schema.Types.ObjectId, ref:'User',
        required: true
    },
    suggestion:{
        type:String,
        required:true
    },
    option:[{
        name:{
            type:String,
            required:true
        },
        count:{
            type : Number
        }    
    }],
    status:{
        type:Boolean,
        required:true
    },date:{
        type:Date,
        default:Date.now
    }
});


module.exports=mongoose.model('Suggestion',sugSchema);