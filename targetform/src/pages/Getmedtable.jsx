import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import '../css/healthtable.css';
import UpdateHealthInfoForm from '../components/UpdateHealthInfoForm';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Navbar from '../components/Navbar';

const Gethealthinfo = () => {
  const [healthInfos, setHealthInfos] = useState([]);
  const [editingInfo, setEditingInfo] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const pdfRef = useRef();

  useEffect(() => {
    const fetchHealthInfos = async () => {
      try {
        const response = await axios.get('/api/form/getmedicines');
        setHealthInfos(response.data.healthInfos || []); // Ensure healthInfos is an array
      } catch (error) {
        console.error('Error fetching health infos:', error);
      }
    };

    fetchHealthInfos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/form/delete/${id}`);
      setHealthInfos(healthInfos.filter((info) => info._id !== id));
    } catch (error) {
      console.error('Error deleting health info:', error);
    }
  };

  const handleEdit = (info) => {
    setEditingInfo(info);
    setShowUpdateForm(true);
  };

  const handleUpdate = async (updatedInfo) => {
    try {
      const response = await axios.put(`/api/form/updatemed/${updatedInfo._id}`, updatedInfo);
      const updatedInfos = healthInfos.map((info) =>
        info._id === updatedInfo._id ? response.data : info
      );
      setHealthInfos(updatedInfos);
      setEditingInfo(null);
      setShowUpdateForm(false);
    } catch (error) {
      console.error('Error updating health info:', error);
    }
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
    setEditingInfo(null);
  };

  const cloneTableWithoutActions = () => {
    const originalTable = pdfRef.current;
    const clonedTable = originalTable.cloneNode(true);

    // Remove the last header (Actions)
    const headers = clonedTable.querySelectorAll('th');
    if (headers.length > 0) headers[headers.length - 1].remove();

    // Remove the last cell in each row
    const rows = clonedTable.querySelectorAll('tr');
    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length > 0) cells[cells.length - 1].remove();
    });

    clonedTable.style.position = 'absolute';
    clonedTable.style.top = '-9999px';
    clonedTable.style.width = '100%'; // Ensure table width fits in the document body
    document.body.appendChild(clonedTable);

    return clonedTable;
  };

  const downloadPDF = () => {
    const clonedTable = cloneTableWithoutActions();

    html2canvas(clonedTable, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);

        pdf.addImage(imgData, 'PNG', 0, 0, canvasWidth * ratio, canvasHeight * ratio);
        pdf.save('medicines.pdf');

        document.body.removeChild(clonedTable);
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
        document.body.removeChild(clonedTable);
      });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredHealthInfos = healthInfos.filter((info) =>
    info.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <br /><br /><br /><br />
      <div>
        <h1 id="health">Target Form</h1>
        <input id='search'
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="table-container" ref={pdfRef}>
          <table className='tablet' >
            <thead>
              <tr>
                <th>Name</th>
                <th>Target</th>
                <th>Achievement</th>
                <th>Percentage</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHealthInfos.map((info) => (
                <tr key={info._id}>
                  <td>{info.name}</td>
                  <td>{info.target}</td>
                  <td>{info.achievement}</td>
                  <td>{info.percentage}</td>
                  <td>
                    <button onClick={() => handleDelete(info._id)}><FaTrash /></button>
                    <button onClick={() => handleEdit(info)}><FaEdit /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showUpdateForm && editingInfo && (
          <div className="update-form-popup"><br/><br/>
            <div className="close-icon" onClick={handleCloseUpdateForm}><FaTimes /></div>
            <UpdateHealthInfoForm
              info={editingInfo}
              onUpdate={handleUpdate}
              onCancel={handleCloseUpdateForm}
            />
          </div>
        )}
        <button className="app-button" onClick={downloadPDF}>Download PDF</button>
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br />
      
    </>
  );
};

export default Gethealthinfo;
