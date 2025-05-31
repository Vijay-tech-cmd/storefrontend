import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Decode token to get user info
      const userData = JSON.parse(atob(token.split('.')[1]));
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    fetch('https://fakestorebackend-di9i.onrender.com/api/store')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);
        
      });
  }, []);

  const handleAddToCart = (product) => {
    setCart(prev => {
      const existingProduct = prev.find(item => item.id === product.id);
      if (existingProduct) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleBuyNow = (product) => {
    handleAddToCart(product);
    navigate('/cart');
  };

  const filterByCategory = (category) => {
    const result = products.filter(p => p.category === category);
    setFiltered(result);
  };

  const showAll = () => setFiltered(products);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchResults = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(searchResults);
  };

  const goToCartPage = () => {
    navigate('/cart', { state: { cart } });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <>
      <Navbar 
        user={user} 
        cartCount={cart.length} 
        onCartClick={goToCartPage}
        cartTotal={calculateTotal()}
      />

      <div className="home-container">
        {/* Search Section */}
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>

        {/* Category Filters */}
        <div className="category-filters">
          <button className="category-button" onClick={showAll}>All</button>
          <button className="category-button" onClick={() => filterByCategory("men's clothing")}>Men's Clothing</button>
          <button className="category-button" onClick={() => filterByCategory("women's clothing")}>Women's Clothing</button>
          <button className="category-button" onClick={() => filterByCategory("electronics")}>Electronics</button>
          <button className="category-button" onClick={() => filterByCategory("jewelery")}>Jewelry</button>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filtered.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-info">
                <h4>{product.title}</h4>
                <p className="product-price">${product.price}</p>
                <p className="product-description">{product.description.slice(0, 100)}...</p>
                <div className="product-buttons">
                  <button className="add-button" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                  <button className="buy-button" onClick={() => handleBuyNow(product)}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
