const db = require("../models");

module.exports = (app) => {

	// Load index page
	app.get("/", (req, res) => {
		db.Idea.findAll({
			include: [db.Comment],
			order: [['id', 'DESC']]
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

		const idea = db.Idea.findOne({
			where: {
				id: reqId
			}})
		const comments = db.Comment.findAll({
			where: {
				ideaId: reqId
			}
		})
		Promise.all([idea,comments])
			.then(results => {
				// console.log(JSON.stringify(results));
				const obj = {
					idea: results[0],
					comments: results[1]
				}
				console.log(JSON.stringify(results[1]));
				res.render("idea", { idea: obj });
				

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
