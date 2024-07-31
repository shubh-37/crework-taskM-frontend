import axios from 'axios';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const authContext = createContext();

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  async function signUpUser(user) {
    try {
      //http://localhost:5000/register
      const response = await axios.post('https://crework.bilzo.in/register', user);
      if (response.status === 201) {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));

          navigate('/');
          return 'success';
        }
      }
    } catch (error) {
      if (error.response.status === 500) {
        return 'unknown';
      } else if (error.response.status === 409) {
        return 'failure';
      }
    }
  }

  async function loginUser(user) {
    try {
      //http://localhost:5000/login
      const response = await axios.post('https://crework.bilzo.in/login', user);
      if (response.status === 200) {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.userInstance));
          navigate('/');
          return 'success';
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        return 'unknown';
      } else if (error.response.status === 404) {
        return 'failure';
      }
    }
  }

  function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }
  return <authContext.Provider value={{ token, logoutUser, signUpUser, loginUser }}>{children}</authContext.Provider>;
}
