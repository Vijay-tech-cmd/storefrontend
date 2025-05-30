import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://fakestorebackend-di9i.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Server response:', data); // Debug log
      
      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        navigate('/home');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err); // Debug log
      setError('Unable to connect to the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign-in functionality here
    alert('Google Sign-in functionality coming soon!');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={login}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <input 
          placeholder="Email" 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button type="submit" className={isLoading ? 'loading' : ''} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <button 
          type="button" 
          className="google-button"
          onClick={handleGoogleSignIn}
        >
          <img 
            src="https://www.google.com/favicon.ico" 
            alt="Google" 
            className="google-icon"
          />
          Sign in with Google
        </button>

        <p className="auth-redirect">
          Don't have an account?{' '}
          <Link to="/signup" className="auth-link">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
