const API_KEY = '0a63fec2a95cb779a896aee942f04b50';

const fetchData = async position => {
    const { latitude, longitude } = position.coords;
    await sleep(1500);
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
}

const setWeatherData = data => {
    const weatherData = {
        location: `City: ${data.name}, ${data.sys.country}`,
        description: `Description: ${data.weather[0].description}`,
        humidity: `Humidity: ${data.main.humidity}`,
        pressure: `Pressure: ${data.main.pressure}`,
        temperature: `Temperature: ${data.main.temp}C°`,
        date: `Date: ${getDate()}`,
    }

    Object.keys(weatherData).forEach(key => {
        document.querySelector('.'+key).textContent = weatherData[key];
    });

    loadEnd();
}

const loadEnd = () => {
    let row = document.querySelector('.row');
    let spinner = document.querySelector('.lds-ripple');

    spinner.style.display = 'none';
    row.style.display = 'flex';
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth()+1)).slice(-2)}-${date.getFullYear()}`;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
}

function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}