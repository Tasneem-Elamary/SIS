import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to view this page.</p>
      <button onClick={handleBack} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Go Back to Home
      </button>
    </div>
  );
};

export default Unauthorized;
