var searchbtn = document.querySelector('.btn');
var formID = document.getElementById('formID');
var apiKey = '5fb3261485fbd16f27a2aaa4d57b4602';
var cities = JSON.parse(localStorage.getItem('cities')) || [];
var cityInput = document.querySelector('.form-control');
var weatherData = [];
var currentWeatherEL = $('#currentWeather');


// finished, and test
function getGeo(city) {
  fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=' + apiKey)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      getWeather(lat, lon);
    });

}
// finished and tested and writing in jquery for practice.
function getWeather(lat, lon) {
  fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      var weatherDiv = $('<div>').addClass('card');
      var titleEL = $('<h3>').addClass('card-title').text(data.name);
      var imageIcon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
      var tempEL = $('<h4>').addClass('card-text').text('Temp: ' + Math.round(data.main.temp) + '°F');
      var humidtyEL = $('<h4>').addClass('card-text').text('Humidty: ' + data.main.humidity + '%');
      var windEL = $('<h4>').addClass('card-text').text('Wind Speed: ' + data.wind.speed + 'mph');

      currentWeatherEL.append(weatherDiv.append(titleEL.append(imageIcon), tempEL, humidtyEL, windEL));


      // weatherData.push(data);
      getFiveDayForecast(lat, lon);
    });
}

// writing in vanilla javascript sorry if the code is weird look at both just practicing 
function getFiveDayForecast(lat, lon) {
  console.log(lat, lon);
  fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      console.log(data);
      var fiveDayForecastEl = document.getElementById('fiveDayForecast');
      fiveDayForecastEl.classList.add('day-card');
      fiveDayForecastEl.innerHTML = '';

      for (var i = 0; i < data.list.length; i++) {
        var forecast = data.list[i];

        var targetTime = forecast.dt_txt.split(' ').pop();

        if (targetTime === "12:00:00") {
          weatherData.push(forecast);
          // gonna create a var for each element that im going to create for each value
          var dayEl = document.createElement('h2');
          dayEl.classList.add('date');

          var forecastEl = document.createElement('h2');
          forecastEl.classList.add('temperature');

          var iconEl = document.createElement('img');

          var humidtyEL = document.createElement('h2');
          humidtyEL.classList.add('humidty');

          var windEL = document.createElement('h2');
          windEL.classList.add('wind');



          // next set of code is to set the innner text or img of that elemen to the values in the api.
          var temperatureInFah = convertCtoF(forecast.main.temp);
          forecastEl.textContent = 'Temperature: ' + Math.round(temperatureInFah) + '°F';

          var forecastDate = new Date(forecast.dt * 1000);
          var forecastDay = forecastDate.toLocaleString('en-US', { month: 'short', day: 'numeric' });
          dayEl.textContent = forecastDay

          humidtyEL.textContent = ' Humidty: ' + (forecast.main.humidity);

          windEL.textContent = ' Wind Speed: ' + (forecast.wind.speed) + 'mph';



          iconEl.src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;


          fiveDayForecastEl.append(dayEl);
          dayEl.append(forecastEl);
          dayEl.append(iconEl);
          dayEl.append(windEL);
          dayEl.append(humidtyEL);
        }
      }
      console.log(weatherData);
    });
}

function convertCtoF(tempInKelvin) {
  return ((tempInKelvin - 273.15) * 9) / 5 + 32;
}

formID.addEventListener('submit', function (evt) {
  evt.preventDefault();
  var city = cityInput.value;
  var currentWeatherEl = document.getElementById('currentWeather');
  var buttonEl = document.getElementsByClassName('btn btn-primary');
  var cities = JSON.parse(localStorage.getItem('cities')) || [];

  if (city !== '') {
    if (!cities.includes(city)) {
      cities.push(city);

    }

    localStorage.setItem('cities', JSON.stringify(cities));
    cityBtns(cities);
  }

  // making sure to clear the values of the of the html when the form is submitted
  cityInput.value = '';
  currentWeatherEl.innerHTML = '';



  function cityBtns(cities) {
    var cityBtnContainer = document.getElementById('cityButtons');
    cityBtnContainer.innerHTML = '';

    cities.forEach(function (city) {
      var button = document.createElement('button');
      button.classList.add('city-button');
      button.textContent = city;
      button.addEventListener('click', function () {
        var btntext = button.innerText;
        getGeo(btntext);
        currentWeatherEl.innerHTML = '';
      });

      // now that 
      var cityBtnContainer = document.getElementById('cityButtons');
      cityBtnContainer.append(button);
    });
  }

  var elements = document.querySelectorAll('.hide');
  elements.forEach(function (element) {
    element.classList.remove('hide');
  });
  getGeo(city);
});
localStorage.clear();
