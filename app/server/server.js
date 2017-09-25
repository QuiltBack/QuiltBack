const express = require('express'),
massive = require('massive'),
cors = require('cors'),
bodyParser = require('body-parser'),
session = require('express-session'),
path = require('path');


const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());


app.listen(port, () => console.log("I'm lookin at you!"))