import { FaBars, FaBell, FaSignOutAlt, FaLeaf, FaTimes, FaUserCircle } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const FarmerHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
          <div className="flex items-center gap-2 text-green-600">
            <FaLeaf className="text-2xl" />
            <span className="text-xl font-bold">AgriConnect</span>
          </div>

          {/* Desktop Navigation */}
          <div className="items-center hidden gap-8 lg:flex">
            <NavLink 
              to="/farmer-home" 
              className={({ isActive }) => 
                `hover:text-green-600 ${isActive ? 'text-green-700 font-semibold' : ''}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/farmer/my-products" 
              className={({ isActive }) => 
                `hover:text-green-600 ${isActive ? 'text-green-700 font-semibold' : ''}`
              }
            >
              My Products
            </NavLink>
            <NavLink 
              to="/farmer/orders" 
              className={({ isActive }) => 
                `hover:text-green-600 ${isActive ? 'text-green-700 font-semibold' : ''}`
              }
            >
              Orders
            </NavLink>

            {/* Profile & Logout */}
            {isAuthenticated && (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/farmer/profile')}
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
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="text-2xl text-green-600 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars />
          </button>
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
              to="/farmer-home" 
              className="text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/farmer/my-products" 
              className="text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              My Products
            </NavLink>
            <NavLink 
              to="/farmer/orders" 
              className="text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Orders
            </NavLink>
            
            {isAuthenticated && (
              <>
                <NavLink 
                  to="/farmer/profile" 
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FarmerHeader;