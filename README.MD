# Potfinder API

The API for Potfinder 

A project by Axel Åhman, Mattias Ohlsson and Gustav Jakobsson

# Get all location pinpoints
```javascript GET http://localhost:PORT/api/data
```

# Get location pinpoint by id
```javascript GET http://localhost:PORT/api/data/:id
```

# Add location pinpoint to database
```javascript POST http://localhost:PORT/api/data {lon, lat}
```