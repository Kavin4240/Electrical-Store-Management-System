const product_new=require("../models/cusreg");
const cuslogin=require("../models/cuslogin");
const supplier=require("../models/supplier");
//admin control

// stocks start------------------------------------------------------------------------
const all_pro=(req,res)=>{
  product_new.find().sort({ createdAt: -1 })
  .then(result=>{
    res.render('Addproduct',{ products :result,title:"Stocks"});
  })
  .catch(err=>{
    console.log(err);
  });
}


const post_pro=(req,res)=>{
    const pro=new product_new(req.body);
    pro.save()
    .then(result=>{
      res.redirect("/admin/products")
    })
    .catch(err=>{
      console.log(err);
    });
  }

const delete_pro=(req,res)=>{
  const id=req.params.id;
  product_new.findByIdAndDelete(id)
  .then(result=>{
    res.redirect("/admin/products")
  })
  .catch(err=>{
    console.log(err);
  });
}



const edit_pro_get=(req,res)=>{
  const id = req.params.id;
  product_new.findById(id)
  .then(result=>{
    res.render('stockEdit',{ products:result,title:"Products"});
  })
  .catch(err=>{
    console.log(err);
  });
}

const edit_pro_put=(req,res)=>{
  product_new.findOneAndUpdate(req.body)
  .then(result=>{
    res.redirect("/admin/products")
  })
  .catch(err=>{
    console.log(err);
  });

}
//stocks end------------------------------------------------------------------

//supplier start--------------------------------------------------------------

const all=(req,res)=>{
    supplier.find()
    .then(result=>{
        res.render('Supplier',{ suppl:result,title:"Suppliers"});
    })
    .catch(ree=>{
        console.log(err);
    });
  }
  
  const post_suppl=(req,res)=>{
    const s=new supplier(req.body);
    s.save()
    .then(result=>{
      res.redirect("/admin/products/supplier")
    })
    .catch(err=>{
      console.log(err);
    });
  }
  
  
  
  
  //supplier end----------------------------------------------------------------
  
  
  module.exports={
      //stocks
      
      all_pro,
      post_pro,
      delete_pro,
      edit_pro_get,
      edit_pro_put,
  
  
  
      //suppliers
      all,
      post_suppl
      
  }