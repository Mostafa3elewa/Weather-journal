// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
// url and api key for weather map to get weather information
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "&appid=fbc19f26dbca8b238285b1d21369c357";

// function to post data to server side

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "post",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(`error is ${error}`);
  }
};

// function to get weather information from externel api (weather map api)

const getWeather = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + key);
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    // appropriately handle the error
  }
};

// Function to update UI with the information that w eget from client and the weather from api

const updateUi = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = newDate;
    document.getElementById("temp").innerHTML =
      allData[allData.length - 1].temp;
    document.getElementById("content").innerHTML =
      allData[allData.length - 1].feelings;
  } catch (error) {
    console.log("error", error);
  }
};

//  get data entered by the user so we can use it

const generateWeather = (e) => {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  // get information from weather map then add it to the server then updaten the UI

  getWeather(baseURL, zipCode, apiKey)
    .then((data) => {
      //console.log(data);
      postData("/addWeather", {
        temp: data.main.temp,
        feelings: feelings,
      });
    })
    .then(updateUi);
};

// handle the click of user so we can retrieve the data that the user enter

document.getElementById("generate").addEventListener("click", generateWeather);
