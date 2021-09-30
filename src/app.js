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

function displayForecast () {
   let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = "Forecast";
    `<div class="row">
            <div class="col-2">
            <div class="weather-forecast-date">
                Mon
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="" width=60px>
                <div class="weather-farecast-temp">
                <span class= "weather-forecast-temp-max"> 22° </span>
                <span class="weather-farecast-temperature-min"> 15° </span>
                </div>
            </div>
            </div>
        </div>
    </div>
</div>`
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


function convertFahrenheitTemp(event) {
    event.preventDefault();
    fahrenheitTemperature = (celsiusTemperature* 9) / 5  + 32;
    let tempElement= document.querySelector("#main-temperature");
    tempElement.innerHTML = Math.round(fahrenheitTemperature);
    celsiusLink.classList.remove("active");
   fahrenheitLink.classList.add('active');
}

function convertCelsiusTemp(event) {
    event.preventDefault();
   let tempElement= document.querySelector("#main-temperature");
   tempElement.innerHTML = Math.round(celsiusTemperature);
   celsiusLink.classList.add("active");
   fahrenheitLink.classList.remove('active');
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click",convertFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click",convertCelsiusTemp);

search("Tokyo");
displayForecast();