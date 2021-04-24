const utils = require('./utils.js');

function cocktailSort(data) {
    let swapped = false;
    let movements = [];
    do {
        for (let i = 0; i < data.length - 2; i++) {
            if (data[i] > data[i+1]) {
                swapped = true;
                utils.swap(data, i, i+1, movements);
            }
        }
        if (!swapped) {
            break;
        }
        swapped = false;
        for (let i = data.length - 2; i >= 0; i--) {
            if (data[i] > data[i+1]) {
                swapped = true;
                utils.swap(data, i, i+1, movements);
            }
        }
    } while (swapped);
    return {
        sorted: data,
        movements,
        name: 'cocktailSort',
    }
}

module.exports = cocktailSort;