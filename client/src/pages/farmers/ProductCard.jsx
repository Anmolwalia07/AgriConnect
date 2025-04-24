import { useContext } from 'react';
import { FaStar, FaShippingFast, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { userContext } from '../../Context/Context';

const ProductCard = ({ product }) => {
  const isBuyer=useContext(userContext).role==="buyer" ? 1 : 0; // Check if the user is a buyer or farmer
  return (
    <div className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg h-full">
      {/* Image Section with Responsive Height */}
      <div className="flex items-center justify-center h-32 bg-green-50 md:h-40">
        <img 
          src={product.imageUrl || 'https://via.placeholder.com/300x200'} 
          alt={product.name}
          className="object-contain w-full h-full p-2 md:p-3"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between p-3 flex-1">
        {/* Title & Price */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold truncate md:text-base lg:text-lg">{product.name}</h3>
          <span className="text-base font-bold text-green-600 md:text-lg lg:text-xl">
            ₹{product.price}/kg
          </span>
        </div>

        {/* Rating & Certification */}
        <div className="flex items-center mb-2 space-x-1">
          <FaStar className="text-yellow-500 md:text-sm" />
          <span className="text-xs text-gray-600 md:text-sm">1</span>
          <span className="px-2 py-1 ml-1 text-[10px] md:text-xs text-green-700 bg-green-100 rounded">
            {product.certification || 'Organic'}
          </span>
        </div>

        {/* Stock & CTA */}
        <div className="flex flex-col gap-2 mb-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-gray-500 md:text-sm">
            <FaShippingFast className="inline mr-1" /> 
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </div>
          <button 
            className="px-3 py-1.5 text-xs text-white transition bg-green-600 rounded-full md:text-sm md:px-4 hover:bg-green-700"
          >
            {isBuyer > 0 ? 'Buy Now' : 'Update Stock'}
          </button>
        </div>

        {/* Details Link */}
        <Link 
          to={`/product/${product.id}`} 
          className="flex items-center mt-1 text-xs text-green-600 md:text-sm hover:text-green-700"
        >
          <FaInfoCircle className="mr-1" /> 
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;