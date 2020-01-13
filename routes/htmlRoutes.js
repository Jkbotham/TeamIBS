const db = require("../models");

module.exports = (app, passport) => {

	// Load index page with all ideas in database
	app.get("/", (req, res) => {

		db.Idea.findAll({
			attributes: {
				include: [[db.Sequelize.fn("count", db.Sequelize.col("Comments.id")), "commentCount"]]
			},
			include: [{
				model: db.Comment, attributes: []
			}],
			group: ['Idea.id'],
			order: [['id', 'DESC']]
		})
			.then(results => {
				// console.log(JSON.stringify(results))
				res.render("index", { idea: results, user: req.user })
			})
			.catch(err => {
				console.log(err)
			})
	});

	// Gets a specific idea and comments from database and returns Idea page
	app.get("/idea/:id", (req, res) => {
		const reqId = req.params.id

		const idea = db.Idea.findOne({
			where: {
				id: reqId
			}
		})
		const comments = db.Comment.findAll({
			where: {
				ideaId: reqId
			}
		})
		if (req.user) {
			const user = db.User.findOne({
				where: {
					user_id: req.user
				}
			})
			
			Promise.all([idea, comments, user])
				.then(results => {
					res.render("idea", { idea: results[0], comments: results[1], user: results[2] });
				})
				.catch(err => {
					console.log(err)
				})
		} else {
			Promise.all([idea, comments])
				.then(results => {
					// console.log(JSON.stringify(results));
					// console.log(JSON.stringify(results[1]));
					res.render("idea", { idea: results[0], comments: results[1] });
				})
				.catch(err => {
					console.log(err)
				})
		}
	});

	// Load index sorted by highest score
	app.get("/best", (req, res) => {

		db.Idea.findAll({
			attributes: {
				include: [[db.Sequelize.fn("count", db.Sequelize.col("Comments.id")), "commentCount"]]
			},
			include: [{
				model: db.Comment, attributes: []
			}],
			group: ['Idea.id'],
			order: [['points', 'DESC']]
		})
			.then(results => {
				// console.log(JSON.stringify(results))
				res.render("index", { idea: results, user: req.user })
			})
			.catch(err => {
				console.log(err)
			})
	});

	// Sends client submit page // If user is logged in query database and return users unique id
	app.get("/submit", (req, res) => {
		if (req.user) {
			db.User.findOne({
				where: {
					user_id: req.user
				}
			}).then((results) => {
				// console.log("Test: " + JSON.stringify(results))
				res.render("submit", { user: results })
			})
		}
		else {
			res.render("submit")
		}
	})

	//Jump off point for Facebook Auth landing page
	app.get("/login", (req, res) => {
		res.render('login', { user: req.user })
	});

	//Querys database returns the logged ins users ideas and comments -- Returns profle page.
	app.get("/profile", ensureAuthenticated, (req, res) => {
		db.User.findOne({
			where: {
				user_id: req.user
			}
		})
			.then((results) => {
				// console.log(results)
				let ideas = db.Idea.findAll({
					where: {
						UserId: results.id
					},
					attributes: {
						include: [[db.Sequelize.fn("count", db.Sequelize.col("Comments.id")), "commentCount"]]
					},
					include: [{
						model: db.Comment, attributes: []
					}],
					group: ['Idea.id'],
					order: [['id', 'DESC']]
				})

				let comments = db.Comment.findAll({
					where: {
						UserId: results.id
					},
					order: [['id', 'DESC']]
				})
				Promise.all([ideas, comments])
					.then((Result) => {
						// console.log("Test:  ", Result, results)
						res.render("profile", { user: results, ideas: Result[0], comments: Result[1] })
					})
			})
	})

	//Redirects client ot facebook to login with variables to return
	app.get("/auth/facebook", passport.authenticate("facebook", {
		scope: ["public_profile"]
	}))

	//Switch used ot direct a successful login to the userpage or back to login if the auth was unsuccessful
	app.get("/auth/facebook/callback", passport.authenticate("facebook", {
		successRedirect: "/profile",
		failureRedirect: "/index"
	}),
		function (req, res) {
			// console.log(JSON.stringify(req.user))
			// res.redirect("profile", {user: req.user})
		}
	);

	//Logs the client out and ends session
	app.get("/logout", (req, res) => {
		req.logout()
		res.redirect("/")
	});

	// Render 404 page for any unmatched routes
	app.get("*", (req, res) => {
		res.render("404");
	});

	//verifies if client is currently logged if and redirecting to login page if false
	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) { return next(); }
		res.redirect('/login');
	}

	//Returning client with top ideas
	app.get("/best", (req, res) => {
		res.render("index", { idea: results, comments: results })
	});
}