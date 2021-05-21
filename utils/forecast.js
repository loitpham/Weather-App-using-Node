const request = require('request');

const forecast = (lat, long, callback) => {
    const Weatherstack_APIAccessKey = '8e784c85c1cf445c64576aac4b9dbefa';
    const Weatherstack_baseURL = 'http://api.weatherstack.com/current';
    let url = Weatherstack_baseURL + '?access_key=' + Weatherstack_APIAccessKey;
    url += `&query=${lat},${long}`;
    url += '&units=f'
    console.log(url);

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Weather stack.', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const {temperature, feelslike, weather_descriptions} = body.current;
            callback(undefined, {
                temperature,
                feelslike,
                weather_descriptions
            })
        }
    })
};

module.exports = forecast;