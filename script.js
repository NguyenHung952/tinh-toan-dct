document.getElementById("generateMatrix").addEventListener("click", function () {
    let rows = parseInt(document.getElementById("matrixRows").value);
    let cols = parseInt(document.getElementById("matrixCols").value);
    let matrixInput = document.getElementById("matrixInput");
    matrixInput.innerHTML = "";

    let table = document.createElement("table");
    for (let i = 0; i < rows; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement("td");
            let input = document.createElement("input");
            input.type = "number";
            input.min = "0";
            input.max = "255";
            input.value = "0";
            input.className = "matrix-input";
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    matrixInput.appendChild(table);
    document.getElementById("computeDCT1D").style.display = "block";
    document.getElementById("computeDCT2D").style.display = "block";
});

function dct1D(matrix) {
    let N = matrix.length;
    return matrix.map((_, k) => matrix.reduce((sum, val, n) => sum + val * Math.cos(((2 * n + 1) * k * Math.PI) / (2 * N)), 0) * (k === 0 ? Math.sqrt(1 / N) : Math.sqrt(2 / N)));
}

function dct2D(matrix) {
    return matrix.map(row => dct1D(row)).map((_, j, temp) => temp.map(row => dct1D(row.map((_, i) => temp[i][j]))));
}

function formatMatrix(matrix) {
    return "<table>" + matrix.map(row => "<tr>" + row.map(v => `<td>${isNaN(v) ? '0.00' : v.toFixed(2)}</td>`).join('') + "</tr>").join('') + "</table>";
}

document.getElementById("computeDCT1D").addEventListener("click", function () {
    let inputs = document.querySelectorAll(".matrix-input");
    let rows = parseInt(document.getElementById("matrixRows").value);
    let cols = parseInt(document.getElementById("matrixCols").value);
    let matrix = Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => parseFloat(inputs[i * cols + j].value) || 0));
    let result = matrix.map(row => dct1D(row));
    document.getElementById("matrixResult").innerHTML = "<h3>DCT 1D Kết quả:</h3>" + formatMatrix(result);
});

document.getElementById("computeDCT2D").addEventListener("click", function () {
    let inputs = document.querySelectorAll(".matrix-input");
    let rows = parseInt(document.getElementById("matrixRows").value);
    let cols = parseInt(document.getElementById("matrixCols").value);
    let matrix = Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => parseFloat(inputs[i * cols + j].value) || 0));
    let result = dct2D(matrix);
    document.getElementById("matrixResult").innerHTML = "<h3>DCT 2D Kết quả:</h3>" + formatMatrix(result);
});
