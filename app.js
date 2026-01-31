// This function displays the actual weatherData recieved from the getWeatherData function
function displayWeatherData(weatherData) {
    const weatherInformation = document.querySelector(".weather-information");

    weatherInformation.innerHTML = "";
    document.getElementById("input-area").value = "";

    console.log(weatherData);

    let areaDisplay = document.createElement("h1");
    areaDisplay.innerText = `Weather at ${weatherData.location.name} is ${weatherData.current.condition.text}`;
    areaDisplay.style.marginBottom = 0;

    let temperatureC = document.createElement("p");
    temperatureC.innerText = `Temperature: ${weatherData.current["temp_c"]}°C`;
    temperatureC.style.marginBottom = 0;

    let windSpeedMph = document.createElement("p");
    windSpeedMph.innerText = `Wind Speed: ${weatherData.current["gust_mph"]} mph`;
    windSpeedMph.style.marginBottom = 0;

    weatherInformation.append(areaDisplay, temperatureC, windSpeedMph);
}

// This function sends a request to the weather API and receives data from it and then returns is
async function getWeatherData(location) {
    const key = "API_KEY_GOES_HERE";

    const request = new Request(
        `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`,
    );
    const options = {
        headers: {
            "Content-Type": "application/json",
        },
        method: "GET",
    };

    return fetch(request, options)
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}

// This function handles the click received from the Event Listener for the check button
async function handleCheckButtonClick() {
    const valueOfInputField = document.getElementById("input-area").value;
    let weatherData = await getWeatherData(valueOfInputField);

    displayWeatherData(weatherData);
}

// This detects the clicking of the check button below the input field
document
    .getElementById("input-button")
    .addEventListener("click", handleCheckButtonClick);
