

const Medicine=require('../models/calcmodal')





  const addMedicine = async (req, res) => {
    try {
      const { name, target, achievement, percentage } = req.body;
      const medicine = new Medicine({
        name,
        target,
        achievement,
        percentage
      });
      await medicine.save();
      res.status(201).json({ message: 'Medicine added successfully', medicine });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to add medicine' });
    }
  };

  const getMedicines = async (req, res) => {
    try {
      const medicines = await Medicine.find();
      res.json({ healthInfos: medicines }); // Wrap the response in an object with the key `healthInfos`
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to fetch medicines' });
    }
  };

  const updateMedicine = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, target, achievement } = req.body;
      
      const percentage = (achievement / target) * 100;
  
      const updatedMedicine = await Medicine.findByIdAndUpdate(
        id,
        { name, target, achievement, percentage },
        { new: true, runValidators: true }
      );
  
      if (!updatedMedicine) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
  
      res.json(updatedMedicine);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to update medicine' });
    }
  };


  const deleteMedicine= async(req, res) => {
    try {
      const { id } = req.params;
      // Perform deletion logic here, for example:
      await Medicine.findByIdAndDelete(id);
      res.status(200).send({ message: "Medicine deleted successfully" });
    } catch (error) {
      console.error("Error deleting medicine:", error);
      res.status(500).send({ error: "An error occurred while deleting the medicine" });
    }
  };
module.exports={updateMedicine,getMedicines,addMedicine,deleteMedicine}