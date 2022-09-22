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
  changeDegree.innerHTML = "24";
}
function fah(event) {
  event.preventDefault();
  changeDegree.innerHTML = "75";
}
celcius.addEventListener("click", cel);
fahrenheit.addEventListener("click", fah);

function newCityTemp(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let changeDegree = document.querySelector(".changeDegree");
  let temperature = Math.round(response.data.main.temp);
  changeDegree.innerHTML = `${temperature}`;
  let min = document.querySelector(".min");
  let max = document.querySelector(".max");
  let minTemp = Math.round(response.data.main.temp_min);
  let maxTemp = Math.round(response.data.main.temp_max);
  min.innerHTML = `${minTemp}`;
  max.innerHTML = `${maxTemp}`;
  let weatherDescription = document.querySelector(".weatherDescription");
  let description = response.data.weather[0].description;
  weatherDescription.innerHTML = `${description}`;
  let weatherHumidity = document.querySelector("#humidity");
  weatherHumidity.innerHTML = response.data.main.humidity;
  let weatherWind = document.querySelector("#wind");
  weatherWind.innerHTML = Math.round(response.data.wind.speed);
  console.log(response.data);
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

let form = document.querySelector("form");
form.addEventListener("submit", searchButtonCity);

let button = document.querySelector("button");
button.addEventListener("click", buttonEvent);

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
