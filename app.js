const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
app.use(express.urlencoded({extended:true}));
const Mfad=require("./models/mydataSchema");
app.set('view engine', 'ejs');
app.use(express.static('public'));//استدعي ملف css
var moment =require('moment');
var methodOverride=require('method-override');
app.use(methodOverride('_method'));


//خاصه auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
//------عرض الصفحات html فقط--------//

app.get('/', (req, res) => {
  //----Mfad قاعده البيانات اسمه-----//
  Mfad.find().then((result) =>{

 res.render("index",{ fadarr: result, moment: moment }); 
  }).catch((err) =>{
    console.log(err);
  });

});




app.get('/user/add.html', (req, res) => {
  res.render("user/add",{ }); 

});

app.get('/edit/:id', (req, res) => {
  Mfad.findById(req.params.id)
  .then((result) =>{
res.render("user/edit",{ obj :result,  moment: moment});
  })
  .catch((err) =>{
    console.log(err);
  });
  
});
//------يخزن البيانات بقاعده البيانات--------//
app.post('/user/add.html', (req, res) => {
 
 
  Mfad.create(req.body)
 .then(() => {
res.redirect('/')
 })
 .catch((err) =>{
  console.log(err);
 });
});

//--البحث--//
app.post('/search', (req, res) => {
  console.log("*********************");
  const searchText=req.body.searchText.trim()

  Mfad.find(   { $or: [{ Firstname : searchText },{lastname: searchText}] }    )
  .then((result) => {
    console.log(result);
    res.render("user/search",{ arr:result,  moment: moment});
  }).catch((err) =>{
   console.log(err);
  });
 });




app.get('/view/:id', (req, res) => {
  
  Mfad.findById(req.params.id)
  .then((result) =>{
res.render("user/view",{ obj:result,  moment: moment});
  })
  .catch((err) =>{
    console.log(err);
  });
  
});


app.delete("/edit/:id", (req,res) => {
Mfad.findByIdAndDelete(req.params.id)
.then(() =>{
res.redirect("/");
    })
    .catch((err) =>{
      console.log(err);
    });
});

//////////////حقل التعديل
app.put("/edit/:id", (req,res) => {
 

  Mfad.findByIdAndUpdate(req.params.id , req.body)
  .then(()=>{
    res.redirect("/");
  }).catch((err) =>{
    console.log(err);
  });
});



mongoose.connect('mongodb+srv://fadwax0212:XCOLrNSiFci8Vtzl@cluster0.87dcl9s.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
  app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
})
.catch((err) => {console.log(err);
});


