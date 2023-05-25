var cityInput = $("#citySearch")
var searchButton = $("#searchButton")
var resultText = $("#result-text")
var resultContent = $("#result-content")
var searchForm = $("#search-form")
var forecastResult = $("#forecast-result")
var forecastContent = $ ("#forecast-content")

var apiKey = "7e98b40a5460fd4e49d4ad6cfd6bacde"

// var lat = 51.50
// var lon = 0.12
// var weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=7e98b40a5460fd4e49d4ad6cfd6bacde`

var citySearched = function (event){
    event.preventDefault();
    var cityName = cityInput.val().trim();
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
    fetchWeatherCurrent(data)
    fetchWeatherForecast(data)
})
}

function fetchWeatherCurrent(data) {
    var lat = data[0].lat;
    console.log(lat)
    var lon = data[0].lon;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`).then(function(response) {
    return response.json()

}).then(function(data) {
    console.log (data)
    displayWeatherCurrent(data)
})
}


function fetchWeatherForecast(data) {
    var lat = data[0].lat;
    console.log(lat)
    var lon = data[0].lon;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`).then(function(response) {
    return response.json()

}).then(function(data) {
    console.log (data)
    displayWeatherForecast(data)
})
}

function displayWeatherCurrent(data) {
    console.log(data)
    resultText.text(data.name)
    var wCurrent = $("<p>")
    resultContent.append(wCurrent)
    wCurrent.text(`Temperature: ${data.main.temp} Degrees`)
    
}


function displayWeatherForecast(data) {
    console.log(data)

for (let i=0; i<data.list.length; i+=8){
    var wForcast = $("<p>")
    var wFeel = $("<p>")
    forecastContent.append(wForcast)
    forecastContent.append(wFeel)
    wForcast.text(`Temperature: ${data.list[i].main.temp} Degrees`)
    wFeel.text(`Feels like: ${data.list[i].main.feels_like} Degrees`)

}

}

// fetch(weatherURL).then(function(response) {
//     return response.json()

// }).then(function(data) {
//     console.log (data)
// })

searchForm.on("submit", citySearched)