const request = require('request');

const forecast = (lat, long, callback) => {
    const Weatherstack_APIAccessKey = '8e784c85c1cf445c64576aac4b9dbefa';
    const Weatherstack_baseURL = 'http://api.weatherstack.com/current';
    let currentQuery = Weatherstack_baseURL + '?access_key=' + Weatherstack_APIAccessKey;
    currentQuery += `&query=${lat},${long}`;
    currentQuery += '&units=f'
    console.log(currentQuery);

    request({url: currentQuery, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to Weather stack.', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            const data = response.body.current;
            callback(undefined, {
                temp: data.temperature,
                feelslike: data.feelslike,
                desc: data.weather_descriptions
            })
        }
    })
};

module.exports = forecast;