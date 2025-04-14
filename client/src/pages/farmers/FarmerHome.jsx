import { useState, useEffect } from 'react';
import { FaBoxes, FaChartLine, FaTruck } from 'react-icons/fa';
import ProductCard from './ProductCard';
import FarmerHeader from './FamerHeader';
import Footer from '../../Components/Footer';
import Market from '../../Components/Market';
import { useNavigate } from 'react-router-dom';

const FarmerHome = () => {
  const [products, setProducts] = useState([]);
  const [marketPrices, setMarketPrices] = useState([]);
  const [analytics, setAnalytics] = useState({ totalSales: 0, pendingOrders: 0 });
  const navigate=useNavigate();

  // Mock API calls (replace with actual API integration)
  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: 'Organic Wheat',
        price: 25,
        stock: 1000,
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        name: 'Fresh Tomatoes',
        price: 20,
        stock: 500,
        imageUrl: 'https://via.placeholder.com/150',
      },
    ]);

    setMarketPrices([
      { product: 'Wheat', price: '₹25/kg' },
      { product: 'Rice', price: '₹40/kg' },
    ]);

    setAnalytics({
      totalSales: 15000,
      pendingOrders: 3,
    });
  }, []);

  return (
    <div>
      <FarmerHeader />

      {/* Hero Section */}
      <section className="py-12 bg-green-50">
        <div className="container px-6 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold text-green-700">
            Welcome Back, Farmer!
          </h1>
          <p className="mb-8 text-xl text-green-600">
            Manage your farm, track sales, and connect with buyers
          </p>
        </div>
      </section>

      {/* Analytics Dashboard */}
      <section className="container px-6 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <FaChartLine className="mb-4 text-3xl text-green-600" />
            <h3 className="text-xl font-semibold">Total Sales</h3>
            <p className="text-2xl text-green-700">₹{analytics.totalSales}</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <FaBoxes className="mb-4 text-3xl text-green-600" />
            <h3 className="text-xl font-semibold">Pending Orders</h3>
            <p className="text-2xl text-green-700">{analytics.pendingOrders}</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <FaTruck className="mb-4 text-3xl text-green-600" />
            <h3 className="text-xl font-semibold">Ready to Ship</h3>
            <p className="text-2xl text-green-700">2 Orders</p>
          </div>
        </div>
      </section>

      {/* Product Listings */}
      <section className="container px-6 py-8 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold text-green-700">
            Your Products
          </h2>
          <button 
            className="px-6 py-2 text-white bg-green-600 rounded-full hover:bg-green-700"
            onClick={() => 
              navigate("/farmer-home/addProduct")
            }
          >
            Add Product
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Market Prices */}
      <Market/>

      <Footer/>
    </div>
  );
};

export default FarmerHome;