
// Allows application to run on local host without changing config file
require("dotenv").config();

// Defines packages being used
const express = require("express");
const db = require("./models");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser")
const session = require("express-session")
const passport = require("passport")



// Calls express -- Sets port
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets folder to be avail to clients
app.use(express.static("public"));

app.use(cookieParser());
app.use(session({ secret: "meow", key: "sid" }))
app.use(passport.initialize());
app.use(passport.session());

// Sets rendering package
app.engine("handlebars", exphbs({ defualtLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
require("./config/passport")(app, passport)
require("./routes/htmlRoutes.js")(app, passport);
require("./routes/apiRoutes.js")(app, passport);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({}).then(() => {
	app.listen(PORT, () => {
		console.log("App listening on port " + PORT);
	});
});

