const vars = new Map<string, string>();

// Fetch the backend URL
const viteBackendUrl = "http://localhost:5000";

console.log('VITE_BACKEND_BASE_URL:', viteBackendUrl);

if (typeof viteBackendUrl === 'string' && viteBackendUrl) {
  vars.set('backendUrl', viteBackendUrl);
} else {
  console.warn('Backend URL is not defined. Please check your environment variables.');
}

export default vars;