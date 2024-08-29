import React, { useState } from 'react';
import axios from 'axios';

const PromptForm = ({ onPromptCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/prompts/', { title, content });
      onPromptCreated(response.data);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating prompt:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Create Prompt</button>
    </form>
  );
};

export default PromptForm;