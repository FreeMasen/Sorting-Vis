const utils = require('./utils.js');
function partition(arr, lo, hi, movements) {
    let piv = arr[hi];
    let i = lo;
    for (let j = lo; j < hi; j++) {
        if (arr[j] <= piv) {
            utils.swap(arr, i, j, movements);
            i++;
        }
        
    }
    utils.swap(arr, i, hi, movements);
    return i
}

function _quickSort(arr, lo, hi, movements) {
    if (lo < hi) {
        let p = partition(arr, lo, hi, movements);
        _quickSort(arr, lo, p-1, movements);
        _quickSort(arr, p+1, hi, movements);
    }
    
}

function quickSort(arr) {
    let movements = [];
    _quickSort(arr, 0, arr.length - 1, movements);
    return {
        sorted: arr,
        movements,
        name: 'quickSort',
    };
}

module.exports = quickSort;