import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('https://fakestorebackend-di9i.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Signup successful! Please login.');
        navigate('/login');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      alert('An error occurred during signup');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={signup}>
        <h2>Signup</h2>
        <input 
          placeholder="Full Name" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          placeholder="Email" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          placeholder="Password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className={isLoading ? 'loading' : ''} disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Signup'}
        </button>

        <p>
          Already have an account?{' '}
          <Link to="/login" className="auth-link">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
