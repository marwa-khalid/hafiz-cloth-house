// IMPORT EXPRESS-SESSION
const session = require("express-session");

// IMPORT EXPRESS
const express = require("express");
const app = express();

// USE EXPRESS-SESSION
app.use(session({secret: 'SessionPrivateKey', resave: false, saveUninitialized: true, cookie: { maxAge: 60000 }, }));

// IMPORT MONGOOSE AND SET UP DATABASE CONNECTION
const mongoose = require("mongoose");
mongoose
    .connect("mongodb+srv://ALIHASSAN:ALISHBAPriNcEsS@hafiz-cloth-house-db.uhhbp7r.mongodb.net/hafiz-cloth-house-database",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
    .then( () => 
    {
        console.log("CONNECTION ESTABLISHED WITH DATABASE");
    })
    .catch( (error => 
    {
        console.log("ERROR WHILE CONNECTING DATABASE: " + error);
    }));

// IMPORT JSON FOR REQUESTED DATA INPUT AS JSON ARRAY
app.use(express.json());

// For Data Submission on Method="Post"
app.use(express.urlencoded({ extended: true }));

// SET PUBLIC AND VIEW DIRECTORY PATHS
var path = require('path');
app.use(express.static(path.join(__dirname, "public")));
app.use('/ProductFilesUploads', express.static('ProductFilesUploads'));
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

// IMPORT ROUTES
const PublicRoutes = require("./Protocols/Routes/PublicRoutes");

app.use("/", PublicRoutes);

// IMPORT APIs
const ProductAPIs = require("./Protocols/APIs/ProductsAPI");

app.use('/api/products/', ProductAPIs);

// ASSIGN AND LISTEN PORT
const port = process.env.PORT || 3000
app.listen(port);