const mongoose=require("mongoose");
const schema=mongoose.Schema;
const adminSchema=new schema({    
    fname:{
        type:String,
        required:true,
    },
   
    email:{
        type:String,
        required:true,
    },
    
    pwd:{
        type:String,
        required:true,
    },
},{timestamps:true});
const custlogin=mongoose.model("adminlogin",adminSchema);
module.exports=custlogin;
