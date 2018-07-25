const request = require('request');


const fetchGeoCodeData = (address, callback) => {

    const encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAQg6zrfDtcJeduHoE8Tca44Wf84VWSluw`,
        json: true
    }, (error,reponse,body) => {
        if(error){
            callback('Unable to connect to Google servers');
        } else if(body.status === "ZERO_RESULTS"){
            callback('Please enter a valid search request');
        } else if(body.status === 'OK'){

            callback(undefined,  {
                address: `${body.results[0].formatted_address}`,
                latitude: `${body.results[0].geometry.location.lat}`,
                longitude: `${body.results[0].geometry.location.lng}`
            });
        }
    });
}



module.exports = {
    fetchGeoCodeData
};