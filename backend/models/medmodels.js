const mongoose = require('mongoose');

// Define Schema for Medicine
const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  stockCount: {
    type: Number,
    required: true,
    default: 0 // Default stock count is 0
  }
});

// Define Schema for Medicine embedded in Pharmacy
const embeddedMedicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  stockCount: {
    type: Number,
    required: true,
    default: 0
  }
});

// Define Schema for Pharmacy
const pharmacySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  medicines: [embeddedMedicineSchema]
});

// Create models
const Medicine = mongoose.model('Medicine', medicineSchema);
const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

module.exports = {
  Medicine,
  Pharmacy
};
