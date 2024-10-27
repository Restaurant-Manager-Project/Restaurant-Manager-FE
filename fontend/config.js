const API_BASE_URL = 'https://restaurant-manager-be-1.onrender.com';

const API_URLS = {
    GET_PRODUCTS: `${API_BASE_URL}/api/products`,
    GET_TABLE: (qr_code) => `${API_BASE_URL}/tables?code=${qr_code}`,
    POST_ORDER: `${API_BASE_URL}/api/order`,
    GET_ORDERS_FROM_TABLE: (qr_code) => `${API_BASE_URL}/api/table/${qr_code}/details-orders`,
    POST_CLIENT: `${API_BASE_URL}/api/clients`,
    GET_CLIENT_BY_PHONE: (phone) => `${API_BASE_URL}/api/clients/search?phone=${phone}`
};

export default API_URLS;