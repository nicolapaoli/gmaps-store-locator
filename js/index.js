let map;
let markers = []
let infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 41.9422053, lng: 11.6715747 },
        zoom: 11
    })
    infoWindow = new google.maps.InfoWindow();
    getStores()
}

const onEnter = (e) => {
    if (e.key === 'Enter')
        getStores()
}

const noStoresFound = () => {
    const html = `
        <div class="no-stores-found">
            No stores found
        </div>
    `

    document.getElementById('stores-list').innerHTML = html;
}

const getStores = () => {
    const zip = document.getElementById('zipcode').value
    console.log(zip)
    let API_URL = `http://localhost:3000/api/stores?zip_code=${zip}`
    if (!zip) return;
    fetch(API_URL, {
        method: 'GET'
    }).then(response => {
        if (response.status === 200)
            return response.json()
        throw new Error(response)
    }).then(data => {
        clearLocations();
        if (data.length > 0) {
            searchLocationNear(data)
            setOnClickListener()
        } else {
            noStoresFound();
        }
    }).catch(err => {
        console.log(err)
    })
}

const searchLocationNear = (storeList) => {
    let bounds = new google.maps.LatLngBounds();
    let storesHtml = ""
    storeList.forEach((store, index) => {
        createMarker(store, index)
        storesHtml += createStoreHtml(store, index)
        bounds.extend(new google.maps.LatLng(
            store.location.coordinates[1],
            store.location.coordinates[0]
        ))
    })
    map.fitBounds(bounds)
    document.getElementById('stores-list').innerHTML = storesHtml
}

const clearLocations = () => {
    infoWindow.close();
    markers.map(m => {
        m.setMap(null)
    })
    markers.length = 0
}

const createMarker = (store, index) => {
    let marker = new google.maps.Marker({
        position: {
            lat: store.location.coordinates[1],
            lng: store.location.coordinates[0]
        },
        map,
        label: `${index + 1}`
    });
    let info = `
    <div class="store-info-window">
        <div class="store-info-name">
            ${store.storeName}
        </div>`
    if (store.openStatusText)
        info +=`<div class="store-info-open-status">
            ${store.openStatusText}
        </div>`
    info += `<div class="store-info-address">
            <div class="icon">
                <i class="fas fa-location-arrow"></i>
            </div>
            <span>
                ${store.addressLines[0]}
            </span>
        </div>
        `
    if (store.phoneNumber) {
        info += `
        <div class="store-info-phone">
            <div class="icon">
                <i class="fas fa-phone-alt"></i>
            </div>
            <span>
                <a href="tel:${store.phoneNumber}">${store.phoneNumber}</a>
            </span>
        </div>`
    }
        info += `
            <div>
            `
    google.maps.event.addListener(marker, 'click', () => {
        infoWindow.setContent(info)
        infoWindow.open(map, marker)
    })
    markers.push(marker)
}

const setOnClickListener = () => {
    let storeElements = document.querySelectorAll('.store-container');
    storeElements.forEach((store, index) => {
        store.addEventListener('click', () => {
            google.maps.event.trigger(markers[index], 'click')
        })
    })
}

const createStoreHtml = (store, index) => {
    return `
    <div class="store-container">
                <div class="store-container-backgound"> 
                    <div class="store-info-container">
                        <div class="store-address">
                            <span>${store.storeName}<span>    
                        </div>
                        <div class="store-phone-number">
                            <span>${store.addressLines[0]}<span>
                            <br><span>${store.phoneNumber}</span>
                        </div>
                    </div>
                    <div class="store-number-container">
                        <div class="store-number">
                            ${index+1}
                        </div>
                    </div>
                </div>
            </div>`
}