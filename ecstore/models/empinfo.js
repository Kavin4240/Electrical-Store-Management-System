const mongoose=require("mongoose");
const schema=mongoose.Schema;
const employeeSchema=new schema({
    
    ename:{
        type:String,
        required:true,
    },
   
    email:{
        type:String,
        required:true,
    },
    
    sal:{
        type:Number,
        required:true,
    },
    phno: {
        type: Number,
        required: true
      },
    exp:{
        type:Number,
        required:true
    },
    pos:{
        type:String,
        required:true,
    },
    add:{
        type:String,
        required:true,
    },
    
},{timestamps:true});

const employee=mongoose.model("employee",employeeSchema);
module.exports=employee;



