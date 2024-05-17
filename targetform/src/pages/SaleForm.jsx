import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function SaleForm() {
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [saleCount, setSaleCount] = useState('');

  useEffect(() => {
    // Fetch pharmacies from backend
    const fetchPharmacies = async () => {
      try {
        const response = await axios.get('/api/form/pharmacy');
        setPharmacies(response.data);
      } catch (error) {
        console.error('Error fetching pharmacies:', error);
      }
    };
    fetchPharmacies();
  }, []);

  useEffect(() => {
    // Fetch medicines for selected pharmacy from backend
    const fetchMedicines = async () => {
      if (selectedPharmacy) {
        try {
          const response = await axios.get(`/api/form/pharmacy/${selectedPharmacy}/medicine`);
          setMedicines(response.data);
        } catch (error) {
          console.error(`Error fetching medicines for pharmacy ${selectedPharmacy}:`, error);
        }
      }
    };
    fetchMedicines();
  }, [selectedPharmacy]);

  const handlePharmacyChange = (event) => {
    setSelectedPharmacy(event.target.value);
  };

  const handleMedicineChange = (event) => {
    setSelectedMedicine(event.target.value);
  };

  const handleSaleCountChange = (event) => {
    setSaleCount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/form/sales', {
        pharmacyId: selectedPharmacy,
        medicineId: selectedMedicine,
        saleCount: parseInt(saleCount)
      });
      console.log('Sale data submitted successfully:', response.data);
      alert('Sale data submitted successfully!');
      // Clear form fields
      setSelectedPharmacy('');
      setSelectedMedicine('');
      setSaleCount('');
    } catch (error) {
      console.error('Error submitting sale data:', error);
      setErrorMessage('Error submitting sale data');
    }
  };

  return (
    <>
      <Navbar />
      <div className='container'>
        <h2>Sale Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Select Pharmacy:</label><br/>
            <select value={selectedPharmacy} onChange={handlePharmacyChange}>
              <option value="">Select Pharmacy</option>
              {pharmacies.map((pharmacy, index) => (
                <option key={index} value={pharmacy._id}>{pharmacy.name}</option>
              ))}
            </select>
          </div>
          {selectedPharmacy && (
            <div>
              <label>Select Medicine:</label><br/>
              <select value={selectedMedicine} onChange={handleMedicineChange}>
                <option value="">Select Medicine</option>
                {medicines.map((medicine, index) => (
                  <option key={index} value={medicine._id}>{medicine.name}</option>
                ))}
              </select>
            </div>
          )}
          {selectedPharmacy && (
            <div>
              <label>Sale Count:</label>
              <input
                type="number"
                value={saleCount}
                onChange={handleSaleCountChange}
              />
            </div>
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default SaleForm;
