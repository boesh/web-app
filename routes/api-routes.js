
const adminsdb = require("../models/admin");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const models = require("../models/models.js")


module.exports = function(app) {
  
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    
  });

  

  app.post("/api/adduser", function(req, res) {
    models.User.findOne({where: {email: req.body.email}})
    .then(user => {
      if(!user)
      {
        models.User.create({name: req.body.name,
           email: req.body.email, city: req.body.city})
        .then(createdUser => {
          res.json(createdUser.id)
        })
      }
      else {
        res.json(user.id)
      }
    })
  })

 

  app.post("/api/admin/deleteuser", function(req, res) {
    models.User.destroy({where: {id: req.body.userId}})
    .then(destroyedRows => {
      res.json(destroyedRows)
    })
  })

  app.post("/api/addorder", function(req, res) {
    models.Master.findOne({where: {id: req.body.masterId}})
    .then(master => {
      if(!master) res.json(404);
      models.User.findOne({where: {id: req.body.userId}})
      .then(user => {
        if(!user) res.json(404);
        models.Order.findOne({where: {masterId: req.body.masterId,
           date: req.body.date}})
        .then(order => {
          if(!order) {
          models.Order.create({date: req.body.date, 
            watchsize: req.body.watchsize, userId: req.body.userId,
             masterId: req.body.masterId})
          .then(order => res.json(order))
          }
          else {
            res.json(order)
          }
        })
      })
    })
  });

  app.post("/api/confirmorder", function(req, res) {
    models.Order.findOne({where: {id: req.body.orderId, confirmed: false}})
    .then(order => {
      if(!order) res.json(404)
      order.update({confirmed: true})
      res.json(order.id)
    })
  });

  app.post("/api/admin/addcity", function(req, res) {
    models.City.findOrCreate({ where: {name: req.body.name}})
    .then((model, modelHasBeenCreated) => {
      res.json(model)
    })
  });

  app.post("/api/admin/deletecity", function(req, res) {
    models.City.destroy({where: {name: req.body.name}})
    .then(destroyedRows => {
      res.json(destroyedRows)
    })
  });

  app.post("/api/admin/addmaster", function(req, res) {
    models.Master.findOne({where: {email: req.body.email}})
    .then(master => {
    if(!master) {
      models.Master.create({name: req.body.name,
          email: req.body.email, rating: req.body.rating})
      .then(mas => {
        for (city of req.body.cities)
        {
          mas.addCity(city)
        }
        res.json(mas.id)
      })
    }
    else {
      res.json(master.id)
    }})
  })


  app.post("/api/admin/deletemaster", function(req, res) {
    master.Master.destroy({where: {id: req.body.masterId}})
    .then(destroyedRows => {
      res.json(destroyedRows)
    })
  });


  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    adminsdb.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({});
    }
    else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};