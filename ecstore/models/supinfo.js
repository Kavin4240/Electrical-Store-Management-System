const mongoose=require("mongoose");
const schema=mongoose.Schema;

const supinfoSchema=new schema({
    
    sname:{
        type:String,
        required:true,
    },
   
    phno: {
        type: Number,
        required: true
      },
    cmpname:{
        type:String,
        required:true
    },
    
},{timestamps:true});

const supinfo=mongoose.model("supinfo",supinfoSchema);
module.exports=supinfo;



