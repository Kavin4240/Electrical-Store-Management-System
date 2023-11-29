const mongoose=require("mongoose");
const schema=mongoose.Schema;

const customerSchema=new schema({
    
    fname:{
        type:String,
        required:true,
    },
   
    email:{
        type:String,
        required:true,
    },
    phno: {
        type: Number,
        required: true
      },
      add:{
        type:String,
        required:true,
    },
    
},{timestamps:true});

const customer=mongoose.model("customer",customerSchema);
module.exports=customer;



