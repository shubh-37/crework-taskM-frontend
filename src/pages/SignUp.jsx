import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../context/AuthContextProvider';
import '../css/login.css';
import { toast } from 'react-toastify';

export default function SignUpPage() {
  const { signUpUser, loginUser } = useContext(authContext);
  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const emailChecker =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function notify(event, type) {
    event.preventDefault();
    if (type === 'failure') {
      toast.error('User already exists. Please login.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } else if (type === 'wrong email') {
      toast.error('Please enter valid email ID!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } else if (type === 'success') {
      toast.success('Sign up successful!', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } else {
      toast.error('Please try again after sometime!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  }
  function userHandler(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }
  async function submitUser(e) {
    e.preventDefault();
    if (user?.emailId.match(emailChecker)) {
      const response = await signUpUser(user);
      if (response === 'success') {
        notify(e, response);
      } else {
        notify(e, response);
      }
    } else {
      notify(e, 'wrong email');
    }
  }
  async function guestLogin(e) {
    const response = await loginUser({ emailId: 'joe.gardner@gmail.com', password: '123' });
    if (response === 'success') {
      notify(e, response);
    } else {
      notify(e, response);
    }
  }
  return (
    <div className="background">
      <div className="signup-parent">
        <h2 className="signup-heading">
          Welcome to <span style={{ color: '#4534ac' }}>WorkFlo</span>!
        </h2>
        <form onSubmit={(e) => submitUser(e)} className="form-parent">
          <label htmlFor="name"></label>
          <input type="text" name="name" id="name" required placeholder="Full name" onChange={(e) => userHandler(e)} />
          <label htmlFor="email"></label>
          <input
            type="text"
            name="emailId"
            id="email"
            required
            placeholder="Your email"
            onChange={(e) => userHandler(e)}
          />
          <label htmlFor="password"></label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              id="password"
              name="password"
              onChange={(e) => userHandler(e)}
              style={{ paddingRight: '30px', width: '86%' }} // to ensure text doesn't overlap with icon
            />
            <span
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer'
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️' : '🙈'}
            </span>
          </div>
          <label htmlFor="remember" style={{ fontSize: 'x-small' }}>
            <input type="checkbox" name="remember" id="remember" />
            Remember me
          </label>
          <button type="submit" className="signup-btn">
            Sign up
          </button>
        </form>
        <button className="signup-btn" onClick={(e) => guestLogin(e)}>
          Guest login
        </button>
        <p className="signup-text">
          Already have an account?
          <Link to="/login" className="signup-link">
            {' '}
            Log in.
          </Link>
        </p>
      </div>
    </div>
  );
}
