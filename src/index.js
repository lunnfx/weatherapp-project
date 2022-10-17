let now = new Date();
let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

let month = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12"
];
function formatDay(timestamp){let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["MON", "TUE", "WED", "THU", "FRI", "SAT","SUN" ]
return days[day];}
let day = document.querySelector(".day");
day.innerHTML = `${days[now.getDay()]}`;
let date = document.querySelector(".date");
let currentMonth = month[now.getMonth()];
date.innerHTML = `${now.getDate()}.${currentMonth}`;
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = document.querySelector(".time");
time.innerHTML = `${hours}:${minutes}`;
let humidity = document.querySelector(".humidity");
let windSpeed = document.querySelector(".windSpeed");
let weatherDescription = document.querySelector(".description");
let search = document.querySelector(".submit");
let city = document.querySelector("#search-form");
let currentCity = document.querySelector(".currentCity");
let celsius = document.querySelector(".celsius");
let farengites = document.querySelector(".farengites");
let currentTemperature = document.querySelector(".currentTemperature");
// for Ba
let apiKey = "197ef3a642b76eef90e131866f74a0a0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Bratislava&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperatureForBa);
function showTemperatureForBa(response) {
  currentTemperature.innerHTML = ` ${Math.round(response.data.main.temp)} `;
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}`;
  humidity.innerHTML = `${response.data.main.humidity}`;
  weatherDescription.innerHTML = `${response.data.weather[0].main}`;
  celsius.addEventListener("click", backToCelsius);
  function backToCelsius() {
    currentTemperature.innerHTML = ` ${Math.round(response.data.main.temp)} `;
  }
  farengites.addEventListener("click", convertion);
  function convertion() {
    currentTemperature.innerHTML = ` ${Math.round(
      Math.round(response.data.main.temp) * 1.8 + 32
    )} `;
  }
  let todayIcon = document.querySelector("#todayIcon");
  if (response.data.weather[0].main === "Clouds") {
    todayIcon.innerHTML = `<i class="fa-solid fa-cloud"></i> `;
  }
  if (response.data.weather[0].main === "Rain") {
    todayIcon.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`;
  }
  if (response.data.weather[0].main === "Clear") {
    todayIcon.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    if (hours > 18) {
      todayIcon.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    }
  }
  if (response.data.weather[0].main === "Snow") {
    todayIcon.innerHTML = `<i class="fa-solid fa-snowflake"></i>`;
  }
  if (response.data.weather[0].main === "Drizzle") {
    todayIcon.innerHTML = `<i class="fa-solid fa-snowflake"></i>`;
  }
  if (response.data.weather[0].main === "Thunderstorm") {
    todayIcon.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
  }
  function forecastForBa (response){
    let apiKey = "197ef3a642b76eef90e131866f74a0a0";
    let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${48.1482}&lon=${17.1067}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(displayForecast);
  
  
  function displayForecast(response) {
    let forecastElement = document.querySelector("#weather-forecast");
    console.log(response.data);
    let forecastData = response.data.daily;
  
    let forecastHTML = `<div class = "row">`;
    forecastData.forEach(function (forecastDay, index)  { if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2"> ${formatDay(forecastDay.dt)} </br> <img src = "http://openweathermap.org/img/wn/${forecastDay.weather.[0].icon}@2x.png" width = "42"/> <br/> ${Math.round(forecastDay.temp.max)}°</br><span class = "weather-forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
  </div>`;}
    });
    forecastHTML = forecastHTML + `</div>`;
  
    forecastElement.innerHTML = forecastHTML;
  }}
  forecastForBa ()
}


function searchCity(event) {
  event.preventDefault();
  currentCity.innerHTML = `${city.value}`;
  let apiKey = "197ef3a642b76eef90e131866f74a0a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
search.addEventListener("click", searchCity);

function displayTemperature(response) {
  currentTemperature.innerHTML = ` ${Math.round(response.data.main.temp)} `;
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}`;
  humidity.innerHTML = `${response.data.main.humidity}`;
  weatherDescription.innerHTML = `${response.data.weather[0].main}`;
  celsius.addEventListener("click", backToCelsius);
  function backToCelsius() {
    currentTemperature.innerHTML = ` ${Math.round(response.data.main.temp)} `;
  }
  farengites.addEventListener("click", convertion);
  function convertion() {
    currentTemperature.innerHTML = ` ${Math.round(
      Math.round(response.data.main.temp) * 1.8 + 32
    )} `;
  }
  let todayIcon = document.querySelector("#todayIcon");
  if (response.data.weather[0].main === "Clouds") {
    todayIcon.innerHTML = `<i class="fa-solid fa-cloud"></i> `;
  }
  if (response.data.weather[0].main === "Rain") {
    todayIcon.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`;
  }
  if (response.data.weather[0].main === "Clear") {
    todayIcon.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    if (hours > 18) {
      todayIcon.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    }
  }
  if (response.data.weather[0].main === "Snow") {
    todayIcon.innerHTML = `<i class="fa-solid fa-snowflake"></i>`;
  }
  if (response.data.weather[0].main === "Drizzle") {
    todayIcon.innerHTML = `<i class="fa-solid fa-snowflake"></i>`;
  }
  if (response.data.weather[0].main === "Thunderstorm") {
    todayIcon.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
  }
  getForecast(response.data.coord);
}
function getForecast(coordinates) {
  let apiKey = "197ef3a642b76eef90e131866f74a0a0";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#weather-forecast");
  console.log(response.data);
  let forecastData = response.data.daily;

  let forecastHTML = `<div class = "row">`;
  forecastData.forEach(function (forecastDay, index)  { if (index < 5) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2"> ${formatDay(forecastDay.dt)} </br> <img src = "http://openweathermap.org/img/wn/${forecastDay.weather.[0].icon}@2x.png" width = "42"/> <br/> ${Math.round(forecastDay.temp.max)}°</br><span class = "weather-forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
</div>`;}
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}