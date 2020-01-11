const db = require("../models");


module.exports = (app, passport) => {

	// Load index page
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
			// Promise.all([id, commentCount])
			.then(results => {
				console.log(JSON.stringify(results))
				res.render("index", { idea: results, user: req.user })
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
			}
		})
		const comments = db.Comment.findAll({
			where: {
				ideaId: reqId
			}
		})
		Promise.all([idea, comments])
			.then(results => {
				// console.log(JSON.stringify(results));
				// console.log(JSON.stringify(results[1]));
				res.render("idea", { idea: results[0], comments: results[1] });
			})
			.catch(err => {
				console.log(err)
			})
	});

	app.get("/submit", (req, res) => {
		res.render("submit")
	})

	app.get("/html")



	app.get("/login", (req, res) => {
		res.render('login', { user: req.user })
	});

	app.get("/profile", ensureAuthenticated, (req, res) => {
		db.User.findOne({
			where: {
				user_id: req.user
			}
		})
		.then((results) => {
			console.log(results)

		 let user = db.Idea.findAll({
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
			}
		})
		
		
		Promise.all([user,comments])
			.then((Result) => {
			console.log("Test:  ",Result, results)
		})


		})
		
		// .then((results) => {
		// 	console.log("Test: "+JSON.stringify(results))
		// 	res.render("profile", { user: results[0] })

		// })
	
	})

	app.get("/auth/facebook", passport.authenticate("facebook", {
		scope: ["public_profile"]
	}))

	app.get("/auth/facebook/callback", passport.authenticate("facebook", {
		successRedirect: "/profile",
		failureRedirect: "/login"
	}),
		function (req, res) {
			console.log(JSON.stringify(req.user))
			// res.redirect("profile", {user: req.user})
		}
	);

	app.get("/logout", (req, res) => {
		req.logout()
		res.redirect("/")
	});
	// Render 404 page for any unmatched routes
	app.get("*", (req, res) => {
		res.render("404");
	});

	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) { return next(); }
		res.redirect('/login');
	}

	app.get("/best", (req, res) => {
		res.render("index", {idea: results, comments: results})
	})


}


// Count of comments from one user
// Count of ideas from one user



