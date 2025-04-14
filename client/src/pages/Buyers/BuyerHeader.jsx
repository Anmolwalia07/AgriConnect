import { FaBars, FaBell, FaCartPlus, FaLeaf, FaTimes, FaUserCircle } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const BuyerHeader = () => {
  const [language, setLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-md">
        <nav className="container flex items-center justify-between px-6 py-4 mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 text-green-600">
            <FaLeaf className="text-2xl" />
            <span className="text-xl font-bold">AgriConnect</span>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-6 ">
            <div className='items-center hidden gap-8 lg:flex'>
            <NavLink 
              to="/buyer-home" 
              className={({ isActive }) => 
                `hover:text-green-600 ${isActive ? 'text-green-700 font-semibold' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/market-prices" 
              className={({ isActive }) => 
                `hover:text-green-600 ${isActive ? 'text-green-700 font-semibold' : ''}`
              }
            >
              Market Prices
            </NavLink>
            <NavLink 
              to="/buyer/orders" 
              className={({ isActive }) => 
                `hover:text-green-600 ${isActive ? 'text-green-700 font-semibold' : ''}`
              }
            >
              My Orders
            </NavLink>

            {/* Language Selector */}
            <select 
              className="text-green-600 bg-transparent border-none focus:ring-0"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="ta">தமிழ்</option>
            </select>
            </div>

            {/* Cart & Notifications */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full hover:bg-green-50">
                <FaCartPlus className="text-xl text-green-600" />
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
                  3
                </span>
              </button>
              <button className="relative p-2 rounded-full hover:bg-green-50">
                <FaBell className="text-xl text-green-600" />
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
                  5
                </span>
              </button>
              <button 
            className="text-2xl text-green-600 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars />
          </button>
            </div>

            {/* Profile & Logout */}
              <div className="items-center hidden gap-4 lg:flex">
                <button 
                  onClick={() => navigate('/profile')}
                  className="p-2 rounded-full hover:bg-green-50"
                >
                  <FaUserCircle className="text-2xl text-green-600" />
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 text-green-600 border border-green-600 rounded-full hover:bg-green-50"
                >
                  Logout
                </button>
              </div>
          </div>

          {/* Mobile Menu Button */}
          
        </nav>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6">
          <button 
            className="absolute text-2xl top-4 right-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaTimes />
          </button>
          
          <div className="flex flex-col gap-6 mt-12">
            <NavLink 
              to="/buyer-home" 
              className="text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/market-prices" 
              className="text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Market Prices
            </NavLink>
            <NavLink 
              to="/buyer/orders" 
              className="text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              My Orders
            </NavLink>

            {/* Mobile Profile & Logout */}
              <>
                <NavLink 
                  to="/profile" 
                  className="text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="px-6 py-2 text-green-600 border border-green-600 rounded-full"
                >
                  Logout
                </button>
              </>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerHeader;