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
console.log(env);


const app = express();
const port = process.env.SERVER_PORT;
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(__dirname + '/../build'))

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


  db.findUser(["" + profile.identities[0].user_id])
    .then(user => {

      if (user[0]) {
        console.log("user found");
        return done(null, { users_id: user[0].users_id });
      }
      else {
        console.log(profile);

        let given_name = '';
        let family_name = '';
        if (profile.given_name){
          given_name = profile.given_name;
          console.log("NAME FROM profile.given_name")

        } 
        else if (profile.name.givenName){
          given_name= profile.name.givenName;
          console.log("NAME from profile.name.givenName")

        } 

        if (profile.family_name) family_name = profile.family_name;
        else if (profile.name.familyName ) family_name = profile.name.familyName;
        let email = '';
        if (profile && profile.emails) {
               if (profile.emails[0]) email = profile.emails[0].value;
          }
        if (!email && profile.email) email = profile.email;

      

        /* username, email,first_name,last_name,auth_id */

console.log(`
profile ${profile} displayName ${profile.displayName}, email ${email}, given ${given_name}, family ${family_name}, user_id ${profile.identities[0].user_id}
`)
        db.createUser([profile.displayName, email, given_name, family_name, "" + profile.identities[0].user_id])
          .then(user => { return done(null, { users_id: user[0].users_id }) })
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
  console.log("SERIALIZING");
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  app.get('db').findSessionUser([obj.users_id])
    .then(user => { return done(null, user[0]); })
    .catch(err=>console.log(err))
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
  res.redirect(302,  process.env.REACT_APP_HOST + '/')
})




app.get('/api/posts',  CTRL.getPosts);
app.get('/api/post/:postId',CTRL.getPost);

app.get('/api/event/:eventId',CTRL.getEvent);
app.post('/api/event',CTRL.addEvent);
app.get('/api/events', CTRL.getEvents);

app.get('/api/eventpage/:limit/:page',CTRL.getEventPage);
app.get('/api/address', CTRL.getAddress);

app.get('/api/dashboard/events/:users_id', CTRL.getUsersEvents);
app.get('/api/dashboard/posts/:users_id', CTRL.getUsersPosts);

app.post('/api/dashboard/account/:users_id', CTRL.editAccount);


/* End points for NewsLetter Subscriptions */

/* api/subscriber GET -> return subscriber emails */
app.get('/api/subscriber',cors(corsOptions),CTRL.getSubscribers);

/* api/subscriber POST -> add new subscriber */
app.post('/api/subscriber',CTRL.addSubscriber);

/* api/subscriber/:subscriberID remove Subscriber */
app.delete('/api/subscriber/:subscriberEmail',cors(corsOptions),CTRL.removeSubscriber);




/* END of End points for NewsLetter Subscriptions */

app.post('/api/upload',(req, res) => {
  console.log(req.body);
  imageUpload.sendPics(req.body.pic, (data, err) => {
    if (err) {
      console.log("IMAGE UPLOAD ERRROR")
      console.log(err);
      res.status(500).end();
    }
  
    req.app.get('db').storeImage([data])
    res.status(200).send(data);
  })
})


/* END ENDPOINTS */
app.get('*', (req,res)=>{
  req.sendFile(path.join(__dirname, '../build/index.html'))
})


app.listen(port, () => console.log(`listening on port ${port}`))
