import React, { useEffect, useState } from 'react';
import { API_Path } from '../api';
import { Box, Grid, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { ThreeDots } from 'react-loader-spinner'; // Import the loader

// Custom styled component for product image container
const ImageContainer = styled(Box)({
  position: 'relative',
  width: '200px',
  height: '200px',
  borderRadius: '8px',
  overflow: 'hidden',
  display: 'flex',
  // flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '20px',
});

// Custom styled component for the product image
const ProductImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

// Custom styled component for the action buttons
const ActionButton = styled(Button)({
  backgroundColor: '#ffffff',
  color: '#3f51b5',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
  margin: '0 10px',
});

const QuantityDisplay = styled(Typography)({
  fontWeight: 'bold',
  margin: '0 10px',
  color: '#ffffff', // Ensure this is visible over the image (adjust color as needed)
});
const ActionContainer = styled(Box)({
  position: 'absolute',
  bottom: '10px', // Position the buttons at the bottom of the image
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});


const ProductMenu = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bagCount, setBagCount] = useState(0);
  const { firmId, firmname } = useParams();
  const [cartItems, setCartItems] = useState([]);

  // Fetch products from the API
  const productHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_Path}/product/${firmId}/products`);
      const newProductsData = await response.json();
      setProducts(newProductsData.products || []);
    } catch (error) {
      console.error('Products Failed to Fetch', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    productHandler();
    // Initialize cart items from local storage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
    setBagCount(storedCartItems.reduce((total, item) => total + item.quantity, 0)); // Update bag count
  }, []);

  // Function to handle adding/removing a product
  const handleToggleProduct = (product, increment) => {
    const updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex((item) => item._id === product._id);

    if (existingItemIndex > -1) {
      // If product exists in cart, update its quantity
      updatedCartItems[existingItemIndex].quantity += increment;

      // Remove the product if the quantity is zero or less
      if (updatedCartItems[existingItemIndex].quantity <= 0) {
        updatedCartItems.splice(existingItemIndex, 1); // Remove the item from the cart
      }
    } else {
      // If product is not in cart, add it with quantity 1
      if (increment > 0) {
        updatedCartItems.push({ ...product, quantity: increment });
      }
    }

    // Update the cart state and local storage
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    // Update the bag count whenever cart items change
    setBagCount(updatedCartItems.reduce((total, item) => total + item.quantity, 0));
  };

  // Function to get product quantity in the cart
  const getProductQuantity = (product) => {
    const item = cartItems.find((cartItem) => cartItem._id === product._id);
    return item ? item.quantity : 0;
  };

  return (
    <>
      <TopBar bagCount={bagCount} />
      <Box sx={{ padding: '20px', margin: '0 auto', maxWidth: '1200px', paddingTop: '80px' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'left', marginLeft: '20px' }}
        >
          {firmname}
        </Typography>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="tomato"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </Box>
        ) : (
          <Grid container direction="column" spacing={2}>
            {products.length > 0 ? (
              products.map((item) => (
                <Grid item key={item._id}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid #ccc' }}
                  >
                    <Box sx={{ flex: 1, marginRight: '20px' }}>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {item.productname}
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#3f51b5', fontWeight: 'bold', marginBottom: '10px' }}>
                        ${item.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Box>

                    <ImageContainer>
                      <ProductImage src={`${API_Path}/uploads/${item.image}`} alt={item.productname} />
    
                      <ActionContainer>
                        {getProductQuantity(item) === 0 ? (
                          <ActionButton variant="contained" onClick={() => handleToggleProduct(item, 1)}>
                            Add
                          </ActionButton>
                        ) : (
                          <>
                            <ActionButton variant="contained" onClick={() => handleToggleProduct(item, -1)}>
                              -
                            </ActionButton>
                            <QuantityDisplay variant="body1">
                              {getProductQuantity(item)}
                            </QuantityDisplay>
                            <ActionButton variant="contained" onClick={() => handleToggleProduct(item, 1)}>
                              +
                            </ActionButton>
                          </>
                        )}
                      </ActionContainer>
                    </ImageContainer>
                  </Box>
                </Grid>
              ))
            ) : (
              <Typography variant="body1">No products available.</Typography>
            )}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default ProductMenu;
