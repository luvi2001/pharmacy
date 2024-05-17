import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../css/register.css'
import Navbar from '../components/Navbar';
//http://localhost:9000/

axios.defaults.baseURL = "https://pharmacy-2-iqeq.onrender.com"

const CalculatorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    target: '',
    achievement: '',
    percentage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, target, achievement, percentage } = formData;
    const calculatedPercentage = (achievement / target) * 100;
    setFormData({ ...formData, percentage: calculatedPercentage }); // Update the formData with the calculated percentage
    try {
      const response = await axios.post('/api/form/addmedicine', { ...formData, percentage: calculatedPercentage }); // Include percentage in the request data
      console.log(response.data); // Log the response for debugging
      openModal();
    } catch (error) {
      console.error('Error:', error);
      // Handle error gracefully
    }
  };

  // Modal state and functions
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
    <Navbar />
    <div className='container'>
      <h2>Enter Medicine Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name of Medicine:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Target:</label>
          <input type="number" name="target" value={formData.target} onChange={handleChange} />
        </div>
        <div>
          <label>Achievement:</label>
          <input type="number" name="achievement" value={formData.achievement} onChange={handleChange} />
        </div>
        <button type="submit">Add</button>
      </form>

      {/* Modal */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Medicine Added Successfully!</h2>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>

    </>
  );
};

export default CalculatorForm;
