

function swap(data, lhs, rhs, movements) {
    let value_l = data[lhs];
    let value_r = data[rhs];
    movements.push({
        value: value_l,
        from: lhs,
        to: rhs,
    }, {
        value: value_r,
        from: rhs,
        to: lhs,
    });
    data[rhs] = value_l;
    data[lhs] = value_r;
}


module.exports = {
    swap,
};