const prompt = require("prompt-sync")();
const { getWeatherData } = require("./getWeatherData.js");

require("dotenv").config();

const apiKey = process.env.API_KEY;

const stateCode = "";
const limit = 1;

console.log("Welcome to Weather App");
console.log(
  "Please Enter the following information to see the weather condition in your area:"
);

let cityName = prompt("City Name: ").trim();
while (!cityName) {
  cityName = prompt(
    "City Name cannot be empty. Please enter City Name: "
  ).trim();
}

let countryCode = prompt("Country Code (2 letters, e.g., US): ")
  .toUpperCase()
  .trim();
while (!countryCode || countryCode.length !== 2) {
  countryCode = prompt(
    "Country Code is invalid. Please enter a valid 2-letter Country Code: "
  )
    .toUpperCase()
    .trim();
}

getWeatherData(cityName, stateCode, countryCode, limit, apiKey)
  .then((weatherData) => {
    if (weatherData) {
      console.log("Weather Data:");
      console.log(`Temperature: ${weatherData.main.temp}K`);
      console.log(`Humidity: ${weatherData.main.humidity}%`);
      console.log(`Wind Speed: ${weatherData.wind.speed}m/s`);
      console.log(`Description: ${weatherData.weather[0].description}`);
    }
  })
  .catch((err) => {
    console.error("Error fetching weather data:", err);
  });
