import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (savedUser && savedUser.email === formData.email && savedUser.password === formData.password) {
      localStorage.setItem('isAuthenticated', 'true');
      alert('Please sining!');
      navigate('/welcome');
    } else {
      alert('ভুল ইমেইল অথবা পাসওয়ার্ড!');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p>No Account<Link to="/signup">Sineup</Link></p>
    </div>
  );
};

const styles = {
  container: { 
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    textAlign: 'center' },

  form: { 
    display: 'flex',
    flexDirection: 'column',
    gap: '10px' },

  input: { 
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd' },

  button: { 
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff', border: 'none',
    borderRadius: '4px',
    cursor: 'pointer' }
};

export default Login;