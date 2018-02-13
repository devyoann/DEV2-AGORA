$(document).ready(function() {


    $('#submit').click(function() {

        var apikey = "appid=b2459737dfd1c99d3526c231400b6b68";

        var value = $('#search').val();
        $('h1').html(value)

        var _u = 'http://api.openweathermap.org/data/2.5/weather?q=' + value + '&units=metric&' + apikey;

        $.get(_u, function(data, status) {
            console.log(data)
            console.log(status)
        });
    });


});