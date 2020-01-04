var db = require("../models");

module.exports = function(app) {

	// Load index page
	app.get("/", function (req, res) {
		db.Idea.findAll({
			include: [db.Comment]
		}).then(function(results){
			res.render("index",{idea: results})
		})
	  });

	// Render 404 page for any unmatched routes
	app.get("*", function(req, res) {
		res.render("404");
	});
};
