import React, { useState, useEffect, useRef } from 'react';
import { itemData } from '../data';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { styled } from '@mui/system';


// Custom styled components
const ItemsContainer = styled(Box)({
  fontFamily: 'Poppins, sans-serif',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflowX: 'hidden',
  padding: '20px 0',
  width: '100%',
});

const ItemGallery = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '15px', // Add space between images
  overflowX: 'auto',
  scrollBehavior: 'smooth',
  width: '80%',
  cursor: 'pointer',
  position: 'relative',
  '&::-webkit-scrollbar': {
    display: 'none', // Hide scrollbar for a clean look
  },
});

const Item = styled(Box)({
  textAlign: 'center',
  flexShrink: 0,
  '& img': {
    width: '150px', // Adjust the width of images
    height: 'auto',
    borderRadius: '10px',
  },
});

const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between', // Adjust arrows and title position dynamically
  width: '80%',
  margin: '0 auto', // Center within the page
  position: 'relative', 
  zIndex: 100, 
  '@media (max-width: 600px)': {
    width: '90%', // Adjust width on smaller screens
  },
});

const ItemsDisplay = () => {
  const galleryRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const galleryBox = galleryRef.current;
      const isAtStart = galleryBox.scrollLeft === 0;
      const isAtEnd =
        galleryBox.scrollWidth === galleryBox.scrollLeft + galleryBox.clientWidth;

      setIsAtStart(isAtStart);
      setIsAtEnd(isAtEnd);
    };

    const galleryBox = galleryRef.current;
    galleryBox.addEventListener('scroll', handleScroll);

    // Cleanup event listener on unmount
    return () => {
      galleryBox.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll left function
  const scrollLeft = () => {
    const galleryBox = galleryRef.current;
    galleryBox.scrollBy({
      left: -300, // Scroll left by 300px
      behavior: 'smooth',
    });
  };

  // Scroll right function
  const scrollRight = () => {
    const galleryBox = galleryRef.current;
    galleryBox.scrollBy({
      left: 300, // Scroll right by 300px
      behavior: 'smooth',
    });
  };

  return (
    <section className="itemsSection"  style={{ marginTop: '80px' }}>
      {/* Header with title and arrows */}
      <HeaderContainer sx={{ marginTop: '20px' }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
            textAlign: 'left',
          }}
        >
          What are you thinking about right now?
        </Typography>
        <Box>
          {/* Left Arrow */}
          <IconButton onClick={scrollLeft} sx={{ fontSize: '2rem', zIndex: 110 }} disabled={isAtStart}>
            <ArrowCircleLeftIcon fontSize="inherit" />
          </IconButton>

          {/* Right Arrow */}
          <IconButton onClick={scrollRight} sx={{ fontSize: '2rem', zIndex: 110 }} disabled={isAtEnd}>
            <ArrowCircleRightIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </HeaderContainer>

      {/* Item Gallery */}
      <ItemsContainer>
        <ItemGallery id="item-gallery" ref={galleryRef}>
          {itemData.map((item, index) => (
            <Item key={index}>
              <img src={item.item_img} alt={item.item_img} />
            </Item>
          ))}
        </ItemGallery>
      </ItemsContainer>
    </section>
  );
};

export default ItemsDisplay;

