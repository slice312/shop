
const JWT_TOKEN_KEY = "zeon-store-jwt-token";


const getToken = () => {
    return localStorage.getItem(JWT_TOKEN_KEY);
};


const saveToken = (token) => {
    localStorage.setItem(JWT_TOKEN_KEY, token);
};


export const Auth = {
    getToken,
    saveToken
};