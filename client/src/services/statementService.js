import api from './api';

export const fetchStatements = async (size = 3) => {
  const response = await api.get(`/statements/random?size=${size}`);
  return response.data.data;
};

export const saveStatementSubmission = async (statementId, correctedAnswer) => {
  const response = await api.put(`/statements/${statementId}/submission`, { correctedAnswer });
  return response.data.data;
};
