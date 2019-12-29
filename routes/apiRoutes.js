var db = require("../models");

module.exports = function (app) {
	// Get all examples
	app.get("/api/ideas", function (req, res) {
		db.Idea.findAll({}).then(function (result) {
			// res.json(result);
			console.log(JSON.stringify(results))
		});
	});


	app.post("/api/newIdea", function (req, res) {
		db.Idea.create({
			title: req.body.title,
			body: req.body.body,
			points: 0
		}).then(function (results) {
			res.end();
		})
	});

	app.post("/api/newComment", function (req, res) {
		console.log(req.body.points)
		db.Comment.create({
			body: req.body.body,
			IdeaId: req.body.ideaID
		})

		if (req.body.vote) {
			req.body.points++
		} else {
			req.body.points--
		}

		db.Idea.update({ points: req.body.points }, {
			where: {
				id: req.body.ideaID
			}
		}).then(function () {
			res.end();
		})

		console.log(req.body.points)
	})
}
