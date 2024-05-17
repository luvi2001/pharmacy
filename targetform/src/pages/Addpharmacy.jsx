import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Addpharmacy() {
  const [pharmacyName, setPharmacyName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming your backend server is running at http://localhost:5000
      await axios.post('/api/form/pharmacy', {
        pharmacyName
      });
      // Optionally, you can handle success or redirect to another page
      console.log('Data submitted successfully');
      alert('Pharmacy added successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      setErrorMessage('Error submitting data');
    }
  };

  return (
    <>
      <Navbar />
      <div className='container'>
        <h2>Add Pharmacy</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Pharmacy Name:</label>
            <input
              type="text"
              value={pharmacyName}
              onChange={(e) => setPharmacyName(e.target.value)}
            />
          </div>
          {errorMessage && <div>{errorMessage}</div>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Addpharmacy;
