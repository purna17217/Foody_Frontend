import React, { useState,useEffect } from 'react'
import TopBar from '../components/TopBar'
import ItemsDisplay from '../components/ItemsDisplay'
import Chains from '../components/Chains'
import FirmCollections from '../components/FirmCollections'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from '../components/Cart'

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false); // State to manage cart visibility
  const [bagCount, setBagCount] = useState(0);

  const handleSuccessfulLogin = () => {
    toast.success('Login successful!'); // Display success message
  };

  const openCart = () => {
    console.log("Cart is opened")
    setShowCart((prev) => !prev); // Toggle cart visibility
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);  // Update cart items
  };

    const closeCart = () => {
    setShowCart(false); // Close cart
  };

  // Optionally, load cart items on page load
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
    setBagCount(storedCartItems.length); // Set the bag count on page load
  }, []);

  useEffect(() => {
    console.log("LandingPage render");
    console.log("openCart function:", openCart);
}, [openCart]);

  return (
    <div>
        <TopBar 
        showLogin={showLogin} 
        setShowLogin={setShowLogin}
        onSuccessfulLogin={handleSuccessfulLogin} 
        bagCount={bagCount}
        setBagCount={setBagCount}
        openCart={openCart}/>
          {showCart && <Cart cartItems={cartItems} onClose={closeCart}/>}
        <ItemsDisplay/>
        <Chains/>
        <FirmCollections/>
    </div>
  )
}

export default LandingPage