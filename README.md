# Google Maps Store Locator

## Software Requirements document

[Click here](./SOFTWARE-REQUIREMENTS.md) to see the document

## Usage

### Requirements

- Mongo DB
- Google Maps API on Google Cloud Platform
- Geocoding API on Google Cloud Platform

### Config

You need the following env var on the `.env` file:

```
MONGODB_USER=<mongodb-username>
MONGODB_PWD=<mongodb-password>
GOOGLE_MAPS_API_KEY=<google-maps-api-key>
```

### Setup API

```
cd api
npm i && npm run start
```

### Setup App

First, make sure you put your own GOOGLE MAPS API KEY in [index.html](index.html)

Then, just open [index.html](index.html) or run it in a live server

## Aknowledgements

Thanks to [CleverProgrammers](https://github.com/CleverProgrammers/) for content, idea and ispiration

Thanks to [Vodafone](https://github.com/CleverProgrammers/) for publishing the list of stores in Italy
