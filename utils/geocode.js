const request = require('request');

const geocode = (location, callback) => {
    const Mapbox_APIToken = 'pk.eyJ1IjoibG9pcGhhbSIsImEiOiJja290Z285N3gwNDFlMm9sZmk0czBlOXU0In0.gwKAJr2R00dIebtPx-1y2g';
    const Mapbox_baseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    const limit = 1;
    const Mapbox_URL = Mapbox_baseURL + encodeURIComponent(location) + '.json?access_token=' + Mapbox_APIToken + `&limit=${limit}`;
    console.log(Mapbox_URL);
    request({url: Mapbox_URL, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to Mapbox.', undefined);
        } else if (response.body.features.length === 0) {
            callback('No search results.', undefined);
        } else {
            const data = response.body.features[0].center;
            const [long, lat] = data;
            callback(undefined, {
                latitude: lat,
                longitude: long,
                location: response.body.features[0].place_name
            });
        }
    })
};

module.exports = geocode