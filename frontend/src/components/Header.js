import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">PromptCraft</Link>
      </div>
      <nav>
        {user ? (
          <>
            <Link to="/prompts">Prompts</Link>
            <Link to="/create-prompt">Create Prompt</Link>
            <button onClick={logout} className="btn btn-outline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;