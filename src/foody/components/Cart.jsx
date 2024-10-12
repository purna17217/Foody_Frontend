import React from 'react';
import { Paper, Typography, Button, Box, Divider } from '@mui/material';

const Cart = ({ cartItems, onClose }) => {
  return (
    <Paper 
      style={{ 
        padding: '24px',
        maxWidth: '600px', 
        width: '25vw', // Set width to 25% of the viewport width
        height: '30vh', // Adjusted height for more content
        position: 'fixed', 
        top: '30%', 
        left: '50%', // Center horizontally
        transform: 'translateX(-50%)', // Centering adjustment
        zIndex: 2000, 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', 
        overflowY: 'auto',
        borderRadius: '10px', // Rounded corners
      }}
    >
      <Typography variant="h6" style={{ marginBottom: '16px', fontWeight: 'bold' }}>
        Your Cart
      </Typography>
      <Divider style={{ marginBottom: '16px' }} />
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
            {item.image && (
              <img 
                src={item.image} 
                alt={item.name} 
                style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '4px' }} 
              />
            )}
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" style={{ fontWeight: '600' }}>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description} {/* Added description */}
              </Typography>
              <Typography variant="body2">
                ${item.price} x {item.quantity}
              </Typography>
            </Box>
          </Box>
        ))
      ) : (
        <Typography>Your cart is empty.</Typography>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button variant="contained" color="primary">
          Checkout
        </Button>
        <Button onClick={onClose} style={{ marginLeft: '10px' }}>
          Close
        </Button>
      </Box>
    </Paper>
  );
};

export default Cart;
