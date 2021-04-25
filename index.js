const heapSort = require('./heapSort.js');
const quickSort = require('./quickSort.js');
const bubbleSort = require('./bubbleSort.js');
const cycleSort = require('./cycleSort.js');
const combSort = require('./combSort.js');
const selectionSort = require('./selectionSort.js');
const cocktailSort = require('./cocktailSort.js');
const shellSort = require('./shellSort.js');

/**
 * The base data to sort
 * @type number[]
 */
let data;
/**
 * The calculated minimum width of the svg
 * @type number
 */
let min_width;

/**
 * The height of the svg
 * @type number
 */
const height = 50;
/**
 * The radius of each node
 */
const radius = 5;

/**
 * parse the provided cli args
 * @param {string[]} args process.argv.slice(2)
 * @returns number[]
 */
async function parse_args(args) {
    switch (args.length) {
        case 0: 
            console.log('default args');
            return [
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
        case 1:
            let n = +args[0]
            if (Number.isNaN(n)) {
                console.log('parsing json input')
                let contents = await fs.readFile(args[0]);
                return JSON.parse(contents);
            }
            console.log('single arg');
            return [n];
        default:
            console.log('parsing args')
            return args.map(parseFloat).filter(arg => !Number.isNaN(arg));
    }
}
/**
 * Build the node objects for this sorting pass
 * @param {number} len The number of nodes to generate
 * @returns {x: number, y_top: number, y_bot: number, html: string}[]
 */
function buildNodes(len) {
    min_width = radius * 2 * data.length
    let nodes = [];
    for (let i = 0; i < len; i++) {
        let x = (radius * 2 * i)+radius;
        nodes.push({
            x,
            y_top: ((height/2) - radius) + 0.25,
            y_bot: ((height/2) + radius) - 0.25,
            html: `    <circle fill="#000" cx="${x}" cy="${height/2}" r="${radius}" />\n`,
        });

    }
    return nodes;
}

/**
 * Render the results 
 * @param {{from: number, to: number, value: number}} movements A list of movements required to sort `nodes`
 * @param {{x: number, y_top: number, y_bot: number, html: string}[]} nodes Array of <circle> svg strings
 * @returns string
 */
function render(movements, nodes) {
    let svg = `<svg
    version="1.1"
    baseProfile="full"
    xmlns="http://www.w3.org/2000/svg"
    width="${min_width}px"
    height="${height}px"
    viewBox="0 0 ${min_width} ${height}"
>\n`;
    let top = true;
    let dist = 30;
    for (let node of nodes) {
        svg += node.html;
    }
    for (let move of movements) {
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
            mid_y = from.y_top - ((Math.abs(move.from - move.to) / data.length) * dist);
        } else {
            start_y = from.y_bot;
            mid_y = from.y_bot + ((Math.abs(move.from - move.to) / data.length) * dist);
        }
        svg += `    <path stroke-linecap="round" stroke-width="0.25" d="M ${start_x} ${start_y} Q ${mid_x} ${mid_y} ${end_x} ${start_y}" fill="none" stroke="#000" />\n`;
        top = !top;
    }
    return svg + '</svg>'

}

/**
 * Check the provided array is sorted
 * @param {number[]} data The sorted array to test
 * @param {string} name The name of the sorting method
 */
function assert_sorted(data, name) {
    let copy = [...data];
    copy.sort();
    for (let i = 0; i < data.length; i++) {
        if (typeof(copy[i]) !== 'number') {
            throw new Error(`Invalid copy, index ${i} is not a number`);
        }
        if (copy[i] !== data[i]) {
            throw new Error(`${name} Unsorted:\n\tdata:\t${data}\n\tsorted:\t${copy}\n\tindex:\t${i}`);
        }
    }
}

/**
 * Convert a camel case string into a title format string
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
    data = await parse_args(process.argv.slice(2));
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