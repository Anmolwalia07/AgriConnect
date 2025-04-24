import React from 'react'
import Footer from './Footer';

function Market() {
  const marketPrices = [
    { crop: "Wheat", price: "₹2,050", unit: "per quintal" },
    { crop: "Rice", price: "₹3,200", unit: "per quintal" },
    { crop: "Tomato", price: "₹45", unit: "per kg" },
    { crop: "Potato", price: "₹25", unit: "per kg" },
  ];
  return (
    <>
    <section className="py-16 bg-white" id="prices">
        <div className="container px-6 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">Live Market Prices</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {marketPrices.map((price, index) => (
              <div key={index} className="p-6 text-center rounded-lg bg-green-50">
                <h3 className="mb-2 text-2xl font-bold text-green-600">{price.price}</h3>
                <p className="mb-1 text-lg font-semibold">{price.crop}</p>
                <p className="text-sm text-gray-600">{price.unit}</p>
              </div>
            ))}
          </div>
        </div>
        
      </section>
      <Footer/>
      </>
  )
}

export default Market