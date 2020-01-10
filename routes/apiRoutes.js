let db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/ideas", function (req, res) {
    db.Idea.findAll({}).then(function () { });
  });

  // Creates new Idea
  app.post("/api/newIdea", function (req, res) {
    console.log(req.body);
    db.Idea.create({
      title: req.body.title,
      body: req.body.body,
      points: 0
    }).then(function (results) {
      res.end();
    });
  });

  // Creates new comment on an idea and updates Vote Points of the Idea
  app.post("/api/newComment", function (req, res) {
    db.Comment.create({
      body: req.body.body,
      IdeaId: req.body.ideaID
    });

    if (req.body.vote) {
      req.body.points++;
    } else {
      req.body.points--;
    }

    db.Idea.update({ points: req.body.points }, {
      where: {
        id: req.body.ideaID
      }
    }).then(function () {
      res.end();
    });
  });

  app.post("/api/delete", function (req, res) {
    db.Idea.destroy({
      where: {
        id: req.body.id
      }
    }).then(function () {
      res.end();
    });
  });
};
