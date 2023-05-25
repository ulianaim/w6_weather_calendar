var cityInput = document.querySelector("#citySearch")
var searchButton = $("#searchButton")
var resultText = $("#result-text")
var resultContent = $("#result-content")
var searchForm = document.querySelector("#search-form")

var apiKey = "7e98b40a5460fd4e49d4ad6cfd6bacde"

// var lat = 51.50
// var lon = 0.12
// var weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=7e98b40a5460fd4e49d4ad6cfd6bacde`

var citySearched = function (event){
    event.preventDefault();
    var cityName = cityInput.value.trim();
    console.log(cityName);

    if (cityName) {
        fetchCity(cityName)
    } else {
        alert("Please eneter city name")
    }
}

function fetchCity (cityName) {

fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`).then(function(response) {
    return response.json()

}).then(function(data) {
    console.log (data)
    fetchWeather(data)
})
}

function fetchWeather(data) {
    var lat = data[0].lat;
    console.log(lat)
    var lon = data[0].lon;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`).then(function(response) {
    return response.json()

}).then(function(data) {
    console.log (data)
    displayWeather(data)
})
}

function displayWeather(data) {
    console.log(data)
    
}

// fetch(weatherURL).then(function(response) {
//     return response.json()

// }).then(function(data) {
//     console.log (data)
// })

searchForm.addEventListener("submit", citySearched)