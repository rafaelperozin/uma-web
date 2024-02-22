import axios from 'axios';

import { rootStore } from '../stores/root.store';

export const MULTIPART_HEADER = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};

const instance = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

// instance.defaults.headers.common['API-KEY'] = import.meta.env.VITE_API_KEY;
instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use(config => {
  const { user } = rootStore;

  if (user.isAuthenticated && config.headers) {
    config.headers['Authorization'] = user.userToken;
  }

  // if (application.isAuthenticated && application.step === 2 && config.headers) {
  //   console.log('Content-Type = multipart/form-data')
  //   config.headers['Content-Type'] = 'multipart/form-data';
  // }

  return config;
});

export default instance;
