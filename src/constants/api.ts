import ENV from './env';

const AVKONNECT_URL = {
    CORE: ENV.AVKONNECT_CORE_URL,
};

const API_ENDPOINTS = {
    GET_AUTH_USER: (): string => `${AVKONNECT_URL.CORE}/api/v1/auth/user`,
};

export default API_ENDPOINTS;
