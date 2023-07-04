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
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      getWeather(lat, lon);
    });
   
}
// finished and tested
function getWeather(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
         var weatherDiv = $('<div>').addClass('card');
      var titleEL = $('<h3>').addClass('card-title').text(data.name);
      var imageIcon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` )
      var tempEL = $('<h4>').addClass('card-text').text('Temp: ' + Math.round(data.main.temp) + String.fromCharCode(186));
      var humidtyEL = $('<h4>').addClass('card-text').text('Humidty: ' + data.main.humidity + '%' );
      var windEL = $('<h4>').addClass('card-text').text('Wind Speed: ' + data.wind.speed + 'mph' );
      
      currentWeatherEL.append(weatherDiv.append(titleEL.append(imageIcon), tempEL, humidtyEL,windEL));
      

      // weatherData.push(data);
      getFiveDayForecast(lat, lon);
    });
}

function getFiveDayForecast(lat, lon) {
  console.log(lat, lon);
  fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      console.log(data);
              for (var i = 0; i < data.list.length; i++) {
            var forecast = data.list[i];
            
            var targetTime = forecast.dt_txt.split(' ').pop();
            console.log(targetTime);
            if(targetTime === "12:00:00"){
              
              weatherData.push(forecast);
            }
            
        
        }
        console.log(weatherData);
    });
}

formID.addEventListener('submit', function(evt){
  evt.preventDefault();
   var city = cityInput.value;
    // if(city === '') {
    //     return ;
    // }
    // if(!cities.includes(city)) {
    //     cities.push(city);
    // }
    // localStorage.setItem('cities', JSON.stringify(cities));
    // console.log(cities);
    getGeo(city);
});
