var searchbtn = document.querySelector('.btn');
var apiKey = '5fb3261485fbd16f27a2aaa4d57b4602';
var cities = JSON.parse(localStorage.getItem('cities')) || [];
var cityInput = document.querySelector('.form-control');
var weatherData = [];


function getGeo(city) {
  console.log(city);
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

function getWeather(lat, lon) {
  console.log(lat, lon);
  fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      weatherData.push(data);
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
        for (var i = 0; i < data.list.length; i++) {
            var forecast = data.list[i];
            
        
        }
    });
}

searchbtn.addEventListener('click', function(){
    var city = cityInput.value;
    if(city === '') {
        return ;
    }
    if(!cities.includes(city)) {
        cities.push(city);
    }
    localStorage.setItem('cities', JSON.stringify(cities));
    console.log(cities);
    getGeo(city);
});
