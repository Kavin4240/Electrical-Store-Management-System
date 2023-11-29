
const mongoose=require("mongoose");
const schema=mongoose.Schema;

const supplierschema=new schema({
    sname:{
        type:String,
        required:true,
    },
    pdname:{
        type:String,
        required:true,
    },
   
    image:{
        type:String,
        required:true,
    },
    
    price:{
        type:Number,
        required:true,
    },
    quan: {
        type: Number,
        required: true
      },  
},{timestamps:true});
const supplier_new=mongoose.model("supplier_new",supplierschema);
module.exports=supplier_new;