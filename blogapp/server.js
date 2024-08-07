const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const connect = require("./connection");
const route = require("./router.js");


connect();

const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/',route);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
