const yargs = require('yargs');
const axios = require('axios');
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


const encodedAddress = encodeURIComponent(argv.address);

const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAQg6zrfDtcJeduHoE8Tca44Wf84VWSluw`;
 
axios.get(geocodeUrl)
    .then((result) => {
           // console.log('result--', JSON.stringify(result.data,undefined, 2));
            if(result.data.status === 'OK'){
                console.log(`Address: ${result.data.results[0].formatted_address}`);
               // return weather.
               const lat = result.data.results[0].geometry.location.lat;
               const lng = result.data.results[0].geometry.location.lng;

                return axios.get(`https://api.darksky.net/forecast/43390dba12dbabe46dd934b643b15bd6/${lat},${lng}`);

            } else {
                throw new Error('Unable to fetch data');
            }
        }
    )
    .then((res) => {
        console.log(`The current temperature is ${res.data.currently.temperature}, it feels like ${res.data.currently.apparentTemperature}`);
    })
    .catch((e) => {
            console.log('error--',e);
        }
    )

