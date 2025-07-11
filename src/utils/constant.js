let API = 'https://ba-taska.onrender.com'
if (import.meta.env.VITE_BUILD_MODE === 'dev') {
    API = 'http://localhost:8000'
} else {
    API = 'https://ba-taska.onrender.com'
}
console.log("🚀 ~ API:", import.meta.env.VITE_BUILD_MODE)
export const API_ROOT = API
