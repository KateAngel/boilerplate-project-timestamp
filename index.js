// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api',(req,res)=>{
  let timestamp = getTimestamp(new Date());
  res.json(timestamp);
});

const getTimestamp = date => ({
  unix: date.getTime(),
  utc: date.toUTCString()
});

// your first API endpoint... 
app.get("/api/:date?", (req, res) => {
  const date = req.params.date;
  console.log(date);
  let timestamp = {};
  const unixCheck = date * 1;
  let newDate = isNaN(unixCheck) ? new Date(date) : new Date(unixCheck);

  if (!isNaN(newDate.getTime())) {
    timestamp = getTimestamp(newDate);
    console.log(timestamp);
  } else {
    timestamp = { error: "invalid Date" };

  }

  res.json(timestamp);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port http://localhost:' + listener.address().port);
});
