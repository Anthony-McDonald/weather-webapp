async function fetchWeatherInfo(location) {
  try {
    const response = await fetch(
      "https://api.weatherapi.com/v1/current.json?key=43d9009306014ff7953170811242102&q=" +
        locationFormatted(location) +
        "&aqi=no"
    );

    const data = await response.json();
    renderPage(data);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  inputElement = document.getElementById("location-entry");
  fetchWeatherInfo(inputElement.value);

  inputElement.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default action (e.g., form submission)

      handleEnterKeyPressed(inputElement);
    }
  });

  function handleEnterKeyPressed(inputElement) {
    fetchWeatherInfo(inputElement.value);
  }
});

function locationFormatted(location) {
  if (typeof location === "string" || location instanceof String) {
    return location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();
  }
  return null;
}

function renderPage(data) {
  // top row
  inputElement = document.getElementById("location-entry");
  let date = document.querySelector(".day-of-week");
  let time = document.querySelector(".time");
  let datetime = data.location.localtime;

  inputElement.value = data.location.name + ", " + data.location.country;
  date.textContent = datetime.substring(0, 10);
  time.textContent = datetime.substring(datetime.length - 5);

  //middle row
  let temperature = document.querySelector(".temperature");
  temperature.innerText = data.current.temp_c + "°C";

  // bottom row
  let rainfall = document.getElementById("rainfall");
  let humidity = document.getElementById("humidity");
  let windSpeed = document.getElementById("wind-speed");

  rainfall.innerText = data.current.precip_mm + "mm";
  humidity.innerText = data.current.humidity + "%";
  windSpeed.innerText = data.current.wind_mph + "mph";

  // background and image
  let shownImage = document.querySelector(".weather-image");
  let currentWeatherCode = data.current.condition.code;
  let weatherIcon = data.current.condition.icon;
  const sunnyCodes = [1000, 1003];
  const cloudyCodes = [1006, 1009, 1030, 1066, 1114, 1135];
  let html = document.getElementById("html");
  let foundCode = false;
  for (let i = 0; i < sunnyCodes.length; i++) {
    if (currentWeatherCode == sunnyCodes[i]) {
      html.classList.remove(...html.classList);
      html.classList.add("weather-sunny");
      console.log("changing to sunny");
      foundCode = true;
    }
  }

  for (let j = 0; j < cloudyCodes.length; j++) {
    if (currentWeatherCode == cloudyCodes[j]) {
      html.classList.remove(...html.classList);
      html.classList.add("weather-cloudy");
      console.log("changing to cloudy");
      foundCode = true;
    }
  }
  if (!foundCode) {
    html.classList.remove(...html.classList);
    html.classList.add("weather-rainy");
    console.log("changing to rainy");
  }

  shownImage.src = weatherIcon;
}
