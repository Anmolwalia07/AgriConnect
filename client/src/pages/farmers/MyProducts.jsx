import React, { useState } from 'react';
import ProductCard from './ProductCard';
import FarmerHeader from './FamerHeader';

const MyProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Organic Honey', description: 'Pure natural honey from wildflowers' },
    { id: 2, name: 'Herbal Tea', description: 'Ayurvedic herbal tea mixture' },
  ]);

  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: `New Product ${products.length + 1}`,
      description: 'Product description'
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  return (
    <div className="min-h-screen bg-white ">
      <div className="max-w-full mx-auto">
        {/* Header Section */}
        <FarmerHeader/>
        <div className="flex justify-between items-center mb-8 p-6">
          <h1 className="text-3xl font-bold text-green-800">My Products</h1>
          <button
            onClick={handleAddProduct}
            className="bg-white text-green-800 px-6 py-2 rounded-full border-2 border-green-800
                       hover:bg-green-800 hover:text-white transition-colors duration-300"
          >
            Add More Products
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6">
          {products.map((product) => (
           <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProducts;