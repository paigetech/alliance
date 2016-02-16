var Thing = require('./models/thing');  // load the thing mongoose model - change as needed
var User = require('./models/user');  // load the User mongoose model for passport.js authentication
var Character = require('./models/character');

module.exports = function(app, passport) {
  // api ---------------------------------------------------------------------
  // create thing
  app.post('/api/things', function(req, res) {
          console.log('req body: ' + JSON.stringify(req.body));
    Thing.create({
                  title : req.body.title,
                  author : req.body.author,
                  body : req.body.body,
                  hidden : req.body.hidden,
                  user : req.body.user
    }, function(err, thing) {
      if (err) {
        res.send(err);
      }
      res.json(thing);
    });
  });

  // get all things
  app.get('/api/things', function(req, res) {
    // use mongoose to get all things from the db
    Thing.find(function(err, things) {
      // if err, send it
      if (err) {
        res.send(err);
      }
      res.json(things);
    });
  });

  // get thing by parameters
  app.get('/api/things/:value', function(req, res) {
    // use mongoose to get all the things using a paramater
    Thing.find({ user: req.params.value }, function(err, things) {
      // if err, send it
      if (err) {
        res.send(err);
      }
      res.json(things);
    });
  });

  // get thing by id
  app.get('/api/thing/:id', function(req, res) {
    // use mongoose to find the thing by id requested
    Thing.findById(req.params.id, function(err, thing) {
      if(err) {
        res.send(err);
      }
      res.json(thing);
                        console.log("Thing from routes: " + thing);
    });
  });

  // update a thing by id
  app.post('/api/thing/:id', function(req, res) {
    Thing.findById(req.params.id, function(err, thing) {
      if(err) {
        res.send(err);
      }
      // TODO make changes to thing
                        console.log("thing " + JSON.stringify(req.body));

                        if (thing) {
                          //update thing properties with request
                          thing.title = req.body.title;
                          thing.author = req.body.author;
                          thing.body = req.body.body;
                          thing.date = req.body.date;
                          thing.hidden = req.body.hidden;

                          thing.save(function (err) {
                                  if (err) {
                                          res.send(err);
                                  }
                                  res.json(thing);
                          });
                        } else {
                          console.log("no thing!");
                        };
    });
  });

  // delete a thing by id
  app.delete('/api/thing/:id', function(req, res) {
    Thing.remove({
      _id : req.params.id
    },
    function(err, thing) {
      if (err) {
        res.send(err);
      }
      res.send();
    });
  });

  // process the login form
  // Express Route with passport authentication and custom callback
  app.post('/api/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (user === false) {
        res.status(401).send(req.flash('loginMessage'));
      } else {
        req.login(user, function(err) {
          if (err) {
            res.status(500).send("There has been an error");
          } else {
            res.status(200).send("success!");
          }
        });
      }
    })(req, res, next);
  });

  // process the signup form
  // Express Route with passport authentication and custom callback
  app.post('/api/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (user === false) {
        res.status(401).send(req.flash('signupMessage'));
      } else {
        res.status(200).send("success!");
      }
    })(req, res, next);
  });

  // check if the user is logged in an retrieve a different user obj based on the status
  app.get('/loggedin', function(req, res) {
    var user = {};
    if (req.isAuthenticated()) {
      user.isLoggedIn = true;
      user.email = req.user.local.email;
      user.admin = req.user.local.admin;
      user.notes = req.user.local.notes;
    } else {
      user.isLoggedIn = false;
      user.email = undefined;
    }
    res.json(user);
  });

  // log the user out and redirect to /
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // character
  app.post('/api/character', function(req, res) {
          console.log('req body: ' + JSON.stringify(req.body));
    Character.create({
      user: req.body.user,
      characterName: req.body.characterName,
      races: req.body.races,
      pcClass: req.body.pcClass,
      weaponSkills: req.body.weaponSkills,
      earth: req.body.earth,
      celestial: req.body.celestial,
      weapons: req.body.weapons,
      scholarSkills: req.body.scholarSkills,
      crafts: req.body.crafts,
      racials: req.body.racials
    }, function(err, character) {
      if (err) {
        res.send(err);
      }
      res.json(character);
    });
  });

  // get character by parameters
  app.get('/api/characters/:value', function(req, res) {
    // use mongoose to get all the things using a paramater
    Character.find({ user: req.params.value }, function(err, characters) {
      // if err, send it
      if (err) {
        res.send(err);
      }
      res.json(characters);
    });
  });

  // get character by id
  app.get('/api/character/:id', function(req, res) {
    // use mongoose to find the character by id requested
    Character.findById(req.params.id, function(err, character) {
      if(err) {
        res.send(err);
      } else {
      res.json(character);
      }
    });
  });

  // update a character by id
  app.post('/api/character/:id', function(req, res) {
    Character.findById(req.params.id, function(err, build) {
      if(err) {
        res.send(err);
      }

        if (build) {
          //update character properties with request
          build.user = req.body.user;
          build.characterName = req.body.characterName;
          build.races = req.body.races;
          build.pcClass = req.body.pcClass;
          build.weaponSkills = req.body.weaponSkills;
          build.earth = req.body.earth;
          build.celestial = req.body.celestial;
          build.weapons = req.body.weapons;
          build.scholarSkills = req.body.scholarSkills;
          build.crafts = req.body.crafts;
          build.racials = req.body.racials

          Character.update({ _id: req.params.id }, build, function (err, affected) {
                  if (err) {
                          res.send(err);
                  }
                  res.json('affected rows %d', affected);
          });
        } else {
          console.log("no character!");
        };
    });
  });

  // delete a character by id
  app.delete('/api/character/:id', function(req, res) {
    Character.remove({
      _id : req.params.id
    },
    function(err, character) {
      if (err) {
        res.send(err);
      }
      res.send();
    });
  });
};
