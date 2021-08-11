require("dotenv").config();
const express = require("express");
const mainRoutes = require('./routes/routes');
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const logger = require("morgan");
const fs = require("fs");
const request = require('request')
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const app = express();
const multer = require("multer");
const csv = require("csvtojson");
app.use(cookieParser());

app.use(
  session({
    secret: "MySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: null,
    },
  })
);
// Public Folder
app.use(express.static(path.join( __dirname, "/public")));
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(logger("dev"));
app.set("port", process.env.PORT || 4000);
const mongodb = require("mongodb");
let mongoose = require("mongoose");

const uri =`mongodb+srv://Tvastra:Sgoc.2030@cluster0.w2dnb.mongodb.net/fashionCollection?retryWrites=true&w=majority`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connection Established");
  });

  global.__basedir = __dirname;
 console.log(__basedir)
  // -> Multer Upload Storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(__basedir)
      cb(null, __basedir + "/public/uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post('/demoUpload',upload.single("images"), (req,res)=>{
    console.log(req.body);
  
    res.json({message: 'recived at 5000'})
  })

  // app.use('/',mainRoutes)
  app.listen(app.get("port"), () => {
    console.log("Application started Listening on ", app.get("port"));
  });
  

  module.exports = app;