const request = require('request');

const getWeatherData = (lat,lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/43390dba12dbabe46dd934b643b15bd6/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if(!error && response.statusCode === 200){
            //console.log(JSON.stringify(body.currently.temperature, undefined, 2));
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
           callback('Unable to fetch weather data');
        }
    })
}



module.exports = {
    getWeatherData
}