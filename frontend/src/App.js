import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import PromptList from './components/PromptList';
import PromptForm from './components/PromptForm';
import './styles/main.css';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={user ? <Navigate to="/prompts" /> : <Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/prompts" element={user ? <PromptList /> : <Navigate to="/login" />} />
            <Route path="/create-prompt" element={user ? <PromptForm /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;