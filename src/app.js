function displayTemperature (response) {
//console.log(response.data.main.temp);
let tempElement = document.querySelector("#main-temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
tempElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = response.data.wind.speed;
console.log(response.data);
}

let apiKey = "26cc4e1e98bc3a9df038576aea64ceb0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);