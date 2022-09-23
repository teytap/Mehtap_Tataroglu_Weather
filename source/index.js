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
currentDate.innerHTML = `${days[now.getDay()]}  ${hour}:${minute}`;

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

function newCityForecast() {
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
              <div class="weather-forecast-date">${day}</div>
              <img
                src="http://openweathermap.org/img/wn/04d@2x.png"
                alt="Cloudy"
                width="42px"
              />
              <br />
              <span class="forecast-max">18°</span>
              <span class="forecast-min">10°</span>
            </div>
          `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
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
  console.log(response.data.weather[0].icon);
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
newCityForecast();
