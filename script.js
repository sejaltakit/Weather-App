const API_KEY = '7b04045ea57fa1055a741e37eccb59e9'; // Get from https://openweathermap.org/

function getWeather() {
    const city = document.getElementById('city-input').value;
    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    fetch(URL)
        .then(response => response.json())
        .then(data => {
            document.getElementById('city-name').textContent = data.name;
            document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
            document.getElementById('description').textContent = data.weather[0].description;
            document.getElementById('humidity').textContent = data.main.humidity;
            document.getElementById('wind-speed').textContent = data.wind.speed;

            getForecast(city);
        })
        .catch(() => {
            alert("City not found. Please try again.");
        });
}

function getForecast(city) {
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

    fetch(URL)
        .then(response => response.json())
        .then(data => {
            const forecastContainer = document.getElementById('forecast-container');
            forecastContainer.innerHTML = "";

            for (let i = 0; i < data.list.length; i += 8) { // Every 24 hours
                const forecast = data.list[i];
                const date = new Date(forecast.dt * 1000);
                const day = date.toLocaleDateString("en-US", { weekday: 'short' });

                const forecastItem = document.createElement("div");
                forecastItem.classList.add("forecast-item");
                forecastItem.innerHTML = `
                    <p>${day}</p>
                    <p>${Math.round(forecast.main.temp)}°C</p>
                `;

                forecastContainer.appendChild(forecastItem);
            }
        })
        .catch(() => {
            alert("Error fetching forecast data.");
        });
}
