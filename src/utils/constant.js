let API = ''
if (import.meta.env.VITE_BUILD_MODE === 'dev') {
    API = 'http://localhost:8000'
} else {
    API = 'https://ba-taska.onrender.com'
}
console.log("🚀 ~ API:", API)
export const API_ROOT = API
