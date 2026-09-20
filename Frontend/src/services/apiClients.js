const BASE_URL = 'http://localhost:3000/api'

async function fetchClient(endpoint, { method = 'GET', data, ...customConfig } = {}) {
    // khai báo header
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'x-auth-token': token } : {}),
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
        const contentType = response.headers.get('content-type') || '';

        // kiểm tra dạng trả về của BE (Json hay Text)
        const result = contentType.includes('application/json') ? await response.json() : await response.text()


        if (!response.ok) {
            const errorText = typeof result === 'object' ? (result.message || JSON.stringify(result)) : result;
            throw new Error(`HTTP ${response.status}: ${errorText}`)
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