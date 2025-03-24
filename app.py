import numpy as np

def dct_1d(signal):
    N = len(signal)
    result = np.zeros(N)
    factor = np.pi / (2 * N)
    for k in range(N):
        sum_val = 0
        for n in range(N):
            sum_val += signal[n] * np.cos((2 * n + 1) * k * factor)
        result[k] = sum_val * (1 / np.sqrt(N)) if k == 0 else sum_val * np.sqrt(2 / N)
    return result

def dct_2d(matrix):
    N, M = matrix.shape
    temp = np.zeros((N, M))
    result = np.zeros((N, M))
    # Áp dụng DCT theo hàng
    for i in range(N):
        temp[i, :] = dct_1d(matrix[i, :])
    # Áp dụng DCT theo cột
    for j in range(M):
        result[:, j] = dct_1d(temp[:, j])
    return result

def quantize(dct_matrix, quant_matrix):
    return np.round(dct_matrix / quant_matrix).astype(int)

def inverse_quantize(quantized_matrix, quant_matrix):
    return quantized_matrix * quant_matrix

# Thay đổi ma trận đầu vào theo dữ liệu của bạn
input_matrix = np.array([
     [89, 59, 21, 21],
     [41, 66, 4, 90],
     [61, 38, 30, 14],
     [75, 52, 60, 42]
], dtype=float)

# Thay đổi ma trận lượng tử hóa tùy theo mức độ nén mong muốn
quant_matrix = np.array([
    [8, 16, 19, 22],
    [16, 16, 22, 24],
    [19, 22, 26, 27],
    [22, 22, 26, 27]
], dtype=float)

# Ma trận đầu vào
print("Ma trận đầu vào:\n", input_matrix)
print("................................")
# Tính DCT 2D
dct_matrix = dct_2d(input_matrix)
print("Ma trận DCT 2 chiều:\n", np.round(dct_matrix).astype(int))
print("................................")

# Áp dụng lượng tử hóa
quantized_matrix = quantize(dct_matrix, quant_matrix)
print("Ma trận sau lượng tử hóa:\n", quantized_matrix)
print("................................")

# Áp dụng nghịch lượng tử hóa
reconstructed_dct = inverse_quantize(quantized_matrix, quant_matrix)
print("Trọng số:\n", np.round(reconstructed_dct).astype(int))
print("................................")
