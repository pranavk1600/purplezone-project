import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('grammar_token') || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('grammar_user');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, [token]);

  const setSession = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('grammar_token', jwtToken);
    localStorage.setItem('grammar_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('grammar_token');
    localStorage.removeItem('grammar_user');
    navigate('/login');
  };

  const login = async (credentials) => {
    setLoading(true);
    const response = await loginUser(credentials);
    setSession({ name: response.data.name, email: response.data.email, id: response.data.id }, response.data.token);
    setLoading(false);
    navigate('/dashboard');
  };

  const register = async (payload) => {
    setLoading(true);
    const response = await registerUser(payload);
    setSession({ name: response.data.name, email: response.data.email, id: response.data.id }, response.data.token);
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
