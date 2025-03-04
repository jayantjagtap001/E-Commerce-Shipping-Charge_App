import React from 'react';
import NearestWarehouse from '../components/NearestWarehouse';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Shipping Estimator</h1>
      <NearestWarehouse />
    </div>
  );
};

export default Home;
