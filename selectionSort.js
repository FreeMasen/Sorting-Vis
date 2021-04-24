const utils = require('./utils.js');

function selectionSort(data) {
    let movements = [];
    let i, j;
    for (i = 0; i < data.length-1; i++) {
        for (j = i+1; j < data.length; j++) {
            if (data[j] < data[i]) {
                utils.swap(data, j, i, movements)
            }
        }
    }
    return {
        sorted: data,
        movements,
        name: 'selectionSort',
    };
}

module.exports = selectionSort;
