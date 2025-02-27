import React, { useState } from 'react';
import { ShoppingCart, Close, CreditCard, Smartphone, AttachMoney } from '@mui/icons-material';
import { 
  Card, CardContent, CardActions, Typography, Button, Tabs, Tab, 
  TextField, Box, Alert, IconButton, Divider
} from '@mui/material';
import { styled } from '@mui/system';

const ScrollArea = styled(Box)( {
  height: '50vh',
  overflowY: 'auto',
});

const Cart = ({ cartItems = [], onClose }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [showError, setShowError] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [upiId, setUpiId] = useState('');

  // Ensure item.price is treated as a number to avoid TypeError
  const totalAmount = cartItems.reduce((total, item) => total + (Number(item.price) || 0) * (item.quantity || 1), 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setShowError(true);
    } else {
      setShowPayment(true);
    }
  };

  const handlePayment = () => {
    console.log('Processing payment...');
    onClose();
  };

  const renderCartItems = () => (
    <ScrollArea>
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {item.image && (
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 1, mr: 2 }}
              />
            )}
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">{item.description}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                ${(Number(item.price) || 0).toFixed(2)} x {item.quantity || 1}
              </Typography>
            </Box>
          </Box>
        ))
      ) : (
        <Typography align="center" sx={{ py: 2 }}>Your cart is empty. Start shopping to add items!</Typography>
      )}
    </ScrollArea>
  );

  const renderPaymentForm = () => (
    <Box sx={{ width: '100%' }}>
      <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} centered>
        <Tab icon={<CreditCard />} label="Credit Card" />
        <Tab icon={<Smartphone />} label="UPI" />
        <Tab icon={<AttachMoney />} label="Cash" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {activeTab === 0 && (
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              fullWidth
            />
            <TextField
              label="Name on Card"
              placeholder="John Doe"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              fullWidth
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Expiry Date"
                placeholder="MM/YY"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                fullWidth
              />
              <TextField
                label="CVC"
                placeholder="123"
                value={cardCVC}
                onChange={(e) => setCardCVC(e.target.value)}
                fullWidth
              />
            </Box>
          </Box>
        )}
        {activeTab === 1 && (
          <TextField
            label="UPI ID"
            placeholder="yourname@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            fullWidth
          />
        )}
        {activeTab === 2 && (
          <Typography color="text.secondary">Pay with cash upon delivery.</Typography>
        )}
      </Box>
    </Box>
  );

  return (
    <Card sx={{ 
      width: '90%', 
      maxWidth: 600, 
      position: 'fixed', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      zIndex: 1300 
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
            <ShoppingCart sx={{ mr: 1 }} />
            {showPayment ? 'Payment' : 'Your Cart'}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        {showPayment ? renderPaymentForm() : renderCartItems()}
        {showError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Your cart is empty. Please add items before checking out.
          </Alert>
        )}
      </CardContent>
      <CardActions sx={{ flexDirection: 'column', alignItems: 'stretch', px: 2, pb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 2 }}>
          <Typography variant="subtitle1">Total:</Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>${totalAmount.toFixed(2)}</Typography>
        </Box>
        {showPayment ? (
          <Button variant="contained" fullWidth onClick={handlePayment}>
            Complete Payment
          </Button>
        ) : (
          <>
            <Button variant="contained" fullWidth onClick={handleCheckout} sx={{ mb: 1 }}>
              Proceed to Checkout
            </Button>
            <Button variant="outlined" fullWidth onClick={onClose}>
              Continue Shopping
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default Cart;
