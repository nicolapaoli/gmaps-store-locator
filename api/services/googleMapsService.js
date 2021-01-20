const axios = require('axios');

const GoogleMapsURL = `https://maps.googleapis.com/maps/api/geocode/json`

class GoogleMaps {
    
    async getCoordinates(zipCode) {
        return axios.get(GoogleMapsURL, {
            params: {
                address: zipCode,
                key: process.env.GOOGLE_MAPS_API_KEY
            }
        }).then(response => {
            const data = response.data;
            return [
                data.results[0].geometry.location.lng,
                data.results[0].geometry.location.lat
            ]
        }).catch(err => {
            console.log('Error', err.message)
            throw new Error('Erro retrieving coordinates')
        })
    }
}

module.exports = GoogleMaps;