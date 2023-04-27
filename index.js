const weatherUrl = "https://api.openweathermap.org/data/2.5/weather"
const apiKey = "5b2e7abcace088ef05fea9afddc76b8c";

const getWeather = async () => {
  const weatherArea = document.getElementById("weather-area");

  try {
    const cityName = document.getElementById("text-inp").value;
    const url = `${weatherUrl}?q=${cityName}&appid=${apiKey}`;
    console.log(" URL : "+url);
    const response = await fetch(url);

    // console.log(response.status);
    if (response.status === 200) {
      const data = await response.json();
      const main = data.main;
      const coord = data.coord;
      console.log("Response : "+response.text);
      const divElement = document.createElement('div');
      divElement.classList.add('weather-div');

      divElement.innerText = `Humidity - ${main.humidity}
        Temp Min - ${main.temp_min}
        Temp Max - ${main.temp_max}
        Feels Like - ${main.feels_like}
        Latitude - ${coord.lat}
        Longitude - ${coord.lon}
      `
      if (main.temp < 300) {
        divElement.classList.add('bg-success');
      } else if (main.temp >= 300 && main.temp < 310) {
        divElement.classList.add('bg-warning');
      } else divElement.classList.add('bg-danger');

      weatherArea.innerHTML = "";

      weatherArea.append(divElement);
    } else {
      const data = await response.json();
      const spanElement = document.createElement('span');
      spanElement.innerText = data.message;
      spanElement.classList.add('bg-danger');
      weatherArea.innerHTML = '';
      weatherArea.append(spanElement);
    }
  } catch (err) {
    const spanElement = document.createElement('span');
    spanElement.innerText = "Something Went Wrong";
    spanElement.classList.add('bg-danger');
    weatherArea.append(spanElement);
  }
}

// Immediately Invoked Functions Expression
(function () {
  console.log("I am IIFE")
})();