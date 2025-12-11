const express = require('express');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
const port = 3000;
const mongoose = require('mongoose');
const session = require('express-session');
app.use(session({
  secret: "secret-key",
  resave: false,
  saveUninitialized: true
})); 

app.use(express.urlencoded({extended:true}));
const Mydata=require("./models/mydataSchema");

app.use(express.static('public'));//استدعي ملف css
//////////
app.use(express.static(path.join(__dirname,'kola')));

/////////
var moment =require('moment');
var methodOverride=require('method-override');
app.use(methodOverride('_method'));



app.get('/index', async (req, res) => {
    const users = await Mydata.find();

  
    res.render("index", { error: null });
  });
  
  app.post('/index', async (req, res) => {
    try {
      const { fullName,username,phone,userType,city, email, password } = req.body;
  
      // هل المستخدم موجود؟
      const exists = await Mydata.findOne({ email });
  
      if (exists) {
        return res.render("index", { error: "هذا الإيميل مسجّل مسبقاً" });
      }
  
      const newUser= new Mydata({fullName,username,phone,userType,city, email, password});
  
  await newUser.save();
  console.log("تم القبض",newUser  );
  
  
      req.session.user = newUser.username; 
      // ✅ إعادة التوجيه إلى صفحة الموقع
      res.redirect('/abarpr.html');
    } catch (err) {
      console.log("خطا عند الحفط",err);
      res.render("index", { error: "حدث خطأ أثناء إنشاء الحساب" });
    }
  });
  
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    const user = await Mydata.findOne({ email: username, password: password });
  
    if (!user) {
      return res.render('index', { error: "خطأ في اسم المستخدم أو كلمة المرور" });
    }
  
    req.session.user = user.username;
    res.redirect("/abarpr.html");
  }); 
  
  function requireLogin(req, res, next) {
    if (!req.session.user) {
      return res.redirect("/index");
    }
    next();
  }
  
  ////////////
  
  app.get('/login', (req, res) => {
    res.render('login',{error:"خطا"});
  });
  
  
  
  app.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect("/index",{error:null});
    });
  });
////////////////////////////////////////////////////////  


app.get('/',requireLogin, (req, res) => {
   
    res.redirect("/abarpr.html");
});


////////////////////////
// مسار جديد لعرض بيانات جميع المستخدمين في الترمينال
app.get('/admin/users', async (req, res) => {
    try {
        const users = await Mydata.find();
        
        // طباعة البيانات في الترمينال
        console.log("=========================================");
        console.log("✅ البيانات المخزنة حالياً في قاعدة البيانات:");
        console.log(users); 
        console.log("=========================================");

        // يمكنك إرسال رد بسيط للمتصفح حتى لا تتوقف الصفحة
        res.send("Users data displayed in the terminal. Check your console.");
        
    } catch (error) {
        console.error("❌ خطأ أثناء جلب البيانات:", error);
        res.status(500).send("Error fetching data.");
    }
});
///////////////////////
mongoose.connect('mongodb+srv://KHAWLAH_db_user:dBA1IWxz1hGU5ahv@cluster0.0rettt3.mongodb.net/all-data?appName=Cluster0')
.then(()=>{
    app.listen(4000,()=>{
    console.log('http://localhost:4000');
});
})
.catch((err)=>{console.log(err)});

