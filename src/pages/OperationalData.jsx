import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './OperationalData.css';

const OperationalData = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      const formData = new FormData();
      formData.append('operational', selectedFile);
      fetch('http://localhost:5050/upload_op', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          // 'Content-Type': 'multipart/form-data',
          // 'Accept': 'application/json',
        },
        // mode: 'no-cors',
        method: 'POST',
        body: formData
      }).then(response => {
        if (response.status !== 200) {
          response.json().then((data) => {
            let error_message = ""
            if (data.message === "block id duplication") {
              error_message = "Warning: The record at row " + data.row_number + " in the data with Block Id " + data.block_id + " is duplicated"
            } else if (data.message === "distance neg") {
              error_message = "Warning: The record at row " + data.row_number + " in the data with Block Id " + data.block_id + " distance is negative which is " + data.distance;
            } else if (data.message === "vehicle size wrong") {
              error_message = "Warning: The record at row " + data.row_number + " in the data with Block Id " + data.block_id + " vehicle size is wrong (neither 40 nor 60) which is " + data.vehicle_size;
            }
            setError(error_message);
            alert(error_message);
          })
        }

      });
    } else {
      alert('Please upload a CSV file');
    }
  };


  const handleNext = () => {
    if (file) {
      navigate('/depot-data');
    }
  };

  const steps = [
    { id: 'operational', label: 'Operational Data', active: true },
    { id: 'depot', label: 'Depot Data', active: false },
    { id: 'bus', label: 'Bus Data', active: false },
    { id: 'energy', label: 'Energy Efficiency and Battery Data', active: false },
    { id: 'report', label: 'Report Review', active: false }
  ];

  return (
    <div className="page-container">
      <div className="top-nav">
        <div className="nav-logo">ZETA</div>
        <div className="nav-info">
          <span>King County Metro</span>
          <span>Jane Doe</span>
        </div>
      </div>

      <div className="main-content">
        <div className="progress-sidebar">
          <div className="progress-header">
            <h2>Fleet and Service Data</h2>
          </div>
          <div className="progress-steps">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className={`progress-step ${step.active ? 'active' : ''}`}
              >
                <div className="step-indicator">
                  <div className="step-dot"></div>
                  <div className="step-line"></div>
                </div>
                <span className="step-label">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="operational-container">
          <div className="operational-content">
            <div className="header">
              <h1 className="operational-title">Operational Data</h1>
              <p className="operational-subtitle">
                Fleet and schedule information for your organization.
              </p>
            </div>

            <div className="data-section">
              <div className="requirements">
                <h2>Includes:</h2>
                <ul className="requirements-list">
                  <li>Block ID: unique identifier of trips</li>
                  <li>Base: The depot or base of the vehicle</li>
                  <li>Bus Length: 35 ft, 40 ft, 60 ft, etc</li>
                  <li>Manufacturer: Gillig, New Flyer, etc</li>
                  <li>Distance of the block</li>
                  <li>Departure time</li>
                  <li>Arrival time</li>
                </ul>
              </div>

              {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                    {error}
                  </div>
              )}

              <div className="upload-section">
                <h3>Upload files</h3>
                <p className="file-requirements">Only .csv files. 5 MB max file size.</p>
                <div className="upload-area">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    id="file-upload"
                    className="file-input"
                  />
                  <label htmlFor="file-upload" className="upload-button">
                    Add file
                  </label>
                  {file && (
                    <p className="file-name">
                      Selected file: {file.name}
                    </p>
                  )}
                </div>
              </div>
            </div>


            <div className="navigation-buttons">
              <Link to="/" className="button secondary-button">
                Back
              </Link>
              <button 
                className="button primary-button"
                disabled={!file}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationalData; 