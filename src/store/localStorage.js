const tokenKey = 'todosome-v-1.0.1'

export const setToken = (token) => {
    localStorage.setItem(tokenKey, token);
};

export const getToken = () => {
    const token = localStorage.getItem(tokenKey);
    if (token) {
        return token;
    }
    setToken("");
    return "";
}