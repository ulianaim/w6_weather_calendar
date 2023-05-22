var cityInput = $("#citySearch")
var searchButton = $("#searchButton")
var lat = 51.50
var lon = 0.12
var weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=7e98b40a5460fd4e49d4ad6cfd6bacde`

fetch(weatherURL).then(function(response) {
    return response.json()

}).then(function(data) {
    console.log (data)
})