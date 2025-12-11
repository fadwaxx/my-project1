const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Schemar=new Schema({
    fullName:String,
    username:String,
email:{type:String, unique:true, required:true},
password:{type:String, required:true},
phone:String,
city:String,
userType:String,
});

const Mydata=mongoose.model("Mydatar",Schemar);

module.exports=Mydata;