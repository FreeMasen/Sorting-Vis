const utils = require('./utils.js');

function combSort(data) {
    let movements = []
    let gap = data.length;
    let shrink = 1.3;
    let sorted = false;
    while(!sorted) {
        gap = Math.floor(gap / shrink);
        if (gap <= 1) {
            gap = 1;
            sorted = true;
        }
        let i = 0;
        while (i + gap < data.length) {
            if (data[i] > data[i+gap]) {
                sorted = false;
                utils.swap(data, i, i+gap, movements);
            }
            i += 1;
        }
    }
    return {
        sorted: data,
        movements,
        name: 'combSort',
    };
}

module.exports = combSort;
