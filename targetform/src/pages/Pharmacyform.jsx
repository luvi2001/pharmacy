import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import '../css/meditable.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Navbar from '../components/Navbar';

function Pharmacyform() {
  const [pharmacyData, setPharmacyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const pdfRef = useRef(null);

  useEffect(() => {
    fetchPharmacyData();
  }, []);

  const fetchPharmacyData = async () => {
    try {
      const response = await axios.get('/api/form/pharmacy');
      setPharmacyData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pharmacy data:', error);
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const input = pdfRef.current;

    if (!input) {
      console.error('Error generating PDF: Invalid element provided as first argument');
      return;
    }

    html2canvas(input, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'mm', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('Pharmacy_Medicine_Stock.pdf');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  };

  const resetStock = async () => {
    const confirmation = window.confirm('Are you sure you want to reset the stock to 0?');
    if (!confirmation) {
      return;
    }

    try {
      await axios.post('/api/form/reset');
      fetchPharmacyData(); // Refresh data after reset
    } catch (error) {
      console.error('Error resetting stock:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const allMedicineNames = pharmacyData.reduce((acc, pharmacy) => {
    pharmacy.medicines.forEach(medicine => {
      if (!acc.includes(medicine.name)) {
        acc.push(medicine.name);
      }
    });
    return acc;
  }, []);

  const totalStockCount = allMedicineNames.reduce((acc, medicineName) => {
    const total = pharmacyData.reduce((sum, pharmacy) => {
      const medicine = pharmacy.medicines.find(med => med.name === medicineName);
      return sum + (medicine ? medicine.stockCount : 0);
    }, 0);
    return { ...acc, [medicineName]: total };
  }, {});

  return (
    <section>
      <Navbar />
      <div>
        <h2>Pharmacy Medicine Stock</h2>
        <div ref={pdfRef} style={{ overflowX: 'auto' }}>
          <br /><br />
          <table className="medtable">
            <thead>
              <tr>
                <th>Pharmacy Name</th>
                {allMedicineNames.map((medicineName, index) => (
                  <th key={index}>{medicineName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pharmacyData.map((pharmacy, index) => (
                <tr key={index}>
                  <td>{pharmacy.name}</td>
                  {allMedicineNames.map((medicineName, index) => {
                    const medicine = pharmacy.medicines.find(med => med.name === medicineName);
                    return (
                      <td key={index}>{medicine ? medicine.stockCount : 0}</td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td><b>Total</b></td>
                {allMedicineNames.map((medicineName, index) => (
                  <td key={index}><b id='size'>{totalStockCount[medicineName]}</b></td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <br /><br /><br /><br />
        <button className="app-button" onClick={downloadPDF}>Download PDF</button>
        <button className="app-button" onClick={resetStock}>Reset Stock</button>
      </div>
    </section>
  );
}

export default Pharmacyform;
