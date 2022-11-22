const express = require("express");
const session = require("express-session");
const connectDB = require("./db/db");
const MongoDBStore = require("connect-mongodb-session")(session);

const appController = require('./appController');



const app = express();

connectDB();

const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/addressbook',
    collection: "mySessions",
});

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true }));

app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

app.get('/addNew',(req,res)=>{
    res.send('Add New Get page!!');
});

app.post('/addNew',appController.addNew);
app.post('/update/:phoneNumber',appController.update);

app.delete('/delete/:phoneNumber',appController.deleteContact);



app.get('/search',appController.search);
app.get('/alllisting',appController.alllisting);




app.listen(5000, console.log("App Running on http://localhost:5000"));
