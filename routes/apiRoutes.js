const db = require("../models");

module.exports = (app) => {
	// Get all examples
	app.get("/api/ideas", (req, res) => {
		db.Idea.findAll({})
	})

	// Creates new Idea
	app.post("/api/newIdea", (req, res) => {
		console.log(req.body)
		db.Idea.create({
			title: req.body.title,
			body: req.body.body,
			points: 0
		}).then(results => {
			res.end();
		})
			.catch(err => {
				console.log(err)
			})
	});

	// Creates new comment on an idea and updates Vote Points of the Idea
	app.post("/api/newComment", (req, res) => {
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
		})
			.then(() => {
				res.end();
			})
			.catch(err => {
				console.log(err)
			})
	});

	app.post("/api/delete", (req, res) => {
		db.Idea.destroy({
			where: {
				id: req.body.id
			}
		}).then(() => {
			res.end();
		})
	});
}
