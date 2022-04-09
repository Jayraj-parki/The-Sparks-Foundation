const mongoose=require("mongoose")
mongoose.connect(process.env.DB)
.then(()=>{
    console.log("connection successful")
})
.catch((err)=>{
    console.log(err)
}) 