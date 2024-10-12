import React, { useEffect, useState, useRef } from 'react';
import { API_Path } from '../api';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { styled } from '@mui/system';
import { ThreeDots } from 'react-loader-spinner';

const ChainsContainer = styled(Box)({
  fontFamily: 'Poppins, sans-serif',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflowX: 'hidden',
  padding: '20px 0',
  width: '100%',
});

const VendorBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '20px',
  overflowX: 'auto',
  scrollBehavior: 'smooth',
  width: '80%',
  position: 'relative',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const VendorItem = styled(Box)({
  textAlign: 'center',
  flexShrink: 0,
  cursor: 'pointer',
  '& img': {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
});

const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '80%',
  margin: '0 auto',
  '@media (max-width: 600px)': {
    width: '90%',
  },
});

const Chains = () => {
  const [vendorData, setVendorData] = useState([]);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Handle errors
  const vendorBoxRef = useRef(null);

  const fetchVendorData = async () => {
    try {
      const response = await fetch(`${API_Path}/vendor/all-vendors`);
      if (!response.ok) throw new Error('Failed to fetch vendor data');
      const newData = await response.json();
      setVendorData(newData);
      setLoading(false);
    } catch (error) {
      setError('Failed to load vendor data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorData();
  }, []);

  const handleScroll = (e) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.target;
    setIsAtStart(scrollLeft === 0);
    setIsAtEnd(scrollWidth === scrollLeft + clientWidth);
  };

  const scrollLeft = () => {
    vendorBoxRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    vendorBoxRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h6" sx={{ mb: 2 }}>
          Loading
        </Typography>
        <ThreeDots visible={true} height="80" width="80" color="tomato" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <section className="chainSection" style={{ marginTop: '80px' }}>
      {/* Header with title and arrows */}
      <HeaderContainer>
        <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
          Top Restaurant Chains in Hyderabad
        </Typography>
        <Box>
          <IconButton onClick={scrollLeft} disabled={isAtStart}>
            <ArrowCircleLeftIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={scrollRight} disabled={isAtEnd}>
            <ArrowCircleRightIcon fontSize="large" />
          </IconButton>
        </Box>
      </HeaderContainer>

      {/* Vendor images */}
      <ChainsContainer>
        <VendorBox ref={vendorBoxRef} onScroll={handleScroll}>
          {vendorData.vendors?.map((vendor) =>
            vendor.firm.map((item) => (
              <VendorItem key={item.firmname}>
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  {item.firmname}
                </Typography>
                <div className="firmImage">
                  <img src={`${API_Path}/uploads/${item.image}`} alt={item.firmname} />
                </div>
              </VendorItem>
            ))
          )}
        </VendorBox>
      </ChainsContainer>
    </section>
  );
};

export default Chains;
