import api from './api';

export const submitResults = async () => {
  const response = await api.post('/results/submit');
  return response.data.data;
};

export const fetchMyResults = async () => {
  const response = await api.get('/results/my');
  return response.data.data;
};
