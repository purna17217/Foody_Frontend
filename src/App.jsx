import React from 'react'
import LandingPage from './foody/pages/LandingPage'
import '../src/App.css'
import {Routes, Route} from 'react-router-dom'
import ProductMenu from './foody/components/ProductMenu'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element= {<LandingPage/>}/>
      <Route path='/products/:firmId/:firmname' element={<ProductMenu/>}/>
    </Routes>
    <ToastContainer />
    </>
  )
}

export default App