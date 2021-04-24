const utils = require('./utils.js');

function bubbleSort(data) {
    let movements = [];
    let n = data.length;
    let swapped;
    do {
        swapped = false;
        for (i = 1; i < n; i++) {
            if (data[i-1] > data[i]) {
                swapped = true;
                utils.swap(data, i-1, i, movements);
            }
        }
    } while(swapped)
    return {
        sorted: data,
        movements,
        name: 'bubbleSort',
    }
}

module.exports = bubbleSort;
