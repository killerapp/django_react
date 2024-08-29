import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

function PromptList() {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.error('No active session');
        return;
      }

      const response = await axios.get('/api/prompts/', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      setPrompts(response.data);
    } catch (error) {
      console.error('Error fetching prompts:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          AI Prompts
        </Typography>
        <Box>
          <Button component={Link} to="/create" variant="contained" color="primary" sx={{ mr: 2 }}>
            Create Prompt
          </Button>
          <Button onClick={handleLogout} variant="outlined" color="secondary">
            Logout
          </Button>
        </Box>
      </Box>
      <List>
        {prompts.map((prompt) => (
          <ListItem key={prompt.id}>
            <ListItemText primary={prompt.title} secondary={prompt.content} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default PromptList;