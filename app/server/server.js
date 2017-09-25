const express = require('express'),
massive = require('massive'),
cors = require('cors'),
bodyParser = require('body-parser'),
session = require('express-session'),
express=require('express'),
passport=require('passport'),
Auth0Strategy = require('passport-auth0'),
env = require('dotenv).config({
 path:'./config/.env'}),

path = require('path');


const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

/* Initialize Massive */
massive({
host:process.env.POSTGRES_HOST,
port:process.env.POSTGRES_PORT,
user:process.env.POSTGRES_USER,
database:process.env.POSTGRES_DATABASE,
password:process.env.POSTGRES_PASSWORD
})
.then(db=>{abb.set('db',db);
});

/* END Initialize Massive */

app.use(bodyParser.json);

/* Setup Session Defaults and secret key */

app.use(session({
  secret:process.env.SERVER_SECRET,
  resave:false,
  saveUninitialized:false
}));

/* END Session Defaults and secret key */


/* React Front End created with npm run build */

app.use(express.static(__dirname + '/..build'));

/* END React Front End  */

/* Passport Configuration */

app.use(passport.initialize());
app.user(passport.session());
passport.use(new Auth0Strategy({
   domain:process.env.AUTH_DOMAIN
   clientID:process.env.AUTH_CLIENT_ID,
   clientSecret: process.env.AUTH_CLIENT_SECRET,
   callbackURL: process.env.AUTH_CALLBACK
  }, function(accessToken,refreshToken,extraParams,profile,done){
      const db = app.get('db');
      let email='';
      if (profile && profile.emails){
       if (profile.emails[0]) email=profile.emails.value;
      }

      db.find_user("" +profile.identities[0].user_id])
        .then(user=>{
                if (user[0]) return done(null,{id:user[0].id});
                else {
                   db.create_user([profile.displayName,email,profile.picture,"" + profile.identities[0].user_id)
                     .then(user=>{return done(null,{id:user[0].id})});
                    }
:                  })
        .catch(err=>{console.log("DB QUERY ERROR");console.log(err)});
 }));

app.get ('/auth/callback',passport.authenticate('auth0',{
             successRedirect:process.env.AUTH_SUCESS,
             failurRedirect:process.env.AUTH_FAILURE
    }));

passport.serializeUser(function(user,done){
     done(null,user);
});

passport.deserializeUser(function(obj,done){
   app.get('db').find_session_user([obj.id])
      .then(user=>{return done(null,user[0]);})
  });

/* HERE we may need cors(corsOptions)
app.get('/auth/me',(req,res,next)=>{
   if (!req.user){ 
    console.log("user not found");
    res.status(404).send('User not found');
   }
   else{
    console.log("USER FOUND");
    res.status(200).send(req.user);
   }
});

app.get('/auth',(req,res,next)=>{
 next();
},passport.authenticate('auth0'));


 




app.listen(port, () => console.log("I'm lookin at you!"))
