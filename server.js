
// Allows application to run on local host without changing config file
require("dotenv").config();

// Defines packages being used
const express = require("express");
const db = require("./models");
const exphbs = require("express-handlebars");

// Calls express -- Sets port
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets folder to be avail to clients
app.use(express.static("public"));

// Sets rendering package
app.engine("handlebars", exphbs({ defualtLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({}).then(() => {
	app.listen(PORT, () => {
		console.log("App listening on port " + PORT);
	});
});

