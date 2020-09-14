const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const User = require('../models/user')

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
})

//  Use Strategies 
passport.use(LocalStrategy)

module.exports = passport