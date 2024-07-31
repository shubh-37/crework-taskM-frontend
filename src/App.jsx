import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequiresAuth from './components/RequiresAuth';
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <RequiresAuth>
              <LandingPage />
            </RequiresAuth>
          }
        />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
