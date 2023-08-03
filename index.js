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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  const date = req.params.date;
  console.log("Req[", date, "]");
  
  if (date === undefined) {
    const now = new Date();
    const utcTimestamp = now.toUTCString();
    const unixTimestamp = now.getTime();

    res.json({ utc: utcTimestamp, unix: unixTimestamp });
  } 
  else if (date.includes("-")) {
    const dates = date.split("-"); 
    if (dates.length === 3) {
      const year = parseInt(dates[0]);
      const monthIndex = parseInt(dates[1]) - 1;
      const day = parseInt(dates[2]);

      const utcTimestamp = new Date(year, monthIndex, day).toUTCString();
      const unixTimestamp = new Date(year, monthIndex, day).getTime();
      res.json({ unix: unixTimestamp, utc: utcTimestamp });
    }
    else{
          res.json({ error: 'Invalid Date' });
    }
  } 
  else {
     
    if (!isNaN(date)) {
      
      const timestamp = parseInt(date);
      const singleDate = new Date(timestamp);
      const unixTimestamp = singleDate.getTime();
      res.json({ unix: unixTimestamp, utc: singleDate.toUTCString() });
    } else {
       let dateS;
      try {
        dateS = new Date(date);
        if (!isNaN(dateS)) {
          const unixTimestamp = dateS.getTime();
          res.json({ unix: unixTimestamp, utc: dateS.toUTCString() });
          return
        } else {
          res.json({ error: 'Invalid Date' });
          return
        }
      } catch (error) {
        
      }
      res.json({ error: 'Invalid Date' });
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
