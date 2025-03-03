import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EnergyEfficiencyData.css';

const EnergyEfficiencyData = () => {
  const [efficiencyCondition, setEfficiencyCondition] = useState('cold');
  const [batteryRange, setBatteryRange] = useState('conservative');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://jwu66.pythonanywhere.com/energy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({efficiency: efficiencyCondition, battery: batteryRange})
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Fetch error:', error)
    }

    await fetch('https://jwu66.pythonanywhere.com/result', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'multipart/form-data',
        // 'Accept': 'application/json',
      },
      // mode: 'no-cors',
      method: 'GET'}).then((response) => {
      response.json().then((data) => {
        // 导航到报告页面
        navigate('/fleet-service/report', {state: {
            data: data,
            efficiencyCondition: efficiencyCondition,
            batteryRange: batteryRange,
          }});
      })
    });

    // navigate('/fleet-service/report');
  };

  const steps = [
    { id: 'operational', label: 'Operational Data', active: false },
    { id: 'depot', label: 'Depot Data', active: false },
    { id: 'bus', label: 'Bus Data', active: false },
    { id: 'energy', label: 'Energy Efficiency and Battery Data', active: true },
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
              <h1 className="operational-title">Energy Efficiency and Battery Data</h1>
              <p className="operational-subtitle">
                Includes energy efficiency (kWh/mi) and battery capacity (kWh) for a bus model for different temperature conditions
              </p>
            </div>

            <div className="data-section">
              <div className="selection-group">
                <h3>Energy Efficiency</h3>
                <div className="radio-options">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="efficiency"
                      value="optimal"
                      checked={efficiencyCondition === 'optimal'}
                      onChange={(e) => setEfficiencyCondition(e.target.value)}
                    />
                    Optimal condition
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="efficiency"
                      value="cold"
                      checked={efficiencyCondition === 'cold'}
                      onChange={(e) => setEfficiencyCondition(e.target.value)}
                    />
                    Cold condition
                  </label>
                </div>
              </div>

              <div className="selection-group">
                <h3>Usable Battery Range Setting (SOC: state of charge). Apply to all bus types.</h3>
                <div className="radio-options">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="battery-range"
                      value="high-efficiency"
                      checked={batteryRange === 'high-efficiency'}
                      onChange={(e) => setBatteryRange(e.target.value)}
                    />
                    High-Efficiency (10%-90% SOC)
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="battery-range"
                      value="balanced"
                      checked={batteryRange === 'balanced'}
                      onChange={(e) => setBatteryRange(e.target.value)}
                    />
                    Balanced (15%-90% SOC)
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="battery-range"
                      value="conservative"
                      checked={batteryRange === 'conservative'}
                      onChange={(e) => setBatteryRange(e.target.value)}
                    />
                    Conservative (20%-90% SOC)
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="battery-range"
                      value="end-of-life"
                      checked={batteryRange === 'end-of-life'}
                      onChange={(e) => setBatteryRange(e.target.value)}
                    />
                    End of life battery (20%-80% SOC)
                  </label>
                </div>
              </div>
            </div>

            <div className="navigation-buttons">
              <Link to="/bus-data" className="button secondary-button">
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

export default EnergyEfficiencyData; 