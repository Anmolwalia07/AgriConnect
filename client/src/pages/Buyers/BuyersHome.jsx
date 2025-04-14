import { useState, useEffect } from "react";
import { FaFilter, FaStar, FaTruck } from "react-icons/fa";
import { Link } from "react-router-dom";
import BuyerHeader from "./BuyerHeader"; // Import the header component
import Footer from "../../Components/Footer"

const BuyerHome = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    category: "",
    minPrice: 0,
    maxPrice: 10000,
    certification: "",
  });

  // Fetch products from API (mock implementation)
  useEffect(() => {
    // Replace with actual API call
    const mockProducts = [
      {
        id: 1,
        name: "Organic Wheat",
        price: 25,
        farmer: "Green Valley Farms",
        rating: 4.8,
        image: "https://picsum.photos/200/200?random=1", // Wheat field
        certification: "Organic",
      },
      {
        id: 2,
        name: "Fresh Tomatoes",
        price: 18,
        farmer: "Sunrise Orchards",
        rating: 4.5,
        image: "https://picsum.photos/200/200?random=2", // Tomato garden
        certification: "Pesticide-Free",
      },
      {
        id: 3,
        name: "Organic Basmati Rice",
        price: 60,
        farmer: "Punjab Harvest Co.",
        rating: 4.9,
        image: "https://picsum.photos/200/200?random=3", // Rice field
        certification: "Organic",
      },
      {
        id: 4,
        name: "Bell Peppers",
        price: 30,
        farmer: "Fresh Farms Ltd.",
        rating: 4.7,
        image: "https://picsum.photos/200/200?random=4", // Vegetable farm
        certification: "Non-GMO",
      }
    ];
    setProducts(mockProducts);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      product.price >= filters.minPrice &&
      product.price <= filters.maxPrice &&
      product.certification.includes(filters.certification)
    );
  });

  return (
    <div>
      <BuyerHeader />

      {/* Hero Section */}
      <section className="py-12 bg-green-50">
        <div className="container mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold text-green-700">
            Fresh Produce, Fair Prices
          </h1>
          <p className="mb-8 text-xl text-gray-700">
            Connect directly with farmers across India
          </p>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search products..."
              className="p-3 rounded-l-lg w-96 focus:outline-none"
              name="search"
              onChange={handleFilterChange}
            />
            <button className="p-3 text-white bg-green-600 rounded-r-lg hover:bg-green-700">
              <FaFilter className="text-xl" />
            </button>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <div className="container mx-auto my-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:px-10">
          <select
            name="location"
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All Locations</option>
            <option value="haryana">Haryana</option>
            <option value="punjab">Punjab</option>
          </select>
          <select
            name="category"
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All Categories</option>
            <option value="grains">Grains</option>
            <option value="vegetables">Vegetables</option>
          </select>
          {/* <div className="flex items-center space-x-2">
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              onChange={handleFilterChange}
              className="w-24 p-2 border rounded"
            />
            <span>-</span>
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              onChange={handleFilterChange}
              className="w-24 p-2 border rounded"
            />
          </div> */}
        </div>
      </div>

      {/* Product Listings */}
      <section className="container mx-auto my-8">
        <h2 className="mb-6 text-2xl font-semibold">Available Products</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden transition bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              <img
                src={`/images/${product.image}`}
                alt={product.name}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold">{product.name}</h3>
                <p className="mb-2 text-gray-600">₹{product.price}/kg</p>
                <div className="flex items-center mb-2">
                  <FaStar className="mr-1 text-yellow-500" />
                  <span>{product.rating}</span>
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className="block px-4 py-2 text-center text-white bg-green-600 rounded-full hover:bg-green-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Farmers */}
      <section className="py-12 bg-green-50">
        <div className="container mx-auto">
          <h2 className="mb-6 text-2xl font-semibold">Top Rated Farmers</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((farmer) => (
              <div
                key={farmer}
                className="p-4 transition bg-white rounded-lg shadow-md hover:shadow-lg"
              >
                <img
                  src="/farmer.jpg"
                  alt="Farmer"
                  className="w-24 h-24 mx-auto mb-4 rounded-full"
                />
                <h3 className="mb-2 font-bold text-center">Green Valley Farms</h3>
                <div className="flex items-center justify-center mb-2 space-x-2">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <p className="text-center text-gray-600">Organic Certified</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto my-8">
        <h2 className="mb-6 text-2xl font-semibold">How It Works</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="text-center">
            <FaTruck className="mx-auto mb-4 text-4xl text-green-600" />
            <h3 className="mb-2 font-bold">1. Browse Products</h3>
            <p>Search and filter thousands of agricultural products</p>
          </div>
          <div className="text-center">
            <FaTruck className="mx-auto mb-4 text-4xl text-green-600" />
            <h3 className="mb-2 font-bold">2. Place Order</h3>
            <p>Choose quantity and confirm your order</p>
          </div>
          <div className="text-center">
            <FaTruck className="mx-auto mb-4 text-4xl text-green-600" />
            <h3 className="mb-2 font-bold">3. Get Delivery</h3>
            <p>Track your order until delivery</p>
          </div>
        </div>
      </section>

      {/* Footer */}
     <Footer/>
    </div>
  );
};

export default BuyerHome;