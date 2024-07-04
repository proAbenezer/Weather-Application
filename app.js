const axios = require("axios");

const apiKey = `444a8fc41ebb6d9653e96e0dbdf62866`;
const cityName = "Adaba";
const stateCode = "";
const countryCode = "ET";
const limit = 1;
const weatherLocationURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`;

async function getWeatherData() {
  const location = await axios
    .get(weatherLocationURL)
    .then((res) => {
      const reponse = res.data;

      return { lat: reponse[0].lat, lon: reponse[0].lon };
    })
    .catch((err) => console.log(`ERROR:  ${err})`));
  const { lat, lon } = location;
  console.log(lat, lon);
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const Weather = axios
    .get(weatherURL)
    .then((res) => {
      const reponse = res.data;
      console.log(reponse);
    })
    .catch((err) => console.log(`ERROR ${err}`));
}

getWeatherData();
