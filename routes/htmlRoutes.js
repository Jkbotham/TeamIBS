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

	  app.get("/idea/:id", function(req, res){
		db.Idea.findAll({
			where: {id: req.params.id}
			// ,
			// include: [{
			// 	model: db.Comment
			// 	, 
			// 	where: {IdeaId: req.params.id}
			// }]
		})
		.then(function(results){
			db.Comment.findAll({
				where: {IdeaId: req.params.id}
			}).then(function(aResults){
		;
				results.comments = aResults
				console.log(results, "11111111111111111111111111111111111111")

				console.log(aResults, "2222222222222222222222222222222222222")
			})
			// res.render("idea",{idea: results})
			// console.log(JSON.stringify(results.Comments))
		})
	})

	// Render 404 page for any unmatched routes
	app.get("*", function(req, res) {
		res.render("404");
	});

};
