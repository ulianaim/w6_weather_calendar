// Add variables to the ids' that I have in html
var cityInput = $("#citySearch")
var searchButton = $("#searchButton")
var resultText = $("#result-text")
var resultContent = $("#result-content")
var searchForm = $("#search-form")
var forecastResult = $("#forecast-result")
var forecastContent = $ ("#forecast-content")

// Add var for API key
var apiKey = "7e98b40a5460fd4e49d4ad6cfd6bacde"

//Create var to make customer's input store it in it and also added Alert
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

// Doing first fetch to fetch the city that customer looking for 
function fetchCity (cityName) {
fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`).then(function(response) {
    return response.json()

}).then(function(data) {
    console.log (data)
    fetchWeatherCurrent(data)
    fetchWeatherForecast(data)
})
}

// Fetching current weather
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

// Fetching weather forecast
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

// Creating function to display current weather
function displayWeatherCurrent(data) {
    console.log(data)
    resultText.text(data.name)
    var wCurrent = $("<p>")
    resultContent.append(wCurrent)
    wCurrent.text(`Temperature: ${data.main.temp} Degrees`)

}

// Creating function to display weather forecast, also creating loop function 
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

searchForm.on("submit", citySearched)