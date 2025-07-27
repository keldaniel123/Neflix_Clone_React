import React, { useState } from 'react';
import './login.css';
import logo from '../../../assets/logo.png';
import { login, signup } from '../../firebase';
import netflix_spinner from '../../../assets/netflix_spinner.gif';
import { useNavigate } from 'react-router-dom'; //  Import useNavigate

const Login = () => {
  const [signState, setSignState] = useState('Sign In');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); //  Hook to redirect user

  const user_auth = async (event) => {
    event.preventDefault();
      if (!email || !password || (signState === 'Sign Up' && !name)) {
      alert('Please fill out all fields.');
      return;
    }
    setLoading(true);

    try {
      if (signState === 'Sign In') {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }

      //  After login or signup, redirect to homepage
      navigate('/');
    } catch (error) {
      console.error('Authentication Error:', error.message);
      // Optionally show a toast or alert here
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="login-spinner">
      <img src={netflix_spinner} />
    </div>
  ) : (
    <div className="login">
      <img src={logo} className="login-logo" alt="" />

      <div className="login-form">
        <h1>{signState}</h1>

        <form>
          {signState === 'Sign Up' && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />

          <button onClick={user_auth} 
          type="submit" disabled={loading}>
          {loading ? 'Please wait...' : signState}
          </button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label>Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>

        <div className="form-switch">
          {signState === 'Sign In' ? (
            <p>
              New to Netflix?{' '}
              <span onClick={() => setSignState('Sign Up')}>Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span onClick={() => setSignState('Sign In')}>Sign In Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
