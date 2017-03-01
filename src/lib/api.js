import axios from 'axios';
import storage from 'store';
import join from 'url-join';

const apiClient = axios.create();

const rejectWithError = message => () => (
  new Promise((resolve, reject) => reject({
    response: {data: {message}}
  }))
);

const errorHandler = error => {
  if (error) {
    if (error.response) {
      const errorMessage = error.response.data && error.response.data.message;
      return Promise.reject(errorMessage);
    } else {
      return Promise.reject(error.message);
    }
  }
};

apiClient.interceptors.request.use(config => {
  const settings = storage.get('settings') || {};
  if (settings.token) {
    config.headers['Authorization'] = `Bearer ${settings.token}`;
  }
  if (!settings.baseUrl) {
    config.adapter = rejectWithError('Please provide all required settings');
  }
  config.url = join(settings.baseUrl, config.url);
  return config;
}, errorHandler);

apiClient.interceptors.response.use(response => response.data, errorHandler);

export const sendCampaign = (canonicalMessage) =>
  apiClient.post(`campaigns/test`, canonicalMessage);

export const fetchLists = (params = {}) =>
  apiClient.get('lists', {params});

export default apiClient;
