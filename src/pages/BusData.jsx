import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './OperationalData.css';

const BusData = () => {
  const [units, setUnits] = useState('kWh/mile');
  const [busData, setBusData] = useState({
    '40-foot': {
      optimal: '2.08',
      cold: '2.81',
      battery: '525'
    },
    '60-foot': {
      optimal: '2.91',
      cold: '3.68',
      battery: '525'
    }
  });

  const navigate = useNavigate();

  const handleUnitChange = (unit) => {
    setUnits(unit);
  };

  const handleDataChange = (busType, field, value) => {
    setBusData(prev => ({
      ...prev,
      [busType]: {
        ...prev[busType],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/energy-efficiency');
  };

  const steps = [
    { id: 'operational', label: 'Operational Data', active: false },
    { id: 'depot', label: 'Depot Data', active: false },
    { id: 'bus', label: 'Bus Data', active: true },
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
              <h1 className="operational-title">Bus Data</h1>
              <p className="operational-subtitle">
                Includes energy consumption rate (kWh/mi) and battery capacity (kWh) for a bus model for different temperature conditions
              </p>
            </div>

            <div className="data-section">
              <div className="depot-selection">
                <h2 className="depot-selection-header">Units</h2>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="units"
                      checked={units === 'kWh/mile'}
                      onChange={() => handleUnitChange('kWh/mile')}
                    />
                    kWh/mile
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="units"
                      checked={units === 'kWh/km'}
                      onChange={() => handleUnitChange('kWh/km')}
                    />
                    kWh/km
                  </label>
                </div>
              </div>

              {Object.entries(busData).map(([busType, data]) => (
                <div key={busType} className="depot-selection">
                  <h2 className="depot-selection-header">Energy data for {busType} bus</h2>
                  <div className="data-inputs">
                    <div className="input-group">
                      <label>Efficiency in optimal weather condition ({units})</label>
                      <input
                        type="number"
                        step="0.01"
                        value={data.optimal}
                        onChange={(e) => handleDataChange(busType, 'optimal', e.target.value)}
                      />
                    </div>
                    <div className="input-group">
                      <label>Efficiency in extreme cold condition ({units})</label>
                      <input
                        type="number"
                        step="0.01"
                        value={data.cold}
                        onChange={(e) => handleDataChange(busType, 'cold', e.target.value)}
                      />
                    </div>
                    <div className="input-group">
                      <label>Battery capacity (kWh)</label>
                      <input
                        type="number"
                        value={data.battery}
                        onChange={(e) => handleDataChange(busType, 'battery', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="depot-selection">
                <p className="depot-selection-header">* The following data is used by King County Metro and can be used as a reference.</p>
                <table className="reference-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>40 ft</th>
                      <th>60 ft</th>
                      <th>Units</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>optimal</td>
                      <td>2.084</td>
                      <td>2.918</td>
                      <td>kWh/mi</td>
                    </tr>
                    <tr>
                      <td>cold</td>
                      <td>2.814</td>
                      <td>3.688</td>
                      <td>kWh/mi</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="navigation-buttons">
              <Link to="/depot-data" className="button secondary-button">
                Back
              </Link>
              <button 
                className="button primary-button"
                onClick={handleSubmit}
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

export default BusData; 