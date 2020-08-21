// Setup empty JS object to act as endpoint for all routes
let projectData = [];

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static("website"));

// get to home page and send data

app.get("/", (req, res) => {
  res.send(projectData);
  //console.log(projectData);
});

app.post("/addWeather", (req, res) => {
  //console.log(req.body);
  newDataEntry = {
    temp: req.body.temp,
    feelings: req.body.feelings,
  };
  //console.log(newDataEntry);
  projectData.push(newDataEntry);
  res.send(projectData);
  // console.log(projectData);
});

app.get("/all", (req, res) => {
  console.log(projectData);
  res.send(projectData);
  return projectData;
});

// Setup Server
port = 5000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
