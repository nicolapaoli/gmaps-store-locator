require('dotenv').config()
const { mapVodafoneStores } = require('./helper.js');
const express = require('express');
const mongoose = require('mongoose');

const Store = require('./models/store')
const GoogleMapsService = require('./services/googleMapsService');
const googleMapsService = new GoogleMapsService()

const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*")
    next()
});

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@cluster0.fpo82.mongodb.net/mongo?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use(express.json({
    limit: '50mb'
}));

app.get('/api/stores', (req, res) => {
    const zip = req.query.zip_code;
    return googleMapsService.getCoordinates(zip)
        .then(coordinates => {
            Store.find({
                location: {
                    $near: {
                        $maxDistance: 5000,
                        $geometry: {
                            type: 'Point',
                            coordinates: coordinates
                        }
                    }
                }
            }, (err, stores) => {
                if (err)
                    res.status(500).send(err)
                console.log(`${stores.length} stores retrieved!`)
                res.status(200).send(stores)
            })
        }).catch(err => {
            console.log(err)
            res.status(500).send(err.message)
        })
})

app.post('/api/stores', (req, res) => {
    const dbStores = []
    let stores = req.body
    stores.forEach(store => {
        if (store.longitude && store.latitude)
        dbStores.push(mapVodafoneStores(store))
    })
    Store.create(dbStores, (err,stores) => {
        if (err) {
            return res.status(500).send(err)
        }
        console.log(`${stores.length} stores saved`)
        res.status(200).send(stores)
    })
})

app.delete('/api/stores', (req, res) => {
    Store.deleteMany({}, err => {
        res.status(200).send(err)
    })
})

app.listen(port, () => {
    console.log('Server starting at http://localhost:3000')
})