const mapVodafoneStores = (store) => {
    return {
        storeName: store.name,
        phoneNumber: store.tel,
        address: { add: store.add },
        openStatusText: store.openStatusText,
        addressLines: [store.add],
        location: {
            type: 'Point',
            coordinates: [store.longitude,
                store.latitude]
        }
    }
}

const mapStarbucksStores = (store) => {
    return {
        storeName: store.name,
        phoneNumber: store.phoneNumber,
        address: store.address,
        openStatusText: store.openStatusText,
        addressLines: store.addressLines,
        location: {
            type: 'Point',
            coordinates: [store.coordinates.longitude,
                store.coordinates.latitude]
        },
    }
}

module.exports = {mapStarbucksStores, mapVodafoneStores}