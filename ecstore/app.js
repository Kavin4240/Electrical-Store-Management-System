var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const url = require('url');
const moment = require('moment');
const adminlogin=require("./models/adminlogin");//admin
const customer=require("./models/cusinfo");//customer
const product_new=require("./models/addproduct");//stock
const supplier_new=require("./models/supplier");//purchase
//const sales=require("./models/sales");//sales
const empinfo=require("./models/empinfo");//employee
const supinfo=require("./models/supinfo");//supplier
const invoice=require("./models/invoice");//invoice
const app = express()

app.set('view engine','ejs');
app.use(bodyParser.json())
app.use(express.static('./views'))


app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({
extended:true}))

mongoose.connect('mongodb://localhost:27017/ecstore',{
useNewUrlParser: true,
useUnifiedTopology: true });


//  mongoose.connect('mongodb+srv://kavin:Kavin2628@cluster0.8demnbv.mongodb.net/?retryWrites=true&w=majority',{
//  useNewUrlParser: true,
//  useUnifiedTopology: true });


var db = mongoose.connection;
db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))
app.set('view engine','ejs');

app.get('/',(req,res)=>{
   //res.sendFile('./views/home.html',{root:__dirname});
   res.render('home',{title:'Home'});
});
app.get('/dashboard',(req,res)=>{
  //res.sendFile('./views/home.html',{root:__dirname});
  res.render('Dashboard');
});
app.get('/add',(req,res)=>{
   //res.sendFile('./views/home.html',{root:__dirname});
   res.render('Addproduct');
});

 app.post("/add-product",(req,res)=>{
   
   let pro=new product_new(req.body)
    pro.save()
    res.redirect("/display_products")
 
  });

//add invoice
app.get('/addinvoice',(req,res)=>{
  res.render('AddInvoice');
});

app.post("/add-invoice",(req,res)=>{
  
   let pro=new invoice(req.body);
   pro.save()
   res.redirect("/display_invoices")

   
 });

 app.get("/display_invoices",(req,res)=>{
  invoice.find({}, (err, invoice) => {
    if (err) {
      console.log('Error fetching products:', err);
      return;
    }
     res.render('Disinvoice',{invoice:invoice})
    // res.render('ReportGeneration',{invoice:invoice})
    
  });
  })
  app.get("/display_reports",(req,res)=>{
  
    const currentDate = moment().format('MM/DD/YYYY');

 invoice.find({ 
  invoicedate: { $eq: currentDate } }, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    
    res.render('ReportGeneration',{invoice:data})
  }
});
  })
  app.get("/invoice/(:id)/delete",function(req,res){
  
    invoice.findByIdAndRemove(req.params.id,(err,doc)=>{
       if(!err){
          res.redirect('/display_invoices')
       }
       else{
          console.log(err);
       }
    })
  })
  app.get("/invoice/(:id)/print",function(req,res){
  
    // console.log(req.params.id);
   invoice.findById(req.params.id,(err,invoice)=>{
        if(!err){
           console.log(invoice)
          //  res.redirect('/printinvoice',{invoice:invoice})
          
  res.render('PrintInvoice', { invoice });

        }
        else{
           console.log(err);
        }
     })
  })
 
  app.get('/printinvoice',(req,res)=>{
    res.render('PrintInvoice');
  });
//Print Invoice Report
  app.get("/invoice/(:id)/printreport",function(req,res){
  
    // console.log(req.params.id);
   invoice.findById(req.params.id,(err,invoice)=>{
        if(!err){
           console.log(invoice)
          //  res.redirect('/printinvoice',{invoice:invoice})
          
  res.render('PrintReport', { invoice });

        }
        else{
           console.log(err);
        }
     })
  })

  app.get('/report',(req,res)=>{
    res.render('ReportGeneration');
  });

  

//search
app.get('/search',(req,res)=>{
  try{
   customer.find({$or:[{fname:{'$regex':req.query.search}}]},(err,customer)=>{
    if(err){
      console.log(err);
    }
    else{
      res.render('Discustomer',{customer:customer});
    }
   })
  }catch(err){
    console.log(err);
  }
  
});

  //employee
  app.get('/emp',(req,res)=>{
    //res.sendFile('./views/home.html',{root:__dirname});
    res.render('Employee');
 });
 
  app.post("/add-employee",(req,res)=>{
   
    let emp=new empinfo(req.body)
     emp.save()
     res.redirect("/display_employees")
  
   });
  
   app.get("/display_employees",(req,res)=>{
    empinfo.find({}, (err, empinfo) => {
      if (err) {
        console.log('Error fetching products:', err);
        return;
      }
    // console.log('All products:', empinfo);
      res.render('DisEmployee',{empinfo:empinfo})
    });
    })

    app.get("/empinfo/(:id)/edits",(req,res)=>{
      const id=req.params.id;
      empinfo.findById(id)
      .then(result=>{
        res.render('EditEmployee',{
          result:result});
         
      })
      .catch(err=>{
        console.log(err);
      }); 
    })
    
    app.post("/empinfo/:id/edits",(req,res)=>{
       const {ename,email ,sal, exp , phno,pos,add} = req.body; 
       const _id = req.params.id;
       
       empinfo.updateOne({_id:_id},{$set:{ename:ename,email:email,sal:sal,phno:phno, exp:exp,pos:pos,add:add}})
         .then((data)=>{
    
           res.redirect('/display_employees')
         })
         .catch((err)=>{
           console.log(err);
         }) 
     })

     app.get("/empinfo/(:id)/delete",function(req,res){
  
      empinfo.findByIdAndRemove(req.params.id,(err,doc)=>{
         if(!err){
            res.redirect('/display_employees')
         }
         else{
            console.log(err);
         }
      })
    })


//supplier details
app.get('/sup',(req,res)=>{
  //res.sendFile('./views/home.html',{root:__dirname});
  res.render('Suppinfo');
});

app.post("/add-sup",(req,res)=>{
 
  let sup=new supinfo(req.body)
   sup.save()
   res.redirect("/display_sup")

 });

 app.get("/display_sup",(req,res)=>{
  supinfo.find({}, (err, supinfo) => {
    if (err) {
      console.log('Error fetching products:', err);
      return;
    }
  // console.log('All products:', empinfo);
    res.render('Dissuplinfo',{supinfo:supinfo})
  });
  })

  app.get("/supinfo/(:id)/delete",function(req,res){
  
    supinfo.findByIdAndRemove(req.params.id,(err,doc)=>{
       if(!err){
          res.redirect('/display_sup')
       }
       else{
          console.log(err);
       }
    })
  })


  //customer
  
  app.get('/customer',(req,res)=>{
    res.sendFile('./views/customer.html',{root:__dirname});
  });

  app.post("/customer",(req,res)=>{
   
    let cust=new customer(req.body)
    cust.save()
    res.redirect("/display_cus");
  
  });

  app.get("/display_cus",(req,res)=>{
    customer.find({}, (err, customer) => {
      if (err) {
        console.log('Error fetching products:', err);
        return;
      }
    // console.log('All products:', empinfo);
      res.render('Discustomer',{customer:customer})
    });
    })
  
    app.get("/customer/(:id)/delete",function(req,res){
    
      customer.findByIdAndRemove(req.params.id,(err,doc)=>{
         if(!err){
            res.redirect('/display_cus')
         }
         else{
            console.log(err);
         }
      })
    })
  
 

//purchase
 app.get('/supplier',(req,res)=>{
   //res.sendFile('./views/home.html',{root:__dirname});
   res.render('Supplier');
});
app.post("/supplier",(req,res)=>{
   
   let sup=new supplier_new(req.body)
   sup.save()
   console.log(req.body);
   res.redirect("/display_suppliers");
 
 });
 app.get("/display_suppliers",(req,res)=>{
   supplier_new.find({}, (err, suppliers) => {
     if (err) {
       console.log('Error fetching products:', err);
       return;
     }
    // console.log('All products:', products);
     res.render('Dissupplier',{suppliers:suppliers})
   });
   })
   app.get("/supplier/(:id)/edits",(req,res)=>{
    const id=req.params.id;
    supplier_new.findById(id)
    .then(result=>{
      res.render('EditSupplier',{
        result:result});
       
    })
    .catch(err=>{
      console.log(err);
    }); 
  })
  
  app.post("/supplier/:id/edits",(req,res)=>{
     const {sname,pdname ,image, price , quan} = req.body; 
     const _id = req.params.id;
     
     supplier_new.updateOne({_id:_id},{$set:{sname:sname,pdname:pdname,image:image,price:price, quan:quan}})
       .then((data)=>{
  
         res.redirect('/display_suppliers')
       })
       .catch((err)=>{
         console.log(err);
       }) 
   })
//  app.get("/display_products",(req,res)=>{
//    product_new.find({},(err,ans)=>{
//       if(err){
//          console.log(err);
//          return;
//       }
//       console.log(ans);
//       res.render("Displayproduct",{ans})
//    })

//  })

app.get("/display_products",(req,res)=>{
product_new.find({},  (err, products) => {
  if (err) {
    console.log('Error fetching products:', err);
    return;
  }
  res.render('Displayproduct',{products:products})
});
})

app.get('/edit',(req,res)=>{
  //res.sendFile('./views/home.html',{root:__dirname});
  res.render('Editproduct');
});
app.get('/edits',(req,res)=>{
  //res.sendFile('./views/home.html',{root:__dirname});
  res.render('EditSupplier');
});
app.get("/products/(:id)/delete",function(req,res){
  
   product_new.findByIdAndRemove(req.params.id,(err,doc)=>{
      if(!err){
         res.redirect('/display_products')
      }
      else{
         console.log(err);
      }
   })

})

app.get("/supplier/(:id)/delete",function(req,res){
  
  supplier_new.findByIdAndRemove(req.params.id,(err,doc)=>{
     if(!err){
        res.redirect('/display_suppliers')
     }
     else{
        console.log(err);
     }
  })
})

app.get("/products/(:id)/edit",(req,res)=>{
  const id=req.params.id;
  product_new.findById(id)
  .then(result=>{
    res.render('Editproduct',{
      result:result});
     
  })
  .catch(err=>{
    console.log(err);
  }); 
})

app.post("/products/:id/edit",(req,res)=>{
   const {pdname ,image, price ,quan, des} = req.body; 
   const _id = req.params.id;
   
   product_new.updateOne({_id:_id},{$set:{pdname:pdname,image:image,price:price,quan:quan,des:des}})
     .then((data)=>{

       res.redirect('/display_products')
     })
     .catch((err)=>{
       console.log(err);
     }) 
 })


app.get('/login',(req,res)=>{
    res.sendFile('./views/login.html',{root:__dirname});
 });
 app.post("/login",(req,res)=>{
   
   let admin=new adminlogin(req.body)
   admin.save()
   res.redirect("/dashboard");
 
 });

 app.listen(3001,()=>{
   console.log('Server listening on port 3001');
 });



