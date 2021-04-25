function shellSort(data) {
    let movements = []
    let out = [];
    let gaps = [6, 4, 1]
    for (let gap of gaps) {
        for (let i = gap; i < data.length; i += 1) {
            let temp = data[i];
            let j;
            for (j = i; j >= gap && data[j - gap] > temp; j -= gap) {
                let from = j - gap;
                let value = data[from];
                movements.push({
                    value,
                    from,
                    to: j
                });
                data[j] = value;
            }
            movements.push({
                value: temp,
                from: i,
                to: j,
            });
            data[j] = temp;
          }
    }
    return {
        movements,
        sorted: out,
        name: 'shellSort'
    }
}

module.exports = shellSort;