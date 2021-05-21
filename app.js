const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const location = process.argv[2];

if (location) {
    console.log(location);
    geocode(location, (error, geocodeData) => {
        if (error) {
            console.log(error);
        } else {
            const { latitude, longitude, location } = geocodeData;
            forecast(latitude, longitude, (error, forecastData) => {
                const { weather_descriptions, temperature, feelslike } = forecastData;
                if (error) {
                    console.log(error);
                } else {
                    console.log(location);
                    console.log(`${weather_descriptions.join(' and ')}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`);
                }
            });
        }
    });
} else {
    console.log('Please provide a location.');
}

