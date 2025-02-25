import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">
          WELCOME TO <span className="zeta-text">ZETA</span>
        </h1>
        
        <p className="welcome-description">
          ZETA helps you simulate the transition from diesel buses to zero-emission buses, 
          offering an easy way to plan, analyze, and optimize your fleet's shift towards sustainability.
        </p>

        <div className="welcome-buttons">
          <Link to="/get-started" className="button primary-button">
            Get started here
          </Link>
          <Link to="/introduction" className="button secondary-button">
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage; 