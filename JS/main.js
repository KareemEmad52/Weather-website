"use strict";
let currentWeatherData;
let weatherData;
let currentTemp = document.getElementById("currentTemp");
let currentImg = document.getElementById("currentImg");
let weatherStatus = document.getElementById('Weather-statu');
let currentDate = document.getElementById('current-day');
let currentMonth = document.getElementById('current-month');
let days = document.querySelectorAll('.item-cont-1 span')
let search = document.getElementById('search');
let cityName = document.getElementById('cityName');
let forecastImgs = document.querySelectorAll('.item-container img');
let forecastTemp = document.querySelectorAll('.item-container h3');
let forecastWind = document.querySelectorAll('.item-container p');
let forecastStatue = document.querySelectorAll('.item-container span');
let searchKey = 'cairo';
let searchKey2 = 'cairo';
let date = new Date();
let finalCity= '';
let daysInWeek = ['Saturday','Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

async function getCurrentWeather(a) {
  let res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=5f33498345d24e5dbef132011230408&q=${a}`
  );

  let finalRes = await res.json();
  return finalRes;
}

(async function currentWeather() {
    currentWeatherData = await getCurrentWeather(searchKey);
    search.addEventListener('keyup',async function(){
        searchKey = search.value;
        currentWeatherData = await getCurrentWeather(searchKey);
        display();
    })
    function display(){
        cityName.innerHTML = currentWeatherData.location.name;
        currentTemp.innerHTML = `${currentWeatherData.current.temp_c}°C`;
        currentImg.setAttribute("src", `${currentWeatherData.current.condition.icon}`);
        weatherStatus.innerHTML = currentWeatherData.current.condition.text;
        currentDate.innerHTML = date.toLocaleString('en-us', {weekday:'long'})
        currentMonth.innerHTML = ` ${date.getDate()}${date.toLocaleString('en-us', {month:'long'})}`
    }
    display();
}())

async function getForecastWeather(x){
    let res2 = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5f33498345d24e5dbef132011230408&q=${x}&days=3`)

    let finalRes2 = await res2.json();

    return finalRes2;
}


(async function weather() {
    weatherData = await getForecastWeather(searchKey2);
    search.addEventListener('keyup',async function (){
        searchKey2 = search.value
        weatherData = await getForecastWeather(searchKey2);
        display2();
    })

    function display2(){
        let nextDay = new Date(weatherData.forecast.forecastday[2].date);
        days[2].innerHTML = daysInWeek[nextDay.getDay()]
        forecastImgs[0].setAttribute('src',weatherData.forecast.forecastday[1].day.condition.icon);
        forecastTemp[0].innerHTML = `${weatherData.forecast.forecastday[1].day.maxtemp_c}°C`
        forecastWind[0].innerHTML = `${weatherData.forecast.forecastday[1].day.mintemp_c}°C`
        forecastStatue[0].innerHTML = `${weatherData.forecast.forecastday[1].day.condition.text}`

        days[3].innerHTML = daysInWeek[nextDay.getDay()+1]
        forecastImgs[1].setAttribute('src',weatherData.forecast.forecastday[2].day.condition.icon);
        forecastTemp[1].innerHTML = `${weatherData.forecast.forecastday[2].day.maxtemp_c}°C`
        forecastWind[1].innerHTML = `${weatherData.forecast.forecastday[2].day.mintemp_c}°C`
        forecastStatue[1].innerHTML = `${weatherData.forecast.forecastday[2].day.condition.text}`
    }
    display2();
}())















