const APIKey = "ba838de580d82dd8a358c9ee77591f26";
const BTNsearch = document.getElementById("btn-search");

BTNsearch.addEventListener("click", async () => {
	const city = document.getElementById("search").value;
	const { lat, lon } = await getLocationCoordiantes(city);
	const weather = await getCurrentWeather(lat, lon);
	const forecast = await getForecast(lat, lon);
	updateWeather(weather);
	updateForecast(forecast);
});

async function getCurrentWeather(lat, lon) {
	try {
		const currentWeatherURL =
			"https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric" + "&appid=" + APIKey;
		const response = await fetch(currentWeatherURL);
		const currentWeather = await response.json();
		console.log(currentWeather);
		return currentWeather;
	} catch {
		console.log(error);
	}
}

async function getLocationCoordiantes(city) {
	try {
		const locationURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;
		const response = await fetch(locationURL);
		const locationData = await response.json();
		return {
			lat: locationData[0].lat,
			lon: locationData[0].lon,
		};
	} catch {
		console.log(error);
	}
}

async function getForecast(lat, lon) {
	try {
		const forecastURL =
			"https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + APIKey;
		const response = await fetch(forecastURL);
		const forecast = await response.json();
		return forecast;
	} catch {
		console.log(error);
	}
}

const getIcon = (icon) => {
	try {
		const iconURL = "http://openweathermap.org/img/wn/" + icon + ".png";
		return iconURL;
	} catch {
		console.log(error);
	}
};

const updateWeather = (obj) => {
	// weather-current div
	const description = document.getElementById("weather-info");
	const city = document.getElementById("weather-city");
	const date = document.getElementById("weather-date");
	const time = document.getElementById("weather-time");
	const temperature = document.getElementById("weather-temperature");
	const units = document.getElementById("weather-units");
	const icon = document.getElementById("weather-icon");
	const currentDate = new Date();
	const month = currentDate.toLocaleString("default", { month: "long" });

	console.log(month);

	const info = obj.weather[0].description;
	const uppercaseInfo = info.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
	description.textContent = uppercaseInfo;
	city.textContent = obj.name;
	date.textContent = currentDate.getDate() + "th " + month + " " + currentDate.getFullYear();
	time.textContent = currentDate.getHours() + ":" + currentDate.getMinutes() + " Uhr";
	temperature.textContent = Math.round(obj.main.temp * 10) / 10 + " °C";
	icon.src = getIcon(obj.weather[0].icon);

	//weather-details div
	const feelslike = document.getElementById("weather-feelslike-info");
	const humidity = document.getElementById("weather-humidity-info");
	const rain = document.getElementById("weather-rain-info");
	const wind = document.getElementById("weather-wind-info");

	feelslike.textContent = Math.round(obj.main.feels_like * 10) / 10 + " °C";
	humidity.textContent = obj.main.humidity + " %";
	// rain.textContent = obj.main.humidity; catch ERROR if not in response!
	wind.textContent = obj.wind.speed + " km/h";
};

const updateForecast = (forecastData) => {
	const forecastContent = document.querySelector(".weather-forecast");
	forecastContent.textContent = "";

	for (let i = 0; i < 7; i++) {
		const forecast = document.createElement("div");
		forecast.classList = "forecast";

		const forecastDay = document.createElement("div");
		forecastDay.classList = "forecast-day";
		forecastDay.textContent = getDayString(i);

		forecast.appendChild(forecastDay);

		const forecastTemp = document.createElement("div");
		forecastTemp.classList = "forecast-temp";
		forecastTemp.textContent = Math.round(forecastData.list[i].main.temp * 10) / 10 + " °C";
		forecast.appendChild(forecastTemp);

		const forecastFeelslike = document.createElement("div");
		forecastFeelslike.classList = "forecast-feelslike";
		forecastFeelslike.textContent = Math.round(forecastData.list[i].main.feels_like * 10) / 10 + " °C";
		forecast.appendChild(forecastFeelslike);

		const forecastSymbol = document.createElement("img");
		forecastSymbol.classList = "forecast-symbol";
		let icon = forecastData.list[0].weather[0].icon;
		forecastSymbol.src = getIcon(icon);
		forecast.appendChild(forecastSymbol);

		forecastContent.appendChild(forecast);
	}
};

const getDayString = (x) => {
	const today = new Date();
	let nextDay = new Date();
	nextDay.setDate(today.getDate() + x);
	nextDay = nextDay.toLocaleString("en-us", { weekday: "long" });

	return nextDay;
};

async function init() {
	const city = "Jena";
	const { lat, lon } = await getLocationCoordiantes(city);
	const weather = await getCurrentWeather(lat, lon);
	const forecast = await getForecast(lat, lon);
	updateWeather(weather);
	updateForecast(forecast);
}

init();
