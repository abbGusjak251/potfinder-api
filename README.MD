# Potfinder API

The API for Potfinder 

A project by Axel Åhman, Mattias Ohlsson and Gustav Jakobsson

## Get all location pinpoints

GET http://localhost:PORT/api/data

## Get location pinpoint by id

GET http://localhost:PORT/api/data/:id

## Add location pinpoint to database

POST http://localhost:PORT/api/data {lon, lat}

## Delete location pinpoint from database

DELETE http://localhost:PORT/api/data/:id