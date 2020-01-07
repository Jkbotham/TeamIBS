const db = require("../models");

module.exports = (app) => {

	// Load index page
	app.get("/", (req, res) => {
		db.Idea.findAll({
			include: [db.Comment]
		})
			.then(results => {
				console.log(JSON.stringify(results))
				res.render("index", { idea: results })
			})
			.catch(err => {
				console.log(err)
			})
	});

	// load idea page
	app.get("/idea/:id", (req, res) => {
		const reqId = req.params.id

		db.Idea.findAll({
			where: {
				id: reqId
			},
			include: [{
				model: db.Comment,
				where: {
					IdeaId: reqId
				}
			}]
		})
			.then(results => {
				console.log(JSON.stringify(results));

				//This needs to change once handlebars page is complete
				//-----------------------------------
				res.render("index", { idea: results });
				//-----------------------------------

			})
			.catch(err => {
				console.log(err)
			})
	});

	app.get("/submit", (req, res) => {
		res.render("submit")
	})

	app.get("/html")

	// Render 404 page for any unmatched routes
	app.get("*", (req, res) => {
		res.render("404");
	});

};
