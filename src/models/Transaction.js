const mongoose=require("mongoose")
const TransactionSchema= mongoose.Schema({
    sender:String,
    senderName:String,
    reciever:String,
    recieverName:String,
    amount:Number,
    date:{
        type:String,
        default:new Date( Date.now()).toString()
    },
    status:String,
})
const Transaction=new mongoose.model("Transaction",TransactionSchema)
module.exports=Transaction