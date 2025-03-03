import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DepotData.css';

const DepotData = () => {
  const [selectedDepots, setSelectedDepots] = useState({
    'Atlantic-Central': true,
    'Bellevue': true,
    'East': true,
    'North': true,
    'Ryerson': true,
    'South': true,
    'Tukwila': true
  });

  const [selectedBusTypes, setSelectedBusTypes] = useState({
    '60-foot BEB': true,
    '40-foot BEB': true
  });

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      const formData = new FormData();
      formData.append('depot', selectedFile);
      fetch('https://jwu66.pythonanywhere.com/upload_depot', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          // 'Content-Type': 'multipart/form-data',
          // 'Accept': 'application/json',
        },
        // mode: 'no-cors',
        method: 'POST',
        body: formData
      }).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // or response.text(), response.blob(), etc.
      });
    } else {
      alert('Please upload a CSV file');
      setFile(null);
    }
  };

  const handleDepotChange = (depot) => {
    setSelectedDepots(prev => ({
      ...prev,
      [depot]: !prev[depot]
    }));
  };

  const handleBusTypeChange = (busType) => {
    setSelectedBusTypes(prev => ({
      ...prev,
      [busType]: !prev[busType]
    }));
  };

  const handleAddNewDepot = () => {
    // 处理添加新车库的逻辑
  };

  const handleAddNewBusLength = () => {
    // 处理添加新车辆长度的逻辑
  };

  const steps = [
    { id: 'operational', label: 'Operational Data', active: false },
    { id: 'depot', label: 'Depot Data', active: true },
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
              <h1 className="depot-title">Depot Data</h1>
              <p className="depot-description">The distribution and capacity of bus types at a bus depot</p>
            </div>

            <div className="data-section">
              <div className="depot-selection">
                <p className="depot-selection-header">
                  Depot data has been extracted from your operational data file. You can deselect any data you don't need.
                </p>
                <div className="checkbox-group">
                  {Object.entries(selectedDepots).map(([depot, isChecked]) => (
                    <label key={depot} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleDepotChange(depot)}
                      />
                      {depot}
                    </label>
                  ))}
                </div>
                <button className="add-new-button" onClick={handleAddNewDepot}>
                  Add a new bus depot +
                </button>
              </div>

              <div className="depot-selection">
                <p className="depot-selection-header">
                  Bus length has been extracted from your operational data file. You can deselect any data you don't need.
                  Choose the option to add a new bus type as a feature plan.
                </p>
                <div className="checkbox-group">
                  {Object.entries(selectedBusTypes).map(([busType, isChecked]) => (
                    <label key={busType} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleBusTypeChange(busType)}
                      />
                      {busType}
                    </label>
                  ))}
                </div>
                <button className="add-new-button" onClick={handleAddNewBusLength}>
                  Add a new bus length +
                </button>
              </div>

              <div className="upload-section">
                <h3>Upload Depot Data</h3>
                <p className="file-requirements">Only .csv files. 5 MB max file size.</p>
                <div className="upload-area">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    id="file-upload"
                    className="file-input"
                    style={{ display: 'none' }} // Hide the default file input
                  />
                  <label htmlFor="file-upload" className="upload-button">
                    Click to Upload File
                  </label>
                  {file && (
                    <p className="file-name">
                      Selected file: {file.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="navigation-buttons">
                <Link to="/get-started" className="button secondary-button">
                  Back
                </Link>
                <Link to="/bus-data" className="button primary-button" disabled={!file}>
                  Next
                </Link>
              </div>

              <div className="save-exit">
                <Link to="/" className="save-exit-link">Save and Exit</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepotData; 