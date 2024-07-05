const axios = require("axios");

async function getWeatherData(cityName, stateCode, countryCode, limit, apiKey) {
  const weatherLocationURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`;
  const location = await axios
    .get(weatherLocationURL)
    .then((res) => {
      const reponse = res.data;
      if (reponse.length === 0) {
        throw new Error("Invalid location");
      }

      /*       if (lat !== null) {
        return { lat: reponse[0].lat, lon: reponse[0].lon };
      } else {
        console.log(
          `ERROR: can't get the Latitude and Longitude of Your Location:  ${cityName}`
        );
      } */
      return { lat: reponse[0].lat, lon: reponse[0].lon };
    })
    .catch((err) => console.log(`FAILD:  ${err}`));
  const { lat, lon } = location;
  console.log(
    `The latitude: ${lat} and the Longitude: ${lon} of your Location: ${cityName}`
  );
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const weatherData = await axios
    .get(weatherURL)
    .then((res) => {
      const response = res.data;
      return response;
    })
    .catch((err) => console.log(`ERROR ${err}`));
  return weatherData;
}

module.exports.getWeatherData = getWeatherData;
