require("dotenv").config();
const express = require("express");
const db = require("./models");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defualtLayout: "main"}));
app.set("view engine", "handlebars");

require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);

db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log("App listening on port" + PORT)
    })
});

