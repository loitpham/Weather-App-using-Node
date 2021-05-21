const request = require('request');

const geocode = (location, callback) => {
    const Mapbox_APIToken = 'pk.eyJ1IjoibG9pcGhhbSIsImEiOiJja290Z285N3gwNDFlMm9sZmk0czBlOXU0In0.gwKAJr2R00dIebtPx-1y2g';
    const Mapbox_baseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    const limit = 1;
    const url = Mapbox_baseURL + encodeURIComponent(location) + '.json?access_token=' + Mapbox_APIToken + `&limit=${limit}`;
    console.log(url);
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Mapbox.', undefined);
        } else if (body.features.length === 0) {
            callback('No search results.', undefined);
        } else {
            const data = body.features[0].center;
            const [longitude, latitude] = data;
            callback(undefined, {
                latitude,
                longitude,
                location: body.features[0].place_name
            });
        }
    })
};

module.exports = geocode