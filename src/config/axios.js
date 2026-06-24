import axios from "axios";
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,// ubah menjadi mengambil nilai dari env
    withCredentials: false,
    crossdomain: true,
    headers:{}
});
instance.interceptors.request.use(function (config) {
    const lang = localStorage.getItem('i18nextLng');
    config.headers['Accept-Language'] = lang === "en-GB" ? "en" : lang;
    return config;
}, function (error) {
    return Promise.reject(error);
});
export default instance;