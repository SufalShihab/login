import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('registeredUser'));

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h1>Welcome, {user?.name || 'name'}! </h1>
      <p>Your have successfully logged in</p>
      <button onClick={handleLogout} style={styles.button}>logut</button>
    </div>
  );
};

const styles = {
  container: {
     maxWidth: '500px',
     margin: '50px auto',
    padding: '30px', 
    border: '1px solid #ccc',
    borderRadius: '8px',
    textAlign: 'center' },

  button: { padding: '10px 20px',
     fontSize: '16px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '15px' }
};

export default Welcome;