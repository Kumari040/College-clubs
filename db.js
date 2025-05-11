const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=Schema.Types.ObjectId;
const formSchema=new Schema({
    name:String,
    dept:String,
    year:String,
    clubpref1:String,
    clubpref2:String,
    clubpref3:String,
    email:{type:String,unique:true}
});
const formModel=mongoose.model("form",formSchema);
module.exports={
    formModel
};