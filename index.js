const heapSort = require('./heapSort.js');
const quickSort = require('./quickSort.js');
const bubbleSort = require('./bubbleSort.js');
const cycleSort = require('./cycleSort.js');
const combSort = require('./combSort.js');
const selectionSort = require('./selectionSort.js');
const cocktailSort = require('./cocktailSort.js');

const data = [
    Math.floor(10000 * 0.5096),
    Math.floor(10000 * 0.4939),
    Math.floor(10000 * 0.4941),
    Math.floor(10000 * 0.5052),
    Math.floor(10000 * 0.5052),
    Math.floor(10000 * 0.5052),
    Math.floor(10000 * 0.4824),
    Math.floor(10000 * 0.4825),
    Math.floor(10000 * 0.4819),
    Math.floor(10000 * 0.4828),
    Math.floor(10000 * 0.4825),
    Math.floor(10000 * 0.4827),
    Math.floor(10000 * 0.4826),
];

function movement(value, from, to) {
    return {
        value,
        from,
        to,
    };
}

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

const height = 70;
const radius = 5;
function buildNodes(len) {
    let nodes = [];
    for (let i = 0; i < len; i++) {
        let x = (radius * 2 * i);
        nodes.push({
            x,
            y_top: ((height/2) - radius),
            y_bot: ((height/2) + radius),
            html: `    <circle fill="#000" cx="${x}" cy="${height/2}" r="${radius}" />\n`,
        });

    }
    return nodes;
}

function render(movements, nodes) {
    let svg = `<svg version="1.1"
    baseProfile="full"
    xmlns="http://www.w3.org/2000/svg" width="${(radius*2*13)+25}px" height="${height}px" viewBox="0 0 100 ${height}">\n`
    let top = true;
    let dist = 30;
    for (let node of nodes) {
        svg += node.html;
    }
    for (let move of movements) {
        if (move.from === move.to) {
            dist += 5;
            continue;
        }
        let from = nodes[move.from];
        let to = nodes[move.to];
        let start_x = from.x;
        let end_x = to.x;
        let start_y, mid_y, mid_x;
        if (from.x > to.x) {
            let d = from.x - to.x;
            mid_x = from.x - (d / 2);
        } else {
            let d = to.x - from.x;
            mid_x = from.x + (d / 2);
        }
        if (top) {
            start_y = from.y_top;
            mid_y = from.y_top - ((Math.abs(move.from - move.to) / 13) * dist);
        } else {
            start_y = from.y_bot;
            mid_y = from.y_bot + ((Math.abs(move.from - move.to) / 13) * dist);
        }
        svg += `    <path stroke-width="0.5" d="M ${start_x} ${start_y} Q ${mid_x} ${mid_y} ${end_x} ${start_y}" fill="none" stroke="#000" />\n`;
        top = !top;
    }
    return svg + '</svg>'

}

function assert_sorted(data, name) {
    let copy = [...data];
    copy.sort();
    for (let i = 0; i < data.length; i++) {
        if (copy[i] !== data[i]) {
            throw new Error(`${name} Unsorted: ${data}`);
        }
    }
}

/**
 * 
 * @param {string} s 
 * @returns string
 */
function camel_to_spaced(s) {
    let ret = s.substr(0, 1).toUpperCase();
    for (let i = 1; i < s.length; i++) {
        let ch = s.substr(i, 1);
        if (ch.toUpperCase() === ch) {
            ret += ` ${ch}`
        } else {
            ret += ch;
        }
    }
    return ret;
}

async function main() {
    const path = require('path');
    const fs = require('fs').promises;
    let nodes = buildNodes(data.length);
    let results = [
        shellSort([...data]),
        heapSort([...data]),
        quickSort([...data]),
        bubbleSort([...data]),
        cycleSort([...data]),
        combSort([...data]),
        selectionSort([...data]),
        cocktailSort([...data]),
    ];
    let images = [];
    for (let result of results) {
        assert_sorted(result.sorted, result.name);
        let file_name = `${result.name}.svg`;
        let img_path = path.join('docs', file_name);
        images.push({
            file_name,
            sort_name: camel_to_spaced(result.name),
        });
        await fs.writeFile(
            img_path,
            render(result.movements, nodes),
        );
    }
    let html = `<html>
    <head>
        <link type="text/css" rel="stylesheet" href="./style.css" />
    </head>
    <body>
    <h1>Sorting Visualizations</h1>
    `;
    for (let img of images) {
        html += `<div class="image">
        <h2>${img.sort_name}</h2>
        <img src="./${img.file_name}" />
    </div>
`;
    }
    html += `</body>
</html>`;
    await fs.writeFile(path.join('docs', 'index.html'), html);
    return 'success!';
}

main().then(console.log).catch(e => console.error('Failed', e));