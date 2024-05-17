import { useState } from 'react'
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalculatorForm from './pages/Calculatorform';
import Getmedtable from './pages/Getmedtable';
import Addmedicine from './pages/Addmedicine';
import Addpharmacy from './pages/Addpharmacy';
import Pharmacyform from './pages/Pharmacyform';
import SaleForm from './pages/SaleForm';


function App() {
  const [count, setCount] = useState(0)
  
 

  return (
    <>
      
      
      <BrowserRouter>
        <Routes>
        <Route path="/calcform" element={<CalculatorForm />} />
        <Route path="/med" element={<Getmedtable />} />
        <Route path="/addmed" element={<Addmedicine />} />
        <Route path="/addpharmacy" element={<Addpharmacy />} />
        <Route path="/" element={<Pharmacyform />} />
        <Route path="/salesform" element={<SaleForm />} />


        </Routes>
      </BrowserRouter>
          
    </>
  )
}

export default App
