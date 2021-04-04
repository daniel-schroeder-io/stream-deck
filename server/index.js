var TwitchAuthClient = require('./utils/TwitchAuth');
var express        = require('express');
var session        = require('express-session');
var passport       = require('passport');
var twitchStrategy = require('passport-twitch-new').Strategy;
const cors = require('cors');
const serveStatic = require("serve-static")

require('dotenv').config();

var path = __dirname + '/public/'; // this folder should contain your html files.

// Define our constants, you will change these with your own
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_SECRET    = process.env.TWITCH_CLIENT_SECRET;
const SESSION_SECRET   = '69696969';
const CALLBACK_URL     = 'http://localhost:3000/auth/twitch/callback';  // You can run locally with - http://localhost:3000/auth/twitch/callback

// Initialize Express and middlewares
var app = express(); 
app.use(session({secret: SESSION_SECRET, resave: false, saveUninitialized: false}));
//app.use(express.static('/public'));
app.use(serveStatic(path.join(__dirname, 'dist')));
const twitchAuthClient = new TwitchAuthClient();
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({origin: true, credentials: true})); 

 

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new twitchStrategy({
    clientID: TWITCH_CLIENT_ID,
    clientSecret: TWITCH_SECRET,
    callbackURL: CALLBACK_URL,
    scope: "user_read"
  },
  function(accessToken, refreshToken, profile, done) {
      profile.accessToken = accessToken;
      profile.refreshToken = refreshToken;
      // Securely store user profile in your DB
      //User.findOrCreate(..., function(err, user) {
      //  done(err, user);
      //});
      done(null, profile);
  } 
)); 

// Set route to start OAuth link, this is where you define scopes to request
app.get("/auth/twitch", passport.authenticate("twitch"));

// Set route for OAuth redirect
app.get("/auth/twitch/callback", passport.authenticate("twitch", { failureRedirect: "/" }), function(req, res) {
  // Successful authentication, redirect home.
  console.log('wqewwewe')
  console.log(req.session)
  console.log(req.session.passport.user)
  res.redirect("http://localhost:8080/About");
});



// If user has an authenticated session, display it, otherwise display link to authenticate
app.get('/', function (req, res) {
  if(req.session && req.session.passport && req.session.passport.user) {
    twitchAuthClient.validateToken(req.session.passport.user.accessToken, (err, payload) => {
      if (err || !payload || !payload.user_id) { 
        this.start();
        return;
      } 
      res.send(`Hello, ${req.session.passport.user.display_name}!`);
    });
    
  } else {
    res.sendFile(path+'/login.html');
  }
});

app.get('/user', function (req, res) {
    console.log('here')
    console.log(req.session)
    console.log(req.session.passport.user)
    if(req.session && req.session.passport && req.session.passport.user) {
      twitchAuthClient.validateToken(req.session.passport.user.accessToken, (err, payload) => {
        if (err || !payload || !payload.user_id) { 
          this.start();
          return;
        } 
        console.log('here1')
        res.json(req.session.passport.user);
      });
      
    } else {
        console.log('here2')
        res.json({}) 
    }
  });

app.listen(3000, function () {
  console.log('Twitch auth sample listening on port 3000!')
});
