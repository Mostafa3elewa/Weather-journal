/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
console.log(`d=${d}`);
console.log(`newDate=${newDate}`);

let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "&appid=fbc19f26dbca8b238285b1d21369c357";

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

const getWeather = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + key);
  try {
    console.log(res);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    // appropriately handle the error
  }
};

const updateUi = async () => {
  const request = await fetch("/all");
  console.log(request);
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById("date").innerHTML = newDate;
    document.getElementById("temp").innerHTML =
      allData[allData.length - 1].temp;
    document.getElementById("content").innerHTML =
      allData[allData.length - 1].feelings;
  } catch (error) {
    console.log("error", error);
  }
};

const generateWeather = (e) => {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

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

document.getElementById("generate").addEventListener("click", generateWeather);
