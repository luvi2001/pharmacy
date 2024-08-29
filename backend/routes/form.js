const express =require('express')

const {deleteMedicine, addMedicine, getMedicines, updateMedicine}= require('../controllers/formcontroller')
const { addPharmacy,getMedicine, addMed, getPharmacy, addCount, addSales, updatePharm, reset } = require('../controllers/medicincontroller')


const router=express.Router()


router.post('/addmedicine',addMedicine)
router.get('/getmedicines',getMedicines)
router.put('/updatemed/:id',updateMedicine)
router.delete('/delete/:id',deleteMedicine)
router.post('/medicines',addMed)
router.get('/medicines',getMedicine)
router.post('/pharmacy',addPharmacy)
router.get('/pharmacy',getPharmacy)
router.get('/pharmacy/:pharmacyId/medicine',addCount)
router.post('/sales',addSales)
router.put('/pharmacy/:id',updatePharm)
router.post('/reset',reset)

module.exports= router
