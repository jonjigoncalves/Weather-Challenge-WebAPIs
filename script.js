var searchbtn = document.getElementById('search-btn')
var apiKey = '5fb3261485fbd16f27a2aaa4d57b4602'
var cities =JSON.parse(localStorage.getItem('cities'))||[]


function getGeo(city){
    console.log(city);
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid='+apiKey).then(function(res){
       return res.json()
    }).then(function(data){
        console.log(data);
        var lat = data[0].lat
        var lon = data[0].lon
        getWeather(lat,lon);
    })
    // getWeather('51.4875167', '-0.1687007');
}
function getWeather(lat,lon){
    console.log(lat,lon);
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=imperial&appid='+apiKey)
    .then(function(res){
        return res.json()
     }).then(function(data){
         console.log(data);
         // var lat = data[0].lat
         // var lon = data[0].lon
         // getWeather(lat,lon);
     })
    getFivDayForcast(lat,lon)
}

function getFivDayForcast(lat,lon){
console.log(lat,lon);
fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid='+apiKey)
    .then(function(res){
        return res.json()
     }).then(function(data){
         console.log(data);
         // var lat = data[0].lat
         // var lon = data[0].lon
         // getWeather(lat,lon);
     })
}

searchbtn.addEventListener('click', function(){
    var city = document.querySelector('.input').value
    if(city ===''){
        return ;
    }
    if(!cities.includes(city)){
        cities.push(city)
        
    }
    localStorage.setItem('cities',JSON.stringify(cities))
    console.log(cities);
    getGeo(city);
})

// document.addEventListener('load', function(event){
//     event.preventDefault()
//     console.log('ok');
// })