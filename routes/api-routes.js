
const adminsdb = require("../models/admin");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const models = require("../models/models.js")


module.exports = function(app) {
  
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    
  });

  

  app.post("/api/add/user", function(req, res) {
    models.User.findOne({where: {email: req.query.email}})
    .then(user => {
      if(!user)
      {
        models.User.create({name: req.query.name,
           email: req.query.email, city: req.query.city})
        .then(createdUser => {
          res.json(createdUser.id)
        })
      }
      else {
        res.json(user.id)
      }
    })
  })

  app.post("/api/admin/edit/user", function(req, res) {
    models.Master.update({name: req.query.name, city: req.query.city, email: req.query.email},
      {
        where: {
          id: req.query.id
        }
      })
    .then(result => 
      {
        res.json(result)
      })
  });

  app.post("/api/admin/delete/user", function(req, res) {
    models.User.destroy({where: {id: req.query.userId}})
    .then(destroyedRows => {
      res.json(destroyedRows)
    })
  })

  app.post("/api/add/order", function(req, res) {
    models.Master.findOne({where: {id: req.query.masterId}})
    .then(master => {
      if(!master) res.json(404);
      models.User.findOne({where: {id: req.query.userId}})
      .then(user => {
        if(!user) res.json(404);
        models.Order.findOne({where: {masterId: req.query.masterId,
           date: req.query.date}})
        .then(order => {
          if(!order) {
          models.Order.create({date: req.query.date, 
            watchsize: req.query.watchsize, userId: req.query.userId,
             masterId: req.query.masterId})
          .then(order => res.json(order))
          }
          else {
            res.json(order)
          }
        })
      })
    })
  });

  app.post("/api/admin/delete/order", function(req, res) {
    models.Order.destroy({where: {id: req.query.userId}})
    .then(destroyedRows => {
      res.json(destroyedRows)
    })
  })

  app.post("/api/admin/edit/order", function(req, res) {
    models.Master.update({date: req.query.date, watchsize: req.query.watchsize, 
      confirmed: req.query.confirmed, userId: req.query.userId, masterId: req.query.masterId},
      {
        where: {
          id: req.query.id
        }
      })
    .then(result => 
      {
        res.json(result)
      })
  });

  app.post("/api/confirm_order", function(req, res) {
    models.Order.findOne({where: {id: req.query.id, confirmed: false}})
    .then(order => {
      if(!order) res.json(404)
      order.update({confirmed: true})
      res.json(order.id)
    })
  });

  app.post("/api/admin/add/city", function(req, res) {
    models.City.findOrCreate({ where: {name: req.params.name}})
    .then((model, modelHasBeenCreated) => {
      res.json(model)
    })
  });

  app.post("/api/admin/edit/city", function(req, res) {
    models.Master.update({name: req.query.name},
      {
        where: {
          id: req.query.id
        }
      })
    .then(result => 
      {
        res.json(result)
      })
  });

  app.post("/api/admin/delete/city", function(req, res) {
    models.City.destroy({where: {id: req.query.id}})
    .then(destroyedRows => {
      res.json(destroyedRows)
    })
  });

  app.post("/api/admin/add/master", function(req, res) {
    models.Master.findOne({where: {email: req.query.email}})
    .then(master => {
    if(!master) {
      models.Master.create({name: req.query.name,
          email: req.query.email, rating: req.query.rating})
      .then(mas => {
        for (city of req.query.cities)
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

  app.post("/api/admin/edit/master", function(req, res) {
    models.Master.update({name: req.query.name, rating: req.query.rating, email: req.query.email},
      {
        where: {
          id: req.query.id
        }
      })
    .then(result => 
      {
        res.json(result)
      })
  });


  app.post("/api/admin/delete/master", function(req, res) {
    models.Master.destroy({where: {id: req.query.id}})
    .then(destroyedRows => {
      res.json(destroyedRows)
    })
  });

  app.get("/api/masters", function(req, res) {
    models.Master.findAll({limit: req.query.limit, offset: req.query.offset}).then(masters => res.json(masters))
  });

  app.get("/api/admin/users", function(req, res) {
    models.User.findAll({limit: req.query.limit, offset: req.query.offset}).then(users => res.json(users))
  });

  app.get("/api/admin/orders", function(req, res) {
    models.Order.findAll({limit: req.query.limit, offset: req.query.offset}).then(orders => res.json(orders))
  });

  app.get("/api/cities", function(req, res) {
    models.City.findAll({limit: req.query.limit, offset: req.query.offset}).then(cities => res.json(cities))
  });

  app.get("/api/master", function(req, res) {
    models.Master.findOne({where: {id: req.query.id}}).then(master => res.json(master))
  });

  app.get("/api/admin/user", function(req, res) {
    models.User.findOne({where: {id: req.query.id}}).then(user => res.json(user))
  });

  app.get("/api/admin/order", function(req, res) {
    models.Order.findOne({where: {id: req.query.id}}).then(order => res.json(order))
  });

  app.get("/api/city", function(req, res) {
    models.City.findOne({where: {id: req.query.id}}).then(city => res.json(city))
    
  });

  



  app.post("/api/signup", function(req, res) {
    adminsdb.create({
      email: req.query.email,
      password: req.query.password
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