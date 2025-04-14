import React from 'react'
import Header from '../Components/Header'
import Features from '../Components/Features'
import Footer from '../Components/Footer'

function Feature() {
  return (
    <>
    <Header/>
    <div className='w-full h-5'></div>
    <Features/>
    <div className='w-full h-[18px]'></div>
    <Footer/>
    </>
  )
}

export default Feature