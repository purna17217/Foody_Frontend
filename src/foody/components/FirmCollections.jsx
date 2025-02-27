import React, { useEffect, useState } from 'react';
import { API_Path } from '../api';
import { Box, Grid, Typography, Card, CardContent, CardMedia, CardActionArea, Button ,Skeleton} from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

// Custom styling for the firm image
const FirmImage = styled(CardMedia)({
  height: 150,
  width: '100%',
  objectFit: 'cover',
  borderRadius: '8px 8px 0 0', // Rounded corners for the top of the image
  position: 'relative', // Make it relative for absolute positioning of offer text
});

// Custom styling for the offer text
const OfferText = styled(Typography)({
  position: 'absolute',
  top: 110,
  left: 1,
  padding: '5px 10px',
  color: '#fff',
  borderRadius: '4px',
  fontWeight: 1000,
  fontSize: '1.3rem',
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background to improve text visibility
  textShadow: `
  0px 0px 8px rgba(0, 0, 0, 0.8),   /* Large soft shadow */
  0px 0px 4px rgba(0, 0, 0, 0.5),   /* Medium shadow */
  0px 0px 2px rgba(0, 0, 0, 0.3)    /* Small sharper shadow */
`, 
  WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 40%)', // Fades the shadow at the bottom

});

const StyledLink = styled(Link)({
  textDecoration: 'none', // Remove the underline
  color: 'inherit', // Ensure the link color matches the default text color
});

const FirmCollections = () => {
  const [firmData, setFirmData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch firm data from the API
  const firmDataHandler = async () => {
    try {
      const response = await fetch(`${API_Path}/vendor/all-vendors`);
      const newFirmData = await response.json();
      setFirmData(newFirmData.vendors || []); // Ensure vendors array is assigned correctly
    } catch (error) {
      alert('Firm Data not Found');
      console.error('Firm Data Not Found', error);
    }
    finally {
            setLoading(false);
    }
  };

  // Function to handle filtering by region
  const filterHandler = (region) => {
    setSelectedRegion(region);
  };

  useEffect(() => {
    firmDataHandler();
  }, []);

  return (
    <Box sx={{ padding: '20px', margin: '0 auto', maxWidth: '1200px' }}>
      {/* Heading */}
      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'left' }}>
        Restaurants with Online Food Delivery in Hyderabad
      </Typography>
       <Box sx={{ marginBottom: '20px', display: 'flex', gap: 1 }}> {/* Use flex display and gap for spacing */}
      <Button
        onClick={() => filterHandler('All')}
        variant={selectedRegion === 'All' ? 'contained' : 'outlined'}
        sx={{ 
          borderRadius: '20px', // Rounded corners
          border: '1px solid black', // Set border color to black
          cursor: 'pointer',
          color: 'black', // Text color
          '&.MuiButton-outlined': {
            '&:hover': {
              backgroundColor: '#F5F5F5', // Background color on hover
              color: 'black', // Text color on hover
            },
          },
          '&.MuiButton-contained': {
            backgroundColor: '#F5F5F5', // Background color when contained
            color: 'black', // Text color when contained
            '&:hover': {
              backgroundColor: '#F5F5F5', // Keep the same background on hover
            },
          },
          fontWeight: 'normal', // Set button text weight to normal
          '& span': {
            fontWeight: 'bold', // Make text bold
          },
        }}
      >
        All
      </Button>
      <Button
        onClick={() => filterHandler('South-indian')}
        variant={selectedRegion === 'South-indian' ? 'contained' : 'outlined'}
        sx={{ 
          borderRadius: '20px', // Rounded corners
          border: '1px solid black', // Set border color to black
          cursor: 'pointer',
          color: 'black', // Text color
          '&.MuiButton-outlined': {
            '&:hover': {
              backgroundColor: '#F5F5F5', // Background color on hover
              color: 'black', // Text color on hover
            },
          },
          '&.MuiButton-contained': {
            backgroundColor: '#F5F5F5', // Background color when contained
            color: 'black', // Text color when contained
            '&:hover': {
              backgroundColor: '#F5F5F5', // Keep the same background on hover
            },
          },
          fontWeight: 'normal', // Set button text weight to normal
          '& span': {
            fontWeight: 'bold', // Make text bold
          },
        }}
      >
        South-Indian
      </Button>
      <Button
        onClick={() => filterHandler('North-indian')}
        variant={selectedRegion === 'North-indian' ? 'contained' : 'outlined'}
        sx={{ 
          borderRadius: '20px', // Rounded corners
          border: '1px solid black', // Set border color to black
          cursor: 'pointer',
          color: 'black', // Text color
          '&.MuiButton-outlined': {
            '&:hover': {
              backgroundColor: '#F5F5F5', // Background color on hover
              color: 'black', // Text color on hover
            },
          },
          '&.MuiButton-contained': {
            backgroundColor: '#F5F5F5', // Background color when contained
            color: 'black', // Text color when contained
            '&:hover': {
              backgroundColor: '#F5F5F5', // Keep the same background on hover
            },
          },
          fontWeight: 'normal', // Set button text weight to normal
          '& span': {
            fontWeight: 'bold', // Make text bold
          },
        }}
      >
        North-Indian
      </Button>
      <Button
        onClick={() => filterHandler('Chinese')}
        variant={selectedRegion === 'Chinese' ? 'contained' : 'outlined'}
        sx={{ 
          borderRadius: '20px', // Rounded corners
          border: '1px solid black', // Set border color to black
          cursor: 'pointer',
          color: 'black', // Text color
          '&.MuiButton-outlined': {
            '&:hover': {
              backgroundColor: '#F5F5F5', // Background color on hover
              color: 'black', // Text color on hover
            },
          },
          '&.MuiButton-contained': {
            backgroundColor: '#F5F5F5', // Background color when contained
            color: 'black', // Text color when contained
            '&:hover': {
              backgroundColor: '#F5F5F5', // Keep the same background on hover
            },
          },
          fontWeight: 'normal', // Set button text weight to normal
          '& span': {
            fontWeight: 'bold', // Make text bold
          },
        }}
      >
        Chinese
      </Button>
      <Button
        onClick={() => filterHandler('Bakery')}
        variant={selectedRegion === 'Bakery' ? 'contained' : 'outlined'}
        sx={{ 
          borderRadius: '20px', // Rounded corners
          border: '1px solid black', // Set border color to black
          cursor: 'pointer',
          color: 'black', // Text color
          '&.MuiButton-outlined': {
            '&:hover': {
              backgroundColor: '#F5F5F5', // Background color on hover
              color: 'black', // Text color on hover
            },
          },
          '&.MuiButton-contained': {
            backgroundColor: '#F5F5F5', // Background color when contained
            color: 'black', // Text color when contained
            '&:hover': {
              backgroundColor: '#F5F5F5', // Keep the same background on hover
            },
          },
          fontWeight: 'normal', // Set button text weight to normal
          '& span': {
            fontWeight: 'bold', // Make text bold
          },
        }}
      >
        Bakery
      </Button>
    </Box>

    <Grid container spacing={3}>
  {loading ? (
    // Show skeleton loaders while data is loading
    Array.from(new Array(6)).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
          <CardActionArea>
            <Skeleton variant="rectangular" height={140} />
            <CardContent sx={{ flexGrow: 1 }}>
              <Skeleton width="80%" />
              <Skeleton width="60%" />
              <Skeleton width="90%" />
              <Skeleton width="70%" />
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ))
  ) : firmData.length > 0 ? (
    firmData.map((vendor) =>
      vendor.firm.map((item) => {
        // Check if the selected region matches or is "All"
        const regionMatches =
          selectedRegion === 'All' ||
          (Array.isArray(item.region)
            ? item.region.some((region) => region.toLowerCase().includes(selectedRegion.toLowerCase()))
            : item.region.toLowerCase().includes(selectedRegion.toLowerCase()));

        if (regionMatches) {
          return (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <StyledLink to={`/products/${item._id}/${item.firmname}`}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                  <CardActionArea>
                    {/* Firm Image */}
                    <FirmImage
                      component="img"
                      image={`${API_Path}/uploads/${item.image}`}
                      alt={item.firmname}
                    />
                    {/* Firm Details */}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                        {item.firmname}
                      </Typography>
                      {/* Offer Text positioned absolutely over the Firm Image */}
                      {item.offer && (
                        <OfferText variant="subtitle1">
                          Offer: {item.offer}
                        </OfferText>
                      )}
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                        Region: {Array.isArray(item.region) ? item.region.join(', ') : 'N/A'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                        Area: {item.area}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </StyledLink>
            </Grid>
          );
        }
        return null; // Skip rendering if the region does not match
      })
    )
  ) : (
    <Typography variant="body1">No Restaurant data available.</Typography>
  )}
  
  
</Grid>

    </Box>
  );
};

export default FirmCollections;
