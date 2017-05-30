const request = require('request');

var forecastWeather = (results, callback) => {

    var lattitude = results.latitude;
    var longitude = results.longitude;
    request({
        url: `https://api.darksky.net/forecast/c1460667d05279d4d2e8e1766386403d/${lattitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: (body.currently.temperature-32)*(5/9),
                apparentTemperature:(body.currently.apparentTemperature-32)*(5/9),
                windSpeed : body.currently.windSpeed,
                weatherHumidity : body.currently.humidity,
                climate: body.currently.summary
            });

        } else {
            callback('Unable to connect Forecast.io servers');
        }

    })
}
module.exports.forecastWeather = forecastWeather;
