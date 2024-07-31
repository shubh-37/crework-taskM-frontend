import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
