let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let currentDate = document.querySelector(".dayHour");
currentDate.innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${
  days[now.getDay()]
}  <i class="fa-solid fa-clock"></i> ${hour}:${minute}`;

let celcius = document.querySelector("#celcius");
let fahrenheit = document.querySelector("#fahrenheit");
let changeDegree = document.querySelector(".changeDegree");

function cel(event) {
  event.preventDefault();
  changeDegree.innerHTML = Math.round(celciusTemp);
}
function fah(event) {
  event.preventDefault();
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  changeDegree.innerHTML = Math.round(fahrenheitTemp);
}
celcius.addEventListener("click", cel);
fahrenheit.addEventListener("click", fah);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function newCityForecast(response) {
  let forecastDaily = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastDaily.forEach(function (forecastDay, i) {
    if (i < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="Cloudy"
                width="50"
              />
              <br />
              <span class="forecast-max">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="forecast-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(newCityForecast);
}

function newCityTemp(response) {
  let h1 = document.querySelector("h1");
  let changeDegree = document.querySelector(".changeDegree");
  let weatherDescription = document.querySelector(".weatherDescription");
  let weatherHumidity = document.querySelector("#humidity");
  let weatherWind = document.querySelector("#wind");
  let weatherIcon = document.querySelector("#icon");

  h1.innerHTML = response.data.name;
  changeDegree.innerHTML = Math.round(response.data.main.temp);
  celciusTemp = response.data.main.temp;
  weatherDescription.innerHTML = response.data.weather[0].description;
  weatherHumidity.innerHTML = response.data.main.humidity;
  weatherWind.innerHTML = Math.round(response.data.wind.speed);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(newCityInput) {
  let apiKey = "1223d92fc1f5a88dccf0859beb3b3425";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(newCityTemp);
}

function searchButtonCity(event) {
  event.preventDefault();
  let newCityInput = document.querySelector("#newCity").value;
  searchCity(newCityInput);
}

function buttonEvent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(position) {
  let apiKey = "1223d92fc1f5a88dccf0859beb3b3425";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(newCityTemp);
}

let celciusTemp = null;

let form = document.querySelector("form");
form.addEventListener("submit", searchButtonCity);

let button = document.querySelector("button");
button.addEventListener("click", buttonEvent);

searchCity("Ankara");
