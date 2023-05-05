# Potfinder API

An API for Potfinder UF AB. It allows users to easily get, post, change and delete segments and measurements in the potfinder database. 

A project by Axel Åhman, Mattias Ohlsson and Gustav Jakobsson.

## Get all location pinpoints

GET http://localhost:PORT/api/data

## Get location pinpoint by id

GET http://localhost:PORT/api/data/:id

## Add location pinpoint to database

POST http://localhost:PORT/api/data {lon, lat}

## Delete location pinpoint from database

DELETE http://localhost:PORT/api/data/:id