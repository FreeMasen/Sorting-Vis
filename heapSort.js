const utils = require('./utils.js');

function maxHeapify(arr, n, i, movements) {
    let largest = i;
    let l = 2 * i + 1; //left child index
    let r = 2 * i + 2; //right child index

    //If left child is smaller than root
    if (l < n && arr[l] > arr[largest]) {
        largest = l;
    }

    // If right child is smaller than smallest so far 
    if (r < n && arr[r] > arr[largest]) {
        largest = r;
    }

    // If smallest is not root 
    if (largest != i) {
        utils.swap(arr, i, largest, movements);
        // Recursively heapify the affected sub-tree 
        maxHeapify(arr, n, largest, movements);
    }
}

// main function to do heap sort 
function heapSort(arr) {
    let n = arr.length;
    let movements = [];
    // Build heap (rearrange array) 
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        maxHeapify(arr, n, i, movements);
    }

    // One by one extract an element from heap 
    for (let i = n - 1; i >= 0; i--) {
        // Move current root to end 
        utils.swap(arr, 0, i, movements);

        // call max heapify on the reduced heap 
        maxHeapify(arr, i, 0, movements);
    }
    return {
        sorted: arr,
        movements,
        name: 'heapSort',
    }
}

module.exports = heapSort;
