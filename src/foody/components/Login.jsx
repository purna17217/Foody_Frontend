import React, { useState, useEffect, useRef } from 'react';
import { Drawer, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { API_Path } from '../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StyledTextField = styled(TextField)( {
  marginBottom: '16px',
  width: '100%',
});

const Login = ({ open, onClose, onLogout, onOtpVerified }) => {
  const [showPhoneNumberOnly, setShowPhoneNumberOnly] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState(''); // New state for name
  const [email, setEmail] = useState(''); // New state for email
  const [otpSent, setOtpSent] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(30);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setIsLoggedIn(!!token); // Update logged-in state based on token
    // Close the drawer if clicking outside
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target) && open) {
        handleResetForm();
        onClose();
      }
    };

    // Add click event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    let interval;
    if (otpSent && resendCountdown > 0) {
      interval = setInterval(() => {
        setResendCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, resendCountdown]);

  // Function to ensure phone number includes +91
const formatPhoneNumber = (number) => {
  if (!number.startsWith('+91')) {
    return `+91${number}`;
  }
  return number;
}; 

  const isPhoneNumberValid = (number) => {
    // Add your phone number validation logic here
    const phoneRegex = /^\+91[0-9]{10}$/;  // Adjust regex as needed for your validation
    return phoneRegex.test(number);
  };

  // Function to handle sending OTP
  const handleSendOtp = async () => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber); // Format the phone number
    console.log("Send OTP:",formattedPhoneNumber);
  setPhoneNumber(formattedPhoneNumber); // Update state with formatted number

  if (!isPhoneNumberValid(formattedPhoneNumber)) {
      toast.error('Please enter a valid phone number.');
      return;
    }
    try {
      const response = await fetch(`${API_Path}/customer/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: formattedPhoneNumber }), // Send phoneNumber in body
      });

      if (response.ok) {
        setOtpSent(true); // OTP sent successfully
        setResendCountdown(30); // Start the 30-second countdown for resending OTP
        toast.success('OTP sent successfully!');
      } else {
        toast.error('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('An error occurred while sending OTP. Please try again.');
    }
  };

  // Function to handle OTP verification
  const handleVerifyOtp = async () => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    console.log("Login:",formattedPhoneNumber);
    try {
      const response = await fetch(`${API_Path}/customer/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber:formattedPhoneNumber, otp }), // Send phoneNumber and otp in body
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;
        localStorage.setItem('jwtToken', token); // Save token in localStorage
        setIsLoggedIn(true); // Update logged-in state
        onOtpVerified(); // Notify parent component
        handleResetForm();
        onClose(); // Close the drawer after successful login
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('An error occurred while verifying OTP. Please try again.');
    }
  };

  // New function to handle user registration
  const handleSubmit = async () => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    console.log("Submit:",formattedPhoneNumber);
    try {
      const response = await fetch(`${API_Path}/customer/signin`, { // Use the same API path for registration
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber:formattedPhoneNumber, name, email }), // Send phoneNumber, name, and email in body
      });

      if (response.ok) {
        toast.success('Registration successful! Kindly Login '); // Alert for successful registration
        handleResetForm(); // Reset form fields after successful submission
      }
      else if (response.status === 409) {  // Assuming the backend returns 409 for already existing customers
        toast.error('Already existing customer, kindly log in.');
      }
       else {
        toast.error('Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('An error occurred during registration. Please try again.');
    }
  };

  const handleLoginToAccountClick = () => {
    setShowPhoneNumberOnly(true); // Switch to phone number only view
  };

  const handleSignInClick = () => {
    setShowPhoneNumberOnly(false); // Switch back to full form
  };

  const handleLogoutClick = () => {
    setConfirmLogout(true); // Open confirmation dialog
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('jwtToken'); // Remove token from localStorage
    setIsLoggedIn(false); // Update logged-in state
    onLogout(); // Notify parent component (TopBar) about logout
    handleResetForm(); // Reset form fields
    setConfirmLogout(false); // Close confirmation dialog
    onClose();
  };

  const handleResendOtp = () => {
    if (resendCountdown === 0) {
      handleSendOtp(); // Resend OTP when the countdown reaches zero
    }
  };

  const handleCancelLogout = () => {
    setConfirmLogout(false); // Close confirmation dialog
  };

  // Function to reset the form fields
  const handleResetForm = () => {
    setPhoneNumber('');
    setName(''); // Reset name
    setEmail(''); // Reset email
    setOtp('');
    setOtpSent(false);
    setShowPhoneNumberOnly(false);
  };

  return (
    <>
      <Drawer anchor="right" open={open} 
      onClose={() => { handleResetForm(); onClose(); }}>
        <div ref={drawerRef} style={{ width: '300px', padding: '20px' }}>
          <h2>{isLoggedIn ? 'Wanna Go Back ?' : (showPhoneNumberOnly ? 'Login to your Account' : 'Sign In')}</h2>

          {isLoggedIn ? (
            <>
              <Button variant="contained" 
              color="secondary" 
              fullWidth 
              onClick={handleLogoutClick}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              {showPhoneNumberOnly ? (
                <>
                  {!otpSent ? (
                    <>
                      <StyledTextField
                        label="Phone Number"
                        variant="outlined"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      <Button variant="contained" 
                      color="primary" 
                      fullWidth 
                      onClick={handleSendOtp}>
                        Send OTP
                      </Button>
                    </>
                  ) : (
                    <>
                      <StyledTextField
                        label="OTP"
                        variant="outlined"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <Button variant="contained" color="primary" fullWidth onClick={handleVerifyOtp}>
                        Verify OTP
                      </Button>
                      <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        {resendCountdown > 0 ? (
                          <span>Resend OTP in {resendCountdown} seconds</span>
                        ) : (
                          <Button variant="text" color="secondary" onClick={handleResendOtp}>
                            Resend OTP
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                  <div style={{ textAlign: 'center', 
                    marginTop: '16px' }}>
                    <span>or</span>
                    <Link
                      to="#"
                      onClick={handleSignInClick}
                      style={{
                        display: 'block',
                        marginTop: '8px',
                        color: '#3f51b5',
                        textDecoration: 'none',
                      }}
                    >
                      Sign In
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <StyledTextField
                    label="Phone Number"
                    variant="outlined"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <StyledTextField 
                    label="Name" 
                    variant="outlined" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} // Handle name change
                  />
                  <StyledTextField 
                    label="Email" 
                    variant="outlined" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} // Handle email change
                  />
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    onClick={handleSubmit} // Call handleSubmit on button click
                  >
                    Submit
                  </Button>
                  <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <span>or</span>
                    <Link
                      to="#"
                      onClick={handleLoginToAccountClick}
                      style={{
                        display: 'block',
                        marginTop: '8px',
                        color: '#3f51b5',
                        textDecoration: 'none',
                      }}
                    >
                      Login to your account
                    </Link>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </Drawer>
      <Dialog open={confirmLogout} onClose={handleCancelLogout}>
        <DialogTitle>Confirm Sign Out</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to sign out?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="secondary">
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default Login;
