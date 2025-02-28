
import React, { useRef, useState, useEffect } from 'react';
import { AppBar, Toolbar, TextField, Button, InputAdornment, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faShoppingBag, faStore } from '@fortawesome/free-solid-svg-icons';
import Login from './Login';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#fff',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
});

const StyledToolbar = styled(Toolbar)({
  height: '64px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px',
});

const StyledTextField = styled(TextField)({
  backgroundColor: 'white',
  borderRadius: '25px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '25px',
    '& fieldset': {
      borderColor: 'black',
    },
    '&:hover fieldset': {
      borderColor: 'black',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
});

const StyledButton = styled(Button)({
  color: '#333',
  fontWeight: '500',
  border: 'none',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

const TopBar = ({ showLogin, setShowLogin, onSearch, onSuccessfulLogin, bagCount, setBagCount, openCart }) => {
 
  console.log("TopBar rendered"); // Log when TopBar is rendered
  console.log("openCart function:", openCart); // Log the openCart function
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignOut, setIsSignOut] = useState(false);
  const searchInputRef = useRef();

  useEffect(() => {
    // Check if token exists in localStorage to set login state
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignInClick = () => {
    if (isLoggedIn) {
      // If user is already logged in, show confirmation to sign out
      setIsSignOut(true); 
    } else {
      setShowLogin(true); // Open the login sidebar
    }
  };

  const handleCloseLogin = () => {
    setShowLogin(false); // Close the login sidebar
  };

  const handleOtpVerified = () => {
    setIsLoggedIn(true); // Update to logged in after successful OTP verification
    onSuccessfulLogin();
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false); // Update to logged out state
    setShowLogin(false);
    setIsSignOut(false);
  };

  const handleSearchIconClick = () => {
    // Focus the search input when the search icon is clicked
    searchInputRef.current.focus();
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      const searchTerm = searchInputRef.current.value.trim().toLowerCase();
      if (searchTerm) {
        onSearch(searchTerm); // Trigger the search logic
      }
    }
  };
  
  const handleAddToBag = () => {
    setBagCount((prevCount) => prevCount + 1); // Update bag count
  };
  
  return (
    <>
      <StyledAppBar position="fixed">
        <StyledToolbar>
          <div>
            <Link to="/" 
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <svg 
                version="1.1" 
                viewBox="0 0 1012 1092" 
                width="120" // Adjust width as needed
                height="62" // Set height to auto to maintain aspect ratio
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: '10px', maxHeight: '102px', alignSelf: 'center', fill: 'tomato' }} // Set max height to prevent overflow
              >
                <path transform="translate(0)" d="m0 0h1012v1092h-1012z" fill="#FEFEFE"/>
                <path transform="translate(237,67)" d="m0 0h562v167l-1 56-7 1-33 1h-49l-37-2-23-2-7-3-10-15-7-10-6-7-8-4-3-1h-39l-115 6-55 4h-3v12h154l-1 9-4 1-108 4-41 1v12l80 2 62 2 11 1 1 5-2 4-100 3-52 1v12l33 1 85 3 34 2 2 1v6l-1 2h-153l1 12 53 4 70 4 66 3h18l10-3 9-7 7-9 9-14 4-5 9-3 35-3h74l18 1 1 1v186l-1 1-359 1-1 292h-182z"/>
                <path transform="translate(336,911)" d="m0 0h15l17 3 15 6 10 6 10 9 8 10 8 16 3 11 1 8v22l-2 12-6 16-7 11-10 11-10 7-12 6-13 4-6 1h-26l-14-3-12-5-12-7-6-5-9-11-6-10-5-13-3-17v-17l3-16 6-15 7-11 9-10 13-9 11-5 15-4z"/>
                <path transform="translate(519,911)" d="m0 0h12l14 2 15 5 13 7 12 11 6 7 9 17 4 17 1 14-2 20-5 15-5 10-7 9-9 9-15 9-18 6-5 1-16 1-18-2-17-6-12-7-10-9-7-8-8-15-4-14-2-20 1-14 4-15 5-12 7-10 12-12 13-8 14-5 8-2z"/>
                <path transform="translate(635,913)" d="m0 0h51l21 2 15 5 11 6 11 9 9 12 7 14 4 15 1 16-2 17-4 14-7 13-11 13-11 8-14 7-16 4-45 1h-21v-155z"/>
                <path transform="translate(148,913)" d="m0 0h91v33l-1 1-64 1v27l25-1h35v33l-37 1h-22l-1 1-1 59h-34v-154z"/>
                <path transform="translate(765,913)" d="m0 0h39l10 19 8 17 8 16 7 13 2 1 2-6 29-58 1-1 39-1-2 6-28 52-12 22-13 24v51h-35l-1-54-9-16-17-32-12-22-13-24-3-5z"/>
                <path transform="translate(334,947)" d="m0 0h19l10 3 10 6 7 7 6 11 2 9v16l-2 9-5 9-8 9-10 6-11 3h-17l-10-3-9-5-6-5-7-11-3-9-1-5v-12l3-12 5-9 7-8 10-6z" fill="#FEFEFE"/>
                <path transform="translate(515,947)" d="m0 0h19l10 3 9 5 9 9 5 10 2 7 1 11-2 13-4 9-7 10-11 7-12 4h-18l-10-3-9-5-8-8-7-14-1-4v-19l4-13 8-11 10-7z" fill="#FEFEFE"/>
                <path transform="translate(669,947)" d="m0 0h24l13 4 9 7 6 7 5 12 1 4v19l-3 10-6 10-8 8-8 4-10 3h-23l-1-1v-86z" fill="#FEFEFE"/>
              </svg>
            </Link>
          </div>
          <StyledTextField
            variant="outlined"
            placeholder="Search...."
            size="small"
            inputRef={searchInputRef}
            onKeyPress={handleSearchKeyPress}
            sx={{ marginRight: '16px', width: '300px' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={handleSearchIconClick} 
                  style={{ padding: 0 }}>
                    <FontAwesomeIcon icon={faSearch} 
                    style={{ cursor: 'pointer', color: 'tomato' }} />
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Vendor Login Icon */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '24px' }}>
              <Tooltip title="Vendor Login">
                <a 
                  href="https://react-vendor-dashboard.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <IconButton style={{ padding: 0, marginBottom: '4px' }}>
                    <FontAwesomeIcon icon={faStore} style={{ fontSize: '1.5rem', color: '#333' }} />
                  </IconButton>
                  <StyledButton style={{ padding: 0, fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                    Vendor
                  </StyledButton>
                </a>
              </Tooltip>
            </div>
            
            {/* User Sign In/Out */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={handleSignInClick}>
              <IconButton style={{ padding: 0, marginBottom: '4px' }}>
                <FontAwesomeIcon icon={faUser} style={{ fontSize: '1.5rem', color: '#333' }} />
              </IconButton>
              <StyledButton style={{ padding: 0 }}>
                {isLoggedIn ? 'Sign Out' : 'Sign In'}
              </StyledButton>
            </div>

            {/* Shopping Bag icon */}
            {isLoggedIn && (
              <div style={{ marginLeft: '24px' }}>
                <IconButton onClick={openCart}>
                  <FontAwesomeIcon icon={faShoppingBag} style={{ fontSize: '1.5rem', color: '#333' }} />
                  {/* Display the bag count */}
                  {bagCount > 0 && (
                    <span style={{ 
                      position: 'absolute', 
                      top: 0, 
                      right: 0,
                      background: 'tomato', 
                      color: '#fff', 
                      borderRadius: '50%',
                      padding: '2px 6px', 
                      fontSize: '12px' 
                    }}>
                      {bagCount}
                    </span>
                  )}
                </IconButton>
              </div>
            )}
          </div>
        </StyledToolbar>
      </StyledAppBar>
      <Login 
        open={showLogin || isSignOut} 
        onClose={handleCloseLogin} 
        onLogout={handleLogout} 
        onOtpVerified={handleOtpVerified}
        isSignOut={isSignOut}
        handleLogout={handleLogout}
        setIsSignOut={setIsSignOut}
      />
    </>
  );
};

export default TopBar;