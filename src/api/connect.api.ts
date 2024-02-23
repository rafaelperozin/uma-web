import axios from 'axios';

import { rootStore } from '../stores/root.store';

export const headersMultipart = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};

const instance = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

// instance.defaults.headers.common['API-KEY'] = import.meta.env.VITE_API_KEY;
instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use(config => {
  const { user } = rootStore;

  console.log('user.isAuthenticated', user.isAuthenticated);
  console.log('config.headers', config.headers);
  if (user.isAuthenticated && config.headers) {
    config.headers['Authorization'] = `Bearer ${user.userToken}`;
  }

  return config;
});

export default instance;
