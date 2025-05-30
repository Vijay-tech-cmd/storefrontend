import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, cartCount, cartTotal, onCartClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/home">Store</Link>
      </div>
      
      <div className="navbar-right">
        {user && (
          <div className="user-greeting">
            Hello {user.name}
          </div>
        )}
        
        <Link to="/home" className="nav-button home-button">
          Home
        </Link>

        <div className="cart-badge" onClick={onCartClick}>
          <span>Cart</span>
          <span className="cart-count">{cartCount}</span>
          {cartTotal > 0 && (
            <span className="cart-total">${cartTotal.toFixed(2)}</span>
          )}
        </div>

        {user && (
          <button className="nav-button logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
