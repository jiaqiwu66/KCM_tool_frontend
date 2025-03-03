import React from 'react';
import { Link } from 'react-router-dom';
import './IntroductionPage.css';

const IntroductionPage = () => {
  return (
    <div className="intro-container">
      <div className="intro-content">
        <h1 className="intro-title">
          WELCOME TO <span className="zeta-text">ZETA</span>
        </h1>
        
        <div className="steps-container">
          <div className="step-card">
            <h2 className="step-label">STEP ONE</h2>
            <h3 className="step-title">Prepare Your Data</h3>
            <p className="step-description">
              Download and prepare the required data files:
            </p>
            <ul className="step-list">
              <li>Operational data</li>
              <li>Base data</li>
              <li>Bus data</li>
            </ul>
            <p className="step-helper">
              You can download the sample files below to help structure your data.
            </p>
            <div className="step-buttons">
              <a href="/test_file 1.csv" className="sample-button" download>
                Operation-sample.csv
              </a>
              <a href="/template 2_depot capacity.csv" className="sample-button" download>
                Base-sample.csv
              </a>
            </div>
          </div>

          <div className="step-card">
            <h2 className="step-label">STEP TWO</h2>
            <h3 className="step-title">Input Your Current Fleet Data</h3>
            <p className="step-description">
              Upload the prepared data to generate the current fleet service report.
            </p>
            <div className="step-images">
              <img src="/step2_1.png" alt="Data input form" className="step-image" />
              <img src="/Step2_2.png" alt="Fleet report" className="step-image" />
            </div>
          </div>

          <div className="step-card">
            <h2 className="step-label">STEP THREE</h2>
            <h3 className="step-title">Simulate Zero Emissions Transition</h3>
            <p className="step-description">
              Play with variables to replace diesel buses with electric buses and see the feasibility of your transition.
            </p>
            <div className="step-images">
              <img src="/step3_1.png" alt="Simulation interface" className="step-image" />
              <img src="/step3_2.png" alt="Results report" className="step-image" />
            </div>
          </div>
        </div>

        <Link to="/get-started" className="button primary-button">
          Get Started Here
        </Link>
      </div>
    </div>
  );
};

export default IntroductionPage; 