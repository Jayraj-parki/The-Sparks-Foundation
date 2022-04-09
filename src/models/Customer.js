const mongoose=require("mongoose")
const CustomerSchema= mongoose.Schema({
    username:String,
    balance:Number,
})
const Customer=new mongoose.model("customer",CustomerSchema)
module.exports=Customer