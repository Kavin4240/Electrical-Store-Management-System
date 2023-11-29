const mongoose=require("mongoose");
const schema=mongoose.Schema;
const productschema=new schema({
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
    quan:{
        type:Number,
        required:true,
    },
    des: {
        type: String,
        required: true,
        
      },  
},{timestamps:true});
const product_new=mongoose.model("product_new",productschema);
module.exports=product_new;