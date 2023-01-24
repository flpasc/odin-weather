const APIKey = "ba838de580d82dd8a358c9ee77591f26";
const BTNsearch = document.getElementById("btn-search");
let lat = "";
let lon = "";
let weather = "";

BTNsearch.addEventListener("click", async () => {
	let city = document.getElementById("search").value;
	await getLocationCoordiantes(city);
	await getCurrentWeather(lat, lon);
	updateWeather(weather);
});

async function getCurrentWeather(lat, lon) {
	let currentWeatherURL =
		"https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric" + "&appid=" + APIKey;
	const response = await fetch(currentWeatherURL);
	const currentWeather = await response.json();
	console.log(currentWeather);
	weather = currentWeather;
}

async function getLocationCoordiantes(city) {
	let locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;
	const response = await fetch(locationURL);
	const locationData = await response.json();

	lat = locationData[0].lat;
	lon = locationData[0].lon;
	console.log("lat: " + lat + " // lon: " + lon);
}

const updateWeather = (obj) => {
	console.log("updatingWeather");

	// weather-current div
	const description = document.getElementById("weather-info");
	const city = document.getElementById("weather-city");
	const date = document.getElementById("weather-date");
	const time = document.getElementById("weather-time");
	const temperature = document.getElementById("weather-temperature");
	const units = document.getElementById("weather-units");
	let currentDate = new Date();

	description.textContent = obj.weather[0].description;
	city.textContent = obj.name;
	date.textContent = currentDate.getDate() + " / " + currentDate.getMonth() + 1 + " / " + currentDate.getFullYear();
	time.textContent = currentDate.getHours() + ":" + currentDate.getMinutes();
	temperature.textContent = obj.main.temp;

	//weather-details div
	const feelslike = document.getElementById("weather-feelslike-info");
	const humidity = document.getElementById("weather-humidity-info");
	const rain = document.getElementById("weather-rain-info");
	const wind = document.getElementById("weather-wind-info");

	feelslike.textContent = obj.main.feels_like;
	humidity.textContent = obj.main.humidity;
	// rain.textContent = obj.main.humidity; catch ERROR if not in response!
	wind.textContent = obj.wind.speed;
};
console.log("HELLO");
