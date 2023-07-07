const iconW = document.querySelector('.weather-icon');

const temp = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

let prevCity;

const tempIn = document.querySelector('.temperature_in');
const windIn = document.querySelector('.wind_in');
const humidityIn = document.querySelector('.humidity_in');

const city = document.querySelector('.city');
const cityState = {
    city: "Минск"
}

function setLocalStorage() {
    localStorage.setItem('city', cityState.city);
}

function getLocalStorage(){
    if(localStorage.getItem('city')){
        prevCity = city.value;
        city.value = localStorage.getItem('city');
    }
}

city.addEventListener('change', getWeather);
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

async function getWeather () {
    try{
        cityState.city = city.value || "Минск";
        city.value = cityState.city;
        const weatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityState.city}&lang=${document.querySelector('.language').textContent}&appid=d9995627da895a101249333428fd5bf6&units=metric`;
        const res = await fetch(weatherLink);
        const data = await res.json();
    
        iconW.className = 'weather-icon owf';
        iconW.classList.add(`owf-${data.weather[0].id}`);
        const classIcon = document.getElementsByClassName(`owf-${data.weather[0].id}`);
        classIcon[0].style = 'font-size:40px; color: white; margin: 3px 3px 3px 3px;';

        tempIn.textContent = `${Math.floor(data.main.temp)} °C , ${data.weather[0].description}`;
        windIn.textContent = `${Math.floor(data.wind.speed)} `;
        humidityIn.textContent = `${Math.floor(data.main.humidity)} %`;

        prevCity = city.value;
    }
    catch{
        alert("Неверный запрос!");
        const weatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${prevCity}&lang=${document.querySelector('.language').textContent}&appid=d9995627da895a101249333428fd5bf6&units=metric`;
        const res = await fetch(weatherLink);
        const data = await res.json();
    
        iconW.className = 'weather-icon owf';
        iconW.classList.add(`owf-${data.weather[0].id}`);
        const classIcon = document.getElementsByClassName(`owf-${data.weather[0].id}`);
        classIcon[0].style = 'font-size:40px; color: white; margin: 3px 3px 3px 3px;';

        tempIn.textContent = `${data.main.temp} °C , ${data.weather[0].description}`;
        windIn.textContent = `${data.wind.speed} м/с`;
        humidityIn.textContent = `${data.main.humidity} %`;
        city.value = prevCity;
        cityState.city = city.value;
    }
}



export default getWeather;