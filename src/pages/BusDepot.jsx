import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BusDepot.css';

const BusDepot = () => {
  const [selectedDepots, setSelectedDepots] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      alert('Please upload a CSV file');
    }
  };

  const handleDepotChange = (depot) => {
    if (selectedDepots.includes(depot)) {
      setSelectedDepots(selectedDepots.filter(d => d !== depot));
    } else {
      setSelectedDepots([...selectedDepots, depot]);
    }
  };

  return (
    <div className="page-container">
      {/* 侧边栏 */}
      <div className="progress-sidebar">
        <div className="progress-header">
          <h2>Fleet and Service Data</h2>
        </div>
        <div className="progress-steps">
          <Link to="/operational-data" className="progress-step">
            <span>Operational Data</span>
          </Link>
          <Link to="/depot-data" className="progress-step active">
            <span>Depot Data</span>
          </Link>
          <Link to="/bus-data" className="progress-step">
            <span>Bus Data</span>
          </Link>
          <Link to="/energy-efficiency" className="progress-step">
            <span>Energy Efficiency and Battery Data</span>
          </Link>
          <Link to="/report-review" className="progress-step">
            <span>Report Review</span>
          </Link>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="operational-container">
        <div className="operational-content">
          <div className="header">
            <h1 className="operational-title">Depot Data</h1>
            <p className="operational-subtitle">
              Select depots and upload their corresponding data
            </p>
          </div>

          <div className="data-section">
            <div className="depot-selection">
              <h3>Select Depots</h3>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedDepots.includes('central')}
                    onChange={() => handleDepotChange('central')}
                  />
                  Central Base
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedDepots.includes('east')}
                    onChange={() => handleDepotChange('east')}
                  />
                  East Base
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedDepots.includes('north')}
                    onChange={() => handleDepotChange('north')}
                  />
                  North Base
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedDepots.includes('south')}
                    onChange={() => handleDepotChange('south')}
                  />
                  South Base
                </label>
              </div>
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
            <Link to="/operational-data" className="button secondary-button">
              Back
            </Link>
            <button 
              className="button primary-button"
              disabled={!file || selectedDepots.length === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusDepot; 