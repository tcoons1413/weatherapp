const KEY = "7c8cac4b5f9f421b92713759242807"
const city_names = ["Toronto","Paris","Ottawa","Vancouver","Tokyo","Eugene","Brazil"]
let weather_img = ""
let weather_imgNode = document.getElementById("mainWeatherImg")
let city = document.getElementById("cityName")
let temp_c = document.getElementById("temperature")
let countryH6 = document.getElementById("countryh6")
let dayContainerImg = document.querySelectorAll(".dayContainerImg")
let whatKindOfDay = document.getElementById("whatKindOfDay")
let changeCityText = document.getElementById("changeCityText")
let tempPerDay = document.querySelectorAll(".tempPerDay")
let dayOfTheWeek = document.querySelectorAll(".dayOfTheWeek")
// console.log(date)

async function getWeatherApi(sc){
    try {
        let searchedCity = sc
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${searchedCity}&days=4`)
        
        let weather = await response.json()
        console.log(weather)
        weather_img = weather.current.condition.icon
        weather_imgNode.src = weather_img
        city.innerHTML = weather.location["name"]
        temp_c.innerHTML = weather.current["temp_c"] + "°"
        countryH6.innerHTML = weather.location.region + " | " + weather.location.country
        for (let i = 0; i < dayContainerImg.length; i++) {
            let date = new Date(weather.forecast.forecastday[i].date)
            dayOfTheWeek[i].innerHTML = date.toUTCString().slice(0,3)
            dayContainerImg[i].src = weather.forecast.forecastday[i].day.condition.icon
            tempPerDay[i].innerHTML = weather.forecast.forecastday[i].day.avgtemp_c + "°"
        }
        whatKindOfDay.innerHTML = weather.current.condition.text
    } catch (error) {
        console.log("Bad: " + error)
    }
}

let searchedCity = "Toronto"

getWeatherApi(searchedCity)


function saveChanges(){
    searchedCity = changeCityText.value
    getWeatherApi(searchedCity) 
}
