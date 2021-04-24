const utils = require('./utils.js');

function cycleSort(array) {
    let movements = [];
    for (let currentIndex = 0; currentIndex < array.length - 1; currentIndex++) {
        let item = {
            value: array[currentIndex],
            idx: currentIndex,
        };

        let currentIndexCopy = currentIndex
        for (let i = currentIndex + 1; i < array.length; i++)
            if (array[i] < item.value)
                currentIndexCopy++

        if (currentIndexCopy == currentIndex)
            continue

        while (item == array[currentIndexCopy])
            currentIndexCopy++

        let temp = {
            value: array[currentIndexCopy],
            idx: currentIndexCopy,
        }
        movements.push({
            value: item.value,
            from: item.idx,
            to: currentIndexCopy,
        });
        array[currentIndexCopy] = item.value;
        item = temp

        // repeat above steps as long as we can find values to swap
        while (currentIndexCopy != currentIndex) {
            currentIndexCopy = currentIndex
            // loop through all indexes that proceed the currentIndex
            for (let i = currentIndex + 1; i < array.length; i++)
                if (array[i] < item.value)
                    currentIndexCopy++

            // skip duplicates
            while (item.value == array[currentIndexCopy])
                currentIndexCopy++

            // swap
            temp = {
                value: array[currentIndexCopy],
                idx: currentIndexCopy,
            };
            movements.push({
                value: item.value,
                from: item.idx,
                to: currentIndexCopy,
            });
            array[currentIndexCopy] = item.value;
            item = temp
        }
    }
    return {
        sorted: array,
        movements,
        name: 'cycleSort',
    }
}

module.exports = cycleSort;