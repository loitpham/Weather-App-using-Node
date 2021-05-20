const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const location = process.argv[2];

if (location) {
    console.log(location);
    geocode(location, (error, geocodeData) => {
        if (error) {
            console.log(error);
        } else {
            forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(geocodeData.location);
                    console.log(`${forecastData.desc.join(' and ')}. It is currently ${forecastData.temp} degrees out. It feels like ${forecastData.feelslike} degrees out.`);
                }
            });
        }
    });
} else {
    console.log('Please provide a location.');
}

