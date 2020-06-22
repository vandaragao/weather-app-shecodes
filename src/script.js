let apiKey = "427d00adec8a31c1032d4fd37c4a7f55";

let currentTime = document.querySelector("#current-time");
let now = new Date();
let weekDay = now.getDay();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentWeekDay = weekDays[weekDay];
let currentHour = ("0" + now.getHours()).slice(-2);
let currentMinutes = ("0" + now.getMinutes()).slice(-2);

currentTime.innerHTML = `${currentWeekDay}, ${currentHour}:${currentMinutes}`;

let searchInput = document.querySelector("#search-box");
let currentCity = document.querySelector("#current-city");
let searchForm = document.querySelector("#search-form");
let currentTemp = document.querySelector(".temp-now-value");
let currentTempCelsius = document.querySelector("#celsius");
let currentTempFahr = document.querySelector(".fahrenheit");
let windSpeed = document.querySelector("#wind");
let maxTemp = document.querySelector("#max");
let minTemp = document.querySelector("#min");
let hum = document.querySelector("#humidity");
let thermalSensation = document.querySelector("#sensation");

function find(event) {
  event.preventDefault();
  let cityResult = searchInput.value.toLowerCase();

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityResult}&appid=427d00adec8a31c1032d4fd37c4a7f55&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  hum.innerHTML = Math.round(response.data.main.humidity);
  thermalSensation.innerHTML = Math.round(response.data.main.feels_like);
  console.log(response.data);
  currentCity.innerHTML = response.data.name;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  console.log(response.data.weather[0].icon);
}

searchForm.addEventListener("submit", find);

let locationButton = document.querySelector("#location");
function showTempHere() {
  function getLocation(position) {
    let apiUrlcoords = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=427d00adec8a31c1032d4fd37c4a7f55&units=metric`;
    axios.get(apiUrlcoords).then(showTempLoc);
    currentCity.innerHTML = `${position.coords.latitude}`;
  }
  navigator.geolocation.getCurrentPosition(getLocation);

  function showTempLoc(response) {
    currentTemp.innerHTML = Math.round(response.data.main.temp);
    currentCity.innerHTML = response.data.name;
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    maxTemp.innerHTML = Math.round(response.data.main.temp_max);
    minTemp.innerHTML = Math.round(response.data.main.temp_min);
    hum.innerHTML = Math.round(response.data.main.humidity);
    thermalSensation.innerHTML = Math.round(response.data.main.feels_like);
    icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }
}

locationButton.addEventListener("click", showTempHere);
showTempHere();
let fahrButton = document.querySelector(".fahrenheit");
let celsiusButton = document.querySelector("#celsius");
function convert(event) {
  event.preventDefault;
  currentTemp.innerHTML = Math.round(currentTemp.innerHTML * 1.8 + 32);
}

fahrButton.addEventListener("click", convert);

function convertBack(event) {
  event.preventDefault;
  currentTemp.innerHTML = Math.round((currentTemp.innerHTML - 32) / 1.8);
}

celsiusButton.addEventListener("click", convertBack);
