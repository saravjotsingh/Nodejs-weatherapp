const yargs = require('yargs');

const geocode = require('./geocode.js');
const forecast = require('./forecast.js');

const argv = yargs
    .options({
        address: {
            demand: false,
            describe: 'Address',
            alias: 'a',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;


if (argv.address === undefined) {
    argv.address = 'patiala punjab';

}

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        forecast.forecastWeather(results, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`LOCATION : ${results.address}`);
                console.log(`Temperature:${weatherResults.temperature.toFixed(0)}\xB0C`);
                console.log(`Apparent Temperature:${weatherResults.apparentTemperature.toFixed(0)}\xB0C`);
                console.log(`Wind Speed: ${weatherResults.windSpeed}`);
                console.log(`Humidity : ${weatherResults.weatherHumidity}`);
                console.log(`Current Climate: ${weatherResults.climate}`);
            }


        })

        //console.log(JSON.stringify(results, undefined, 2));
    }

});

//forecast.forecastWeather();
