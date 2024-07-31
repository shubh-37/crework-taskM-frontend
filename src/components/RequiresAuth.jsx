import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from '../context/AuthContextProvider';

// eslint-disable-next-line react/prop-types
export default function RequiresAuth({ children }) {
  const { token } = useContext(authContext);
  return token ? children : <Navigate to="/login" />;
}
