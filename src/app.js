function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    } 
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
let date = new Date(timestamp*1000);
let day = date.getDay();
let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
return days[day];
}

function displayForecast (response) {
    let forecast = response.data.daily;
   let forecastElement = document.querySelector("#forecast");

   let forecastHTML = `<div class= "row">`;
   forecast.forEach (function (forecastDay, index) {
    if (index < 6) 
   forecastHTML =
   forecastHTML +
    `
    <div class="col-2">
            <div class="weather-forecast-date">
                ${formatDay(forecastDay.dt)}
            </div>
                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width=60px>
                <div class="weather-farecast-temp">
                <span class= "weather-forecast-temp-max">   ${Math.round(forecastDay.temp.max)}° </span>
                <span class="weather-farecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
                </div>
    </div>`;
   });
forecastHTML= forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "26cc4e1e98bc3a9df038576aea64ceb0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature (response) {
//console.log(response.data.main.temp);
let tempElement = document.querySelector("#main-temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#today-weather-icon");

celsiusTemperature = response.data.main.temp;

tempElement.innerHTML = Math.round(celsiusTemperature);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = response.data.wind.speed;
dateElement.innerHTML = formatDate(response.data.dt*1000);
iconElement.setAttribute("src",`icons/${response.data.weather[0].icon}.svg`);
//iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt",response.data.weather[0].description);
//console.log(response.data);

getForecast(response.data.coord);

}

function search(city) {
let apiKey = "26cc4e1e98bc3a9df038576aea64ceb0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#input-city");
    search(cityInputElement.value);
}

// Current geo location
function showPosition(position) {
let apiKey = "26cc4e1e98bc3a9df038576aea64ceb0";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function getCurrentPosition(event) {
event.preventDefault();
console.log(event);
navigator.geolocation.getCurrentPosition(showPosition);
}

//click current location button
let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", getCurrentPosition);

function convertCelsiusTemp(event) {
    event.preventDefault();
   let tempElement= document.querySelector("#main-temperature");
   tempElement.innerHTML = Math.round(celsiusTemperature);
   celsiusLink.classList.add("active");
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click",convertCelsiusTemp);

search("Tokyo");