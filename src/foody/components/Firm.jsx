import React, { useState, useEffect } from 'react';
import TopBar from './TopBar';
import FirmItem from './FirmItem';
import { Grid } from '@mui/material';

const FirmList = () => {
  const [firms, setFirms] = useState([]); // State for holding firms data
  const [searchTerm, setSearchTerm] = useState(''); // State for holding the search term

  useEffect(() => {
    // Fetch your firms data from an API or any other source
    const fetchFirms = async () => {
      const response = await fetch('/api/firms'); // Replace with your actual API endpoint
      const data = await response.json();
      setFirms(data);
    };

    fetchFirms();
  }, []);

  // Search handler
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Filter firms based on search term
  const filteredFirms = firms.filter(firm =>
    firm.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TopBar onSearch={handleSearch} /> {/* Pass the search handler to TopBar */}

      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {filteredFirms.map(firm => (
          <Grid item xs={12} sm={6} md={4} key={firm.id}>
            <FirmItem firm={firm} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FirmList;
