// Add variables to the ids' that I have in html
var cityInput = $("#citySearch")
var searchButton = $("#searchButton")
var resultText = $("#result-text")
var resultContent = $("#result-content")
var searchForm = $("#search-form")
var forecastResult = $("#forecast-result")
var forecastContent = $ ("#forecast-content")
var allCities = []
var historySearch = $("#search-list")

// Add var for API key
var apiKey = "7e98b40a5460fd4e49d4ad6cfd6bacde"

//Create var to make customer's input store it in it and also added Alert
var citySearched = function (event){
    event.preventDefault();
    var cityName = cityInput.val().trim();
    console.log(cityName);
    allCities.push (cityName)
    localStorage.setItem("Search_history", JSON.stringify(allCities))
    renderCities(allCities)

    if (cityName) {
        fetchCity(cityName)
    } else {
        alert("Please eneter city name")
    }
}



function renderCities (allCities) {
    historySearch.text("")
    if (allCities.length) {
        allCities.forEach(element => {
           var listOfCities = $("<button>")
           historySearch.append (listOfCities)
           listOfCities.attr("btn btn-primary")
           listOfCities.text (element)
           listOfCities.on("click", fetchCity(element))
        });
    }
}

// Doing first fetch to fetch the city that customer looking for 
function fetchCity (cityName) {
fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`).then(function(response) {
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
    var currentDate = dayjs.unix(data.dt).format ("MM/DD/YYYY")
    console.log(currentDate)
    
    resultContent.text ("")
    console.log(data)
    resultText.text(data.name)
    var date = $("<p>")
    resultContent.append(date)
    date.text(`Today's Date: ${currentDate} `)
    var wCurrent = $("<p>")
    resultContent.append(wCurrent)
    wCurrent.text(`Temperature: ${data.main.temp} Degrees`)
    var humidity = $("<p>")
    resultContent.append(humidity)
    humidity.text(`Humidity: ${data.main.humidity} %`)
    var wind = $("<p>")
    resultContent.append(wind)
    wind.text(`Wind Speed: ${data.wind.speed} mph/h`)


}

// Creating function to display weather forecast, also creating loop function 
function displayWeatherForecast(data) {
    forecastContent.text ("")
    console.log(data)

for (let i=0; i<data.list.length; i+=8){
    var wCard = $("<div>")
    var wCardBody = $("<div>")
    var wCardTitle = $("<h5>")
    var wForcast = $("<p>")
    var wFeel = $("<p>")
    forecastContent.append(wCard)
    wCard.attr("class", "card col-2")
    wCard.append(wCardBody)
    wCardBody.attr("class", "card-body")
    wCardBody.append(wCardTitle)
    wCardTitle.attr("class", "card-title")
    wCardBody.append(wForcast)
    wCardBody.append(wFeel)
    
    wForcast.text(`Temperature: ${data.list[i].main.temp} Degrees`)
    wFeel.text(`Feels like: ${data.list[i].main.feels_like} Degrees`)
}

}

searchForm.on("submit", citySearched)