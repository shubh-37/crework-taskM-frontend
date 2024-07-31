import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './context/AuthContextProvider.jsx';
import TaskContextProvider from './context/TaskContextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <TaskContextProvider>
          <App />
        </TaskContextProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
