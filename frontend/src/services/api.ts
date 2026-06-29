const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const getAuthToken = () => localStorage.getItem('token');
export const setAuthToken = (token: string) => localStorage.setItem('token', token);
export const removeAuthToken = () => localStorage.removeItem('token');

const getHeaders = () => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Bypass-Tunnel-Reminder': 'true',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const fetchApi = async (endpoint: string, options?: RequestInit) => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...getHeaders(),
      ...options?.headers,
    },
  });

  let data;
  try {
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await res.json();
    } else {
      const text = await res.text();
      // If the response is HTML, it's likely a misconfigured API URL returning the frontend's index.html
      if (text.startsWith('<!DOCTYPE') || text.startsWith('<html')) {
        throw new Error('API URL is misconfigured. Expected JSON but received HTML. Please check VITE_API_URL in Netlify.');
      }
      throw new Error(`Unexpected non-JSON response: ${text.substring(0, 50)}...`);
    }
  } catch (err: any) {
    if (err.message.includes('API URL is misconfigured')) {
      throw err;
    }
    throw new Error('Failed to parse API response');
  }

  if (!res.ok) {
    if (res.status === 401) {
      removeAuthToken();
      window.location.href = '/login';
      // Return a pending promise to prevent throwing an error and triggering alerts while redirecting
      return new Promise(() => {});
    }
    throw new Error(data?.error || data?.message || 'Something went wrong');
  }
  return data;
};
