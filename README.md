# Geo Utilities

General collection of geographic related utilities.

## Getting Started

Directory structure and contents is as follows:
* /src      Various modules that can be reused.
* /utils    Standalone utilities that can be run under node.
* /data     Helpful data files.
* /tests    Mocha tests.

The /utils directory files also serve as helpful examples of how the /src files were originally intended to be used.

### Prerequisites

* nodejs, npm

### Installing

After getting the code, download the libraries.
```
npm install
```

### Running utilities

Examples of running the utilities:

* To generate random geo-coordinates around Australian cities, where the coordinates are generated in quantities proportional to the city populations, with a spread of up to 30 km around each city:
```
node generate-random-coords.js aust-city-geo-data.json
```

* Same as above, but with 1000 coordinates:
```
node generate-random-coords.js --locations aust-city-geo-data.json --count 1000
```

## Running the tests

```
npm test
```

To run the tests continuously watching for changes:
```
npm run watch
```

## Authors

* **Mark Cheeseman** - *Initial work* - [hombredequeso](https://github.com/hombredequeso)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


