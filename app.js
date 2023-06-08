const express = require("express")
const app = express()
const session = require("express-session")
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const ownerlogin = require("./routes/owner_login.js")
const register = require("./routes/owner_register.js")
const uploader = require("./routes/customer_fileupload.js")
const customerlogin = require("./routes/newcustomer_login.js")
const availabler = require("./routes/owner_fileavailable.js")
const downloader = require("./routes/owner_filedownload.js")
const existingcustomerlogger = require('./routes/existingcustomer_login.js')
const ownerlogout = require("./routes/owner_logout.js")
const MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore(
  {
    uri: 'mongodb://127.0.0.1:27017/',
    databaseName: 'Filesfer',
    collection: 'SESSIONS',
  },
  function(error) {
    // Should have gotten an error
    // console.log(error)
  });



const FIFTEEN_SECONDS = 60*60*60

const{
    PORT = 5000,
    SESSION_NAME = 'sid',
    SESSION_SECRET = 'Its Sessions Secret',
    SESSION_LIFETIME = FIFTEEN_SECONDS 
}=process.env

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());

app.use(session({
    name : SESSION_NAME,
    secret : SESSION_SECRET,
    saveUninitialized : false,
    resave : false,
    store : store,
    cookie : {
        maxAge : SESSION_LIFETIME,
        httpOnly : true,
        sameSite : true,
        secure : false
    }
}))



app.use('/owner_register',register)

app.use('/owner_login',ownerlogin)

app.use('/owner_fileavailable', availabler)

app.use('/owner_filedownload',downloader)

app.use('/newcustomer_login',customerlogin)

app.use('/existingcustomer_login',existingcustomerlogger)

app.use('/customer_fileupload',uploader)

app.use('/owner_logout',ownerlogout)









app.listen(PORT,() =>{
    console.log('Server Listening to Port Number 5000...')
})