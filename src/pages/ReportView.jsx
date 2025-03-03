import  {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import './ReportView.css';

const ReportView = () => {

  const location = useLocation();
  const data = location.state.data;
  // console.log(data);

  const [, setError] = useState(null);
  const [, setIsGeneratingReport] = useState(false);
  const batterRangeMap = {
    "high-efficiency": "High-Efficiency (10%-90% SOC)",
    "balanced": "Balanced (15%-90% SOC)",
    "conservative": "Conservative (20%-90% SOC)",
    "end-of-life": "End of life battery (20%-80% SOC)"
  }
  const simulationData = {
    energyEfficiency: location.state.efficiencyCondition,
    batteryRange: batterRangeMap[location.state.batteryRange],
    bases: [
      { name: 'Atlantic-Central', blocks: 400, noSplit: 170, oneSplit: 190, twoSplit: 40 },
      { name: 'Bellevue', blocks: 400, noSplit: 180, oneSplit: 180, twoSplit: 40 },
      { name: 'East', blocks: 330, noSplit: 132, oneSplit: 165, twoSplit: 33 },
      { name: 'North', blocks: 456, noSplit: 182, oneSplit: 228, twoSplit: 46 },
      { name: 'Ryerson', blocks: 300, noSplit: 120, oneSplit: 150, twoSplit: 30 },
      { name: 'South', blocks: 360, noSplit: 90, oneSplit: 234, twoSplit: 36 },
      { name: 'South_Annex', blocks: 400, noSplit: 120, oneSplit: 240, twoSplit: 40 }
    ]
  };

  const calculatePercentage = (value, total) => (value / total * 100).toFixed(1);

  const steps = [
    { id: 'operational', label: 'Operational Data', active: false },
    { id: 'depot', label: 'Depot Data', active: false },
    { id: 'bus', label: 'Bus Data', active: false },
    { id: 'energy', label: 'Energy Efficiency and Battery Data', active: false },
    { id: 'report', label: 'Report Review', active: true }
  ];
  const handleDownloadCSV = async () => {
    try {

      // 模拟报告生成时间
      await new Promise(resolve => setTimeout(resolve, 2000));

      await fetch('https://jwu66.pythonanywhere.com/download', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          // 'Content-Type': 'multipart/form-data',
          // 'Accept': 'application/json',
        },
        // mode: 'no-cors',
        method: 'GET',
      }).then((response) => {
        const reader = response.body.getReader();
        reader.read().then(({value}) => {
              // console.log(new TextDecoder("utf-8").decode(value));
              saveAsFile(new TextDecoder("utf-8").decode(value), 'filename');
            }
        );
      });

      function saveAsFile(text, filename) {
        // Step 1: Create the blob object with the text you received
        const type = 'application/text'; // modify or get it from response
        const blob = new Blob([text], {type});

        // Step 2: Create Blob Object URL for that blob
        const url = URL.createObjectURL(blob);

        // Step 3: Trigger downloading the object using that URL
        const htmlAnchorElement = document.createElement('a');
        htmlAnchorElement.href = url;
        htmlAnchorElement.download = filename;
        htmlAnchorElement.click(); // triggering it manually
      }
    } catch (err) {
      setError('Error generating report: ' + err.message);
    } finally {
      setIsGeneratingReport(false);
    }
  }
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
          <h1 className="report-title">Current Fleet and Service Report</h1>
          <p className="report-subtitle">
            Calculation results based on your current operational data and selected conditions.
          </p>

          <div className="report-section">
            <div className="section-header">
              <h2>Overview</h2>
              <div className="download-options">
                <button className="download-button">Download as jpg</button>
                <button className="download-button" onClick={handleDownloadCSV}>Download whole .csv file</button>
              </div>
            </div>

            <div className="simulation-conditions">
              <p><strong>Simulation conditions:</strong></p>
              <p><strong>Energy Efficiency:</strong> {simulationData.energyEfficiency}</p>
              <p><strong>Usable Battery Range:</strong> {simulationData.batteryRange}</p>
            </div>

            <div className="overview-chart">
              <div className="chart-bars">
                <div className="bar no-split" style={{ width: `${calculatePercentage(data.no_split, data.total)}%` }}>{data.no_split}</div>
                <div className="bar one-split" style={{ width: `${calculatePercentage(data.one_split, data.total)}%` }}>{data.one_split}</div>
                <div className="bar two-split" style={{ width: `${calculatePercentage(data.two_split, data.total)}%` }}>{data.two_split}</div>
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color no-split"></span>
                  <span>No Split Needed</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color one-split"></span>
                  <span>Need 1 split</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color two-split"></span>
                  <span>Need 2 or more splits</span>
                </div>
              </div>
            </div>
          </div>

          <div className="report-section">
            <div className="section-header">
              <h2>View By Base</h2>
              <button className="download-button">Download as jpg</button>
            </div>

            <div className="base-chart">
              <div className="chart-container">
                {simulationData.bases.map(base => (
                  <div key={base.name} className="base-row">
                    <div className="base-info">
                      <span className="base-name">{base.name}</span>
                      <span className="base-blocks">{base.blocks} blocks</span>
                    </div>
                    <div className="base-bars">
                      <div 
                        className="bar no-split" 
                        style={{ width: `${calculatePercentage(base.noSplit, base.blocks)}%` }}
                      >
                        <span className="bar-value">{base.noSplit}</span>
                      </div>
                      <div 
                        className="bar one-split" 
                        style={{ width: `${calculatePercentage(base.oneSplit, base.blocks)}%` }}
                      >
                        <span className="bar-value">{base.oneSplit}</span>
                      </div>
                      <div 
                        className="bar two-split" 
                        style={{ width: `${calculatePercentage(base.twoSplit, base.blocks)}%` }}
                      >
                        <span className="bar-value">{base.twoSplit}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="navigation-buttons">
            <Link to="/energy-efficiency" className="button secondary-button">
              Back
            </Link>
            <button className="button primary-button">
              Start Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportView;