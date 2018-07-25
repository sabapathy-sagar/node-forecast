const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.fetchGeoCodeData(argv.address, (error, results) => {
    if(error){
        console.log(error);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
        weather.getWeatherData(results.latitude,results.longitude, (error, weatherResults) => {
            if(error){
                console.log(error);
            } else {
                console.log(`The current temperature is ${weatherResults.temperature}, it feels like ${weatherResults.apparentTemperature}`);
            }
        });
    }
});

