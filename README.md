# Sorting Visualization

This project generates a series of svg visualizations of sorting algorithms.

By default is uses 13 values generated in a very not random way, to provide
your own values you can provide them as command line arguments.

If one argument is provided, it can be a path to a json file containing a
single number array.

```sh$
node ./index.js ./path/to/data.json
```

You can also provide a list of numbers as arguments.

```sh$
node ./index.js 5 7 8 0 3 4 99 10 888 30
```
