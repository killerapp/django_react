import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing">
      <h1>Welcome to PromptCraft</h1>
      <p>Create, share, and explore AI prompts</p>
      <div className="cta-buttons">
        <Link to="/login" className="btn btn-primary">Login</Link>
        <Link to="/register" className="btn btn-secondary">Register</Link>
      </div>
    </div>
  );
};

export default Landing;