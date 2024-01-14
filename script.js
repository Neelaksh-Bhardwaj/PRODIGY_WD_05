const apiKey = '9a3b619833cdb79f58d7c9d445b8324c';
const weatherInfoContainer = document.getElementById('weather-info');
const locationNameElement = document.getElementById('location-name');
const temperatureElement = document.getElementById('temperature');
const conditionElement = document.getElementById('condition');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const weatherIconElement = document.getElementById('weather-icon');

async function getWeather() {
  const locationInput = document.getElementById('location');
  const location = locationInput.value;

  if (!location) {
    alert('Please enter a location.');
    return;
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    // Set background image based on the searched location
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${location}')`;

    displayWeather(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherInfoContainer.innerHTML = 'Error fetching weather data.';
  }
}

function displayWeather(data) {
  const { name, main, weather, wind } = data;
  const temperature = main.temp;
  const description = weather[0].description;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const iconCode = weather[0].icon;

  locationNameElement.textContent = name;
  temperatureElement.textContent = `Temperature: ${temperature}°C`;
  conditionElement.textContent = `Condition: ${description}`;
  humidityElement.textContent = `Humidity: ${humidity}%`;
  windSpeedElement.textContent = `Wind Speed: ${windSpeed} m/s`;

  // Set the weather icon
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
  weatherIconElement.src = iconUrl;
}
