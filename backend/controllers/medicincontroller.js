// controller.js
const express = require('express');
const router = express.Router();
const { Pharmacy, Medicine } = require('../models/medmodels');

// Route to fetch all medicines
const getMedicine= async (req, res) => {
  try {
    const medicines = await Medicine.find({}, 'name');
    res.status(200).json(medicines);
  } catch (error) {
    console.error('Error fetching medicines:', error);
    res.status(500).send('Error fetching medicines');
  }
};

// POST route for adding pharmacy and all medicines to it
const addPharmacy = async (req, res) => {
    try {
      const { pharmacyName } = req.body;
  
      // Check if pharmacy already exists
      let pharmacy = await Pharmacy.findOne({ name: pharmacyName });
      if (pharmacy) {
        console.log(`Pharmacy "${pharmacyName}" already exists`);
        return res.status(400).send(`Pharmacy "${pharmacyName}" already exists`);
      }
  
      // Find all medicines
      const medicines = await Medicine.find({});
      if (medicines.length === 0) {
        console.error('No medicines found');
        return res.status(404).send('No medicines found');
      }
  
      // Create embedded medicine documents
      const embeddedMedicines = medicines.map(med => ({
        name: med.name,
        stockCount: med.stockCount
      }));
  
      // Create pharmacy and add all embedded medicines to it
      pharmacy = new Pharmacy({ name: pharmacyName, medicines: embeddedMedicines });
      await pharmacy.save();
  
      console.log(`Pharmacy "${pharmacyName}" added with all medicines`);
      res.status(200).send('Data submitted successfully');
    } catch (error) {
      console.error('Error submitting data:', error);
      res.status(500).send('Error submitting data');
    }
  };
  

const addMed= async (req, res) => {
    try {
      const { name } = req.body;
  
      // Check if medicine with the same name already exists
      const existingMedicine = await Medicine.findOne({ name });
      if (existingMedicine) {
        console.log(`Medicine "${name}" already exists`);
        return res.status(400).send(`Medicine "${name}" already exists`);
      }
  
      // Create new medicine
      const newMedicine = new Medicine({ name });
      await newMedicine.save();
  
      console.log(`Medicine "${name}" added successfully`);
      res.status(200).send('Medicine added successfully');
    } catch (error) {
      console.error('Error adding medicine:', error);
      res.status(500).send('Error adding medicine');
    }
  };

  const updatePharm=async (req, res) => {
    const { id } = req.params;
    const updatedPharmacyData = req.body;
  
    try {
      // Find the pharmacy by ID and update it with the new data
      const updatedPharmacy = await Pharmacy.findByIdAndUpdate(id, updatedPharmacyData, { new: true });
  
      // Respond with the updated pharmacy data
      res.json(updatedPharmacy);
    } catch (error) {
      console.error('Error updating pharmacy:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const getPharmacy= async (req, res) => {
    try {
      const pharmacies = await Pharmacy.find();
      res.json(pharmacies);
    } catch (error) {
      console.error('Error fetching pharmacies:', error);
      res.status(500).send('Error fetching pharmacies');
    }
  };
  const addCount=async (req, res) => {
    try {
      const pharmacyId = req.params.pharmacyId;
      const pharmacy = await Pharmacy.findById(pharmacyId).populate('medicines', 'name');
      res.status(200).json(pharmacy.medicines);
    } catch (error) {
      console.error('Error fetching medicines for pharmacy:', error);
      res.status(500).send('Error fetching medicines for pharmacy');
    }
  };

  const addSales = async (req, res) => {
    try {
      const { pharmacyId, medicineId, saleCount } = req.body;
  
      // Find the pharmacy
      const pharmacy = await Pharmacy.findById(pharmacyId);
      if (!pharmacy) {
        return res.status(404).send('Pharmacy not found');
      }
  
      // Find the embedded medicine in the pharmacy's list of medicines
      const selectedMedicine = pharmacy.medicines.find(med => med._id.toString() === medicineId);
      if (!selectedMedicine) {
        return res.status(404).send('Medicine not found in the pharmacy');
      }
  
      // Update the stock count of the medicine
      selectedMedicine.stockCount += saleCount;
  
      // Save the updated pharmacy document
      await pharmacy.save();
  
      res.status(200).send('Sale data submitted successfully');
    } catch (error) {
      console.error('Error submitting sale data:', error);
      res.status(500).send('Error submitting sale data');
    }
  };
  
  module.exports = { addSales };
  
  
  


module.exports = {updatePharm,addSales,addCount,getPharmacy,getMedicine,addMed,addPharmacy}
