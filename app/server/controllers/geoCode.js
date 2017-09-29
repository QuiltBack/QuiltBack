var geocoder = requier('node-geocoder');
    env = require('dotenv').config({ path: './server/config/.env' });



var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GOOGLE_API_KEY,
    formatter: null
}

var geocoder = geocoder(options);

geocoder.geocode('')
.then(function(res) {
  console.log(res);
})
.catch(function(err) {
  console.log(err);
});

