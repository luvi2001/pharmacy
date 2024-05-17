import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function MedicineForm() {
  const [medicineName, setMedicineName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming your backend server is running at http://localhost:5000
  
      // Step 1: Fetch all pharmacies
      const response = await axios.get('/api/form/pharmacy');
      const pharmacies = response.data;
  
      // Step 2: Add the new medicine to each pharmacy
      const updatedPharmacies = pharmacies.map(async pharmacy => {
        pharmacy.medicines.push({ name: medicineName, stockCount: 0 });
        await axios.put(`/api/form/pharmacy/${pharmacy._id}`, pharmacy);
      });
  
      // Step 3: Wait for all updates to complete
      await Promise.all(updatedPharmacies);
  
      // Optionally, you can handle success or redirect to another page
      console.log('Medicine added successfully to all pharmacies');
    } catch (error) {
      console.error('Error adding medicine:', error);
      setErrorMessage('Error adding medicine');
    }
  };
  
  return (
    <>
    <Navbar />
    <div className='container'>
      <h2>Add Medicine</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Medicine Name:</label>
          <input
            type="text"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
          />
        </div>
        {errorMessage && <div>{errorMessage}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  );
}

export default MedicineForm;
