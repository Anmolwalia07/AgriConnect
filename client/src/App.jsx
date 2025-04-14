import React from 'react'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import BuyersHome from './pages/Buyers/BuyersHome'
import Feature from './pages/Feature'
import Price from './pages/Price'
import FarmerHome from './pages/farmers/FarmerHome'
import BuyerProtectedWrapper from './ProtectedWrapper/BuyerProtectedWrapper'
import FarmerProtectedWrapper from './ProtectedWrapper/FarmerProtectedWrapper'
import AddProduct from './pages/farmers/AddProduct'

function App() {
  const queryClient=new QueryClient();
  return (
   <QueryClientProvider client={queryClient}>
     <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='/features' element={<Feature/>}/>
      <Route path='/prices' element={<Price/>}/>
      <Route path="/buyer-home" element={<BuyerProtectedWrapper><BuyersHome/></BuyerProtectedWrapper>}/>
      <Route path="/farmer-home" element={<FarmerProtectedWrapper><FarmerHome/></FarmerProtectedWrapper>}/>
      <Route path='/farmer-home/addProduct' element={<FarmerProtectedWrapper><AddProduct/></FarmerProtectedWrapper>}/>
    </Routes>
   </QueryClientProvider>
  )
}

export default App