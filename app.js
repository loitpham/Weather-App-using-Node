const request = require('request');

const Weatherstack_APIAccessKey = '8e784c85c1cf445c64576aac4b9dbefa';
const Weatherstack_baseURL = 'http://api.weatherstack.com/current';
let currentQuery = Weatherstack_baseURL + '?access_key=' + Weatherstack_APIAccessKey;
currentQuery += '&query=Seattle';
currentQuery += '&units=f'
console.log(currentQuery);

request({ url: currentQuery, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to Weather stack.');
    } else if (response.body.error) {
        console.log('Unable to find location');
    } else {
        const data = response.body.current;
        console.log(data);
        console.log(`${data.weather_descriptions.join(' and ')}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`);
    }
});

const Mapbox_APIToken = 'pk.eyJ1IjoibG9pcGhhbSIsImEiOiJja290Z285N3gwNDFlMm9sZmk0czBlOXU0In0.gwKAJr2R00dIebtPx-1y2g';
const Mapbox_baseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const location = 'Seattle';
const limit = 1;
const Mapbox_URL = Mapbox_baseURL + location + '.json?access_token=' + Mapbox_APIToken + `&limit=${limit}`;
console.log(Mapbox_URL);

request({ url: Mapbox_URL, json: true}, (error, response) => {
    if (error) {
        console.log('Unable to connect to Mapbox.')
    } else if (response.body.features.length === 0) {
        console.log('No search results.');
    } else {
        const data = response.body.features[0].center;
        const [long, lat] = data;
        console.log(lat, long);
    }
});