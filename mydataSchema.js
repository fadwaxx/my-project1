const mongoose=require("mongoose");
const Schema =mongoose.Schema;

//الاسكيما البيانات الي ابي اخزنا شكلها كيف
const articleSchema =new Schema({
    Firstname:String,
    lastname:String,
    email:String,
    phonenumper:String,
    age:String,
    cuntry:String,
    gender:String,
} , {timestamps: true});


//انشء شكل للبيانات حقتي
const Mfad =mongoose.model("Mfadaa",articleSchema);

//تصدير هذا الملف للapp.js
module.exports =Mfad




