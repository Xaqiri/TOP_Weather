import './styles.css'
let api_key = '8a5910e9d87b9b06f733d4de4979b649'
let city = 'Chicago'
let city_weather = { 'city': city, 'condition': '', 'temp': 0, 'temp_f': 0, 'temp_c': 0}
let submit_button = document.getElementById('submit')
let city_form = document.getElementById('city-input')
let display = document.getElementById('info-display')
let pos_button = document.getElementById('cur-pos')

async function getWeatherData (api_key,city) { 
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${api_key}`, {mode: 'cors' })
    const json = await response.json()
    return json
}

async function getWeatherDataFromPos (api_key,latitude,longitude) { 
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${api_key}`)
    const json = await response.json()
    return json
}

function getCurrentPosition(api_key) {
    if (navigator.geolocation) {
        const pos = navigator.geolocation.getCurrentPosition((position) => {
               setWeatherDataFromCoords(api_key, position.coords.latitude, position.coords.longitude, getWeatherDataFromPos).then((json) => {
            })
        })
    }
}

function setWeatherData(api_key, city, weatherFunc) {
    weatherFunc(api_key, city).then((json) => {
        city_weather.city = city
        city_weather.condition = json.weather[0].main
        city_weather.temp = json.main.temp
        city_weather.temp_c = Math.floor(city_weather.temp - 273.15)
        city_weather.temp_f = Math.floor(city_weather.temp_c*(9/5)+32)
        displayWeather(city_weather)
    })
    
}

function setWeatherDataFromCoords(api_key, latitude, longitude, weatherFunc) {
    weatherFunc(api_key, latitude, longitude).then((json) => {
        city_weather.city = json.name
        city_weather.condition = json.weather[0].main
        city_weather.temp = json.main.temp
        city_weather.temp_c = Math.floor(city_weather.temp - 273.15)
        city_weather.temp_f = Math.floor(city_weather.temp_c*(9/5)+32)
        displayWeather(city_weather)
    })
    
}

function displayWeather(city_weather) { 
    let city_display = document.createElement('div')
    let condition_display = document.createElement('div')
    let temp_display = document.createElement('div')
    city_display.innerHTML = capitalize(city_weather.city)
    condition_display.innerHTML = city_weather.condition
    temp_display.innerHTML = city_weather.temp_f
    display.appendChild(city_display)
    display.appendChild(condition_display)
    display.appendChild(temp_display)
}

function capitalize(string) { 
    let temp = string.split('')
    temp[0] = temp[0].toUpperCase()
    return temp.join('')
}

function clearDisplay() {
    if (display.hasChildNodes) { 
        display.innerHTML = ""
    }
}

submit_button.addEventListener('click', () => {
    clearDisplay()
    let city = city_form.value
    setWeatherData(api_key, city, getWeatherData)
})

pos_button.addEventListener('click', () => {
    clearDisplay()
    getCurrentPosition(api_key)
})