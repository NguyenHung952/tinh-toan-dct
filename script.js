document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("computeDCT2D").addEventListener("click", computeDCT);
    document.getElementById("quantizeMatrix").addEventListener("click", quantizeMatrix);
    document.getElementById("inverseQuantizeMatrix").addEventListener("click", inverseQuantizeMatrix);
});

// 🔹 Hàm tính DCT 2D
function dct2D(matrix) {
    let N = matrix.length;
    let M = matrix[0].length;
    let dctMatrix = Array.from({ length: N }, () => Array(M).fill(0));

    for (let u = 0; u < N; u++) {
        for (let v = 0; v < M; v++) {
            let sum = 0;
            for (let i = 0; i < N; i++) {
                for (let j = 0; j < M; j++) {
                    sum += matrix[i][j] * 
                           Math.cos(((2 * i + 1) * u * Math.PI) / (2 * N)) * 
                           Math.cos(((2 * j + 1) * v * Math.PI) / (2 * M));
                }
            }
            let alphaU = (u === 0) ? 1 / Math.sqrt(N) : Math.sqrt(2 / N);
            let alphaV = (v === 0) ? 1 / Math.sqrt(M) : Math.sqrt(2 / M);
            dctMatrix[u][v] = alphaU * alphaV * sum;
        }
    }

    console.log("🔹 Ma trận DCT 2D:", dctMatrix);
    return dctMatrix;
}

// 🔹 Hàm lượng tử hóa
function quantize(dctMatrix, quantMatrix) {
    return dctMatrix.map((row, i) => 
        row.map((val, j) => Math.round(val / quantMatrix[i][j]))
    );
}

// 🔹 Hàm nghịch lượng tử hóa
function inverseQuantize(quantizedMatrix, quantMatrix) {
    return quantizedMatrix.map((row, i) => 
        row.map((val, j) => val * quantMatrix[i][j])
    );
}

// 🔹 Hàm xử lý Tính DCT 2D
function computeDCT() {
    let inputs = document.querySelectorAll(".matrix-input");
    let rows = parseInt(document.getElementById("matrixRows").value);
    let cols = parseInt(document.getElementById("matrixCols").value);

    let matrix = Array.from({ length: rows }, (_, i) => 
        Array.from({ length: cols }, (_, j) => parseFloat(inputs[i * cols + j].value) || 0)
    );

    console.log("🔹 Ma trận gốc:", matrix);
    let dctResult = dct2D(matrix);
    document.getElementById("matrixResult").innerHTML = "<h3>DCT 2D Kết quả:</h3>" + formatMatrix(dctResult);
}

// 🔹 Hàm xử lý lượng tử hóa
function quantizeMatrix() {
    let dctResult = getMatrixFromHTML("matrixResult");
    let quantMatrix = getMatrixFromHTML("quantizationMatrix");

    let quantizedMatrix = quantize(dctResult, quantMatrix);
    console.log("🔹 Ma trận lượng tử hóa:", quantizedMatrix);
    document.getElementById("quantizedResult").innerHTML = "<h3>Kết quả Lượng tử hóa:</h3>" + formatMatrix(quantizedMatrix);
}

// 🔹 Hàm xử lý nghịch lượng tử hóa
function inverseQuantizeMatrix() {
    let quantizedMatrix = getMatrixFromHTML("quantizedResult");
    let quantMatrix = getMatrixFromHTML("quantizationMatrix");

    let reconstructedMatrix = inverseQuantize(quantizedMatrix, quantMatrix);
    console.log("🔹 Ma trận nghịch lượng tử hóa:", reconstructedMatrix);
    document.getElementById("inverseQuantizedResult").innerHTML = "<h3>Trọng số (Nghịch lượng tử hóa):</h3>" + formatMatrix(reconstructedMatrix);
}

// 🔹 Hàm lấy ma trận từ HTML
function getMatrixFromHTML(id) {
    let table = document.getElementById(id);
    if (!table) return [];

    let rows = table.getElementsByTagName("tr");
    return Array.from(rows).map(row => 
        Array.from(row.getElementsByTagName("td")).map(cell => parseFloat(cell.innerText) || 0)
    );
}

// 🔹 Hàm định dạng ma trận thành HTML Table
function formatMatrix(matrix) {
    return "<table border='1'>" + matrix.map(row => 
        "<tr>" + row.map(val => `<td>${val.toFixed(2)}</td>`).join('') + "</tr>"
    ).join('') + "</table>";
}
