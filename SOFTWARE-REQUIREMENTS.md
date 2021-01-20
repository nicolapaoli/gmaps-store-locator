## SOFTWARE REQUIREMENT DOCUMENT

### Goals

- Build a Google Maps Store Locator to allow users to find stores near them

### User Stories

1. As a user, I want to see a list of all the available stores so that I can see where all the stores are
2. As a user, I want to enter my zip code so that I can see the stores around me
3. As a user, I want to see a list of stores around my zip code so hat I can find the closest stores around me
4. As a user, I want to be able to see all the location of the stores on the map, so that I know where they are located
5. As a user, I want to click on the store and have the store information on the map, so that I can get more info about the store
6. As a user, I want to be able to click directions so that I can get directions to the store
7. As a user, I want to be able to click on the phone number of the store so that I can make a call to the store directly

### Components

- User
- App
- Backend (API)
- DB

### Flow diagram

1. HomePage (App) -> /stores (API) -> All Stores (DB)
2. Search Zip Code (app) -> /stores/?zip= (API) -> find Stores (DB)
3. Click Store -> showInfo (App)
4. Click Directions -> redirect to google Directions
5. Click phone number -> generate phone link (app)

### Business Requirements

- Allow a user to see the list of the store
- Allow a user to find stores 2 miles near ZIP Code
- Allow user to get directions to the store
- Allow user to call directly to the store
- Show the following info on the store:
  - Address
  - Phone number
  - Name
  - Opening status

### Technical Requirements

- Google Maps Javascript API
- Node.js API
- Mondo DB Atlas for DB
- Google Maps Geocode to geocode ZIPCodes
- API Endpoints
  - /stores
    - retrieve list of stores
  - /stores?zip=..
    - retrieve stores based on zip code
  - POST / stores
    - add store to DB
