// Setup empty JS object to act as endpoint for all routes
let projectData = [];

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static("website"));

// get to home page and send data

app.get("/", (req, res) => {
  res.send(projectData);
});

// add data from the client side and the weather map to server side

app.post("/addWeather", (req, res) => {
  newDataEntry = {
    temp: req.body.temp,
    feelings: req.body.feelings,
  };
  projectData.push(newDataEntry);
  res.send(projectData);
});

//send data to client side so we udate the ui

app.get("/all", (req, res) => {
  res.send(projectData);
});

// Setup Server
port = 5000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
