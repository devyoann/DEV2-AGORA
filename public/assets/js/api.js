$(document).ready(function() {

    var date = moment().format("dddd Do MMMM YYYY");
    $('.date').html(date);

    var input = document.querySelector('#searchweather');

    var apikeyopenweather = "appid=b2459737dfd1c99d3526c231400b6b68";

    // open weather today
    var getWeatherLocation = function() {
        var value = input.value;
        var _u = 'http://api.openweathermap.org/data/2.5/weather?q=' + value + '&units=metric&' + apikeyopenweather;

        $.ajax({
            type: 'GET',
            url: _u,
            dataType: 'JSON',
            success: function(data, status) {
                document.querySelector('h1').innerHTML = value;
                document.querySelector('#locationdesc p').innerHTML = value + " - Météo pour aujourd'hui : Maximales de " + data.main.temp_max + "°" + " et Minimales de " + data.main.temp_min + "°";
                document.querySelector('#locationinfotoday .todayinfo').innerHTML = data.main.temp +  "° C";
            },
        })
    }
    getWeatherLocation();

    var getWeatherLocationForecast = function() {
        var value = input.value;
        var _u = 'http://api.openweathermap.org/data/2.5/forecast/?q=' + value + '&units=metric&' + apikeyopenweather;

        $.ajax({
            type: 'GET',
            url: _u,
            dataType: 'JSON',
            success: function(data) {
                for(i = 0; i < data.list.length; i++){
                    console.log(data.list[i].dt_txt)
                }
            }
        })
    }
    getWeatherLocationForecast();

    // pixabay
    var getImage = function() {
        var API_KEY = '3852484-dcff6a580832c511738ec56e7';
        var _uimage = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(input.value) + "&category=places&orientation=horizontal";

        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        $.ajax({
            type: 'GET',
            url: _uimage,
            dataType: 'JSON',
            success: function(data) {
                for (i = 0; i < data.hits.length; i++) {
                    document.querySelector('#locationimg .bg-img').style.backgroundImage = 'url(' + data.hits[getRandom(0, data.hits.length)].webformatURL + ')';
                    //console.log(data.hits[0].webformatURL)
                }
            }
        })
    }
    getImage();

    document.querySelector('#submitweather').addEventListener('click', function() {
        getWeatherLocation();
        getImage();
    })
    input.addEventListener("keyup", function(event) {
        event.preventDefault();
        console.log('allez')
        if (event.keyCode === 13) {
            getWeatherLocation();
            getImage();
        }
    });
});