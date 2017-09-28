const express = require('express'),
  massive = require('massive'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  CTRL = require('./controllers/controller.js')
passport = require('passport'),
  Auth0Strategy = require('passport-auth0'),
  env = require('dotenv').config({ path: './server/config/.env' }),
  imageUpload = require('./controllers/imageUpload'),
  path = require('path');



const app = express();
const port = process.env.SERVER_PORT;
app.use(cors());
app.use(bodyParser.json());

/* CorsOptions change this when production rolls */
/* I think this is needed when backend and front end running on different ports */
/* use cors(corsOptions) as middleware where authentication is needed - except auth/me */
const corsOptions = {
  origin: function (origin, callback) {
    if (true) {
      console.log("origin is " + origin);
      callback(null, true);
    }
    else callback(new Error("Not Allowed by CORS"));

  },
  credentials: true
}
/* END corsOptions */



/* Initialize Massive */
massive({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,

}, { scripts: __dirname + '/db' })
  .then(db => {

    app.set('db', db);

  });

/* END Initialize Massive */

app.use(bodyParser.json());

/* Setup Session Defaults and secret key */

app.use(session({
  secret: process.env.SERVER_SECRET,
  resave: false,
  saveUninitialized: false
}));

/* END Session Defaults and secret key */


/* React Front End created with npm run build */

app.use(express.static(__dirname + '/..build'));

/* END React Front End  */

/* Passport Configuration */

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Auth0Strategy({
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_CLIENT_ID,
  clientSecret: process.env.AUTH_CLIENT_SECRET,
  callbackURL: process.env.AUTH_CALLBACK
}, function (accessToken, refreshToken, extraParams, profile, done) {
  const db = app.get('db');
  let email = '';
  if (profile && profile.emails) {
    if (profile.emails[0]) email = profile.emails[0].value;
  }
  if (!email && profile.email) email = profile.email;


  db.findUser(["" + profile.identities[0].user_id])
    .then(user => {

      if (user[0]) {
        console.log("user found");
        return done(null, { id: user[0].id });
      }
      else {
        console.log(profile);

        let given_name = '';
        let family_name = '';
        if (profile.name && profile.name.givenName) given_name = profile.name.givenName;
        if (profile.name && profile.name.familyName) given_name = profile.name.familyName;


        /* username, email,first_name,last_name,auth_id */


        db.createUser([profile.displayName, email, profile.given_name, profile.family_name, "" + profile.identities[0].user_id])
          .then(user => { return done(null, { id: user[0].id }) })
          .catch(err => { console.log("CREATE USER ERROR"); console.log(err); });
      }
    })
    .catch(err => { console.log("DB QUERY ERROR"); console.log(err) });

}));

app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: process.env.AUTH_SUCESS,
  failurRedirect: process.env.AUTH_FAILURE
}));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  app.get('db').findSessionUser([obj.id])
    .then(user => { return done(null, user[0]); })
});




/* ENDPOINTS */

/* HERE we may need cors(corsOptions) */
app.get('/auth/me', cors(corsOptions), (req, res, next) => {
  if (!req.user) {
    console.log("user not found");
    res.status(404).send('User not found');
  }
  else {
    console.log("USER FOUND");
    res.status(200).send(req.user);
  }
});

app.get('/auth', (req, res, next) => {
  console.log("start authentication");
  next();
}, passport.authenticate('auth0'));


app.get('/auth/logout', (req, res) => {
  req.logOut();
  res.redirect(302, 'http://localhost:' + process.env.SERVER_FRONTEND_PORT)
})




app.get('/api/posts', CTRL.getPosts);




app.get('/api/events', CTRL.getEvents);


app.post('/api/upload', cors(corsOptions),(req, res) => {
  console.log(req.body);
  imageUpload.sendPics(req.body.pic, (data, err) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    }
    console.log(data)
    req.app.get('db').storeImage([data])
    res.status(200).end()
  })
})


/* END ENDPOINTS */



app.listen(port, () => console.log(`listening on port ${port}`))
