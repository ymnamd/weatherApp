const apiKey = '890b33a5e02928ff91848565859e603f';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric'

const searchBox = document.querySelector(".search input")
const searchButton = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    // fetch weather details through API
    const response = await fetch(apiUrl + `&q=${city}` + "&appid=" + apiKey);
    var data = await response.json();
    console.log(data)
    
    // invalid search
    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block'
        document.querySelector(".weather").style.display = "none"

    } 

    else {
    // change weather details
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.country-code').innerHTML = data.sys.country;
    document.querySelector('.temperature').innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector('.min').innerHTML = "Low: " + Math.round(data.main.temp_min) + "°C";
    document.querySelector('.max').innerHTML = "High: " + Math.round(data.main.temp_max) + "°C";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";
    
    // change weather icon
    if (data.weather[0].main == 'Clear') {
        weatherIcon.src = "images/clear.png"
    }
    else if (data.weather[0].main == 'Clouds') {
        weatherIcon.src = "images/clouds.png"
    }
    else if (data.weather[0].main == 'Rain') {
        weatherIcon.src = "images/rain.png"
    }
    else if (data.weather[0].main == 'Drizzle') {
        weatherIcon.src = "images/drizzle.png"
    }
    else if (data.weather[0].main == 'Mist') {
        weatherIcon.src = "images/mist.png"
    }

    document.querySelector(".weather").style.display = "block"
    document.querySelector(".error").style.display = "none"

}}

// click to submit
searchButton.addEventListener('click', () => {
    checkWeather(searchBox.value);
})
// enter key submit
searchBox.addEventListener('keypress', function (event) {
    if (event.key == "Enter") {
        searchButton.click()
    }
})