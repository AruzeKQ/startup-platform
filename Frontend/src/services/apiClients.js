const BASE_URL = 'http://localhost:3000/api'

async function fetchClient(endpoint, { method = 'GET', data, ...customConfig } = {}) {
    // khai báo header
    const headers = {
        'Content-Type': 'application/json',
    }

    // ghi đè nếu như có một thuộc tính header mới
    const config = {
        method,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    }

    // nếu có data gửi đi -> chuyển thành chuỗi JSON
    if (data) {
        config.body = JSON.stringify(data)
    }

    try {
        // gọi api + đường dẫn
        const response = await fetch(`${BASE_URL}${endpoint}`, config);

        // chuyển dữ liệu trả về sang JSON
        const result = response.json();

        if (!response.ok) {
            throw new Error("Got Error!!!")
        }

        return result;
    } catch (error) {
        console.error("bị lỗi skibidi rồi!!!")
        throw error;
    }
}

// ezi obj to use :>
export const apiClient = {
    get: (endpoint) => fetchClient(endpoint, { method: 'GET' }),
    post: (endpoint, data) => fetchClient(endpoint, { method: 'POST', data }),
    put: (endpoint, data) => fetchClient(endpoint, { method: 'PUT', data }),
    delete: (endpoint) => fetchClient(endpoint, { method: 'DELETE' }),
};