async function fetchWeatherInfo(location) {
  try {
    const response = await fetch(
      "http://api.weatherapi.com/v1/current.json?key=43d9009306014ff7953170811242102&q=" +
        locationFormatted(location) +
        "&aqi=no"
    );

    const data = await response.json();
    renderPage(data);
  } catch (e) {
    console.log(e);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  inputElement = document.getElementById("location-entry");

  inputElement.addEventListener("keypress", function (event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default action (e.g., form submission)

      // Call your custom handler function here
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

// function renderPage(data) {
//   let dayText = document.getElementsByClassName("day-of-week");
//   let timeText = document.getElementsByClassName("time");
//   let;
// }
