import { FaStar, FaShippingFast, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
      {/* Product Image */}
      <div className="flex items-center justify-center h-48 bg-green-50">
        <img 
          src={product.imageUrl || 'https://via.placeholder.com/300x200'} 
          alt={product.name}
          className="object-contain w-full h-full p-4"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Title & Price */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <span className="text-xl font-bold text-green-600">
            ₹{product.price}/kg
          </span>
        </div>

        {/* Farmer Info */}
        <div className="flex items-center mb-3">
          <FaStar className="mr-1 text-yellow-500" />
          <span className="text-sm text-gray-600">1</span>
          <span className="px-2 py-1 ml-2 text-xs text-green-700 bg-green-100 rounded">
            {product.certification || 'Organic'}
          </span>
        </div>

        {/* Availability & Actions */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <FaShippingFast className="inline mr-1" /> 
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </div>
          
          <button 
            className="px-4 py-2 text-white transition bg-green-600 rounded-full hover:bg-green-700"
            onClick={() => console.log('Add to cart:', product.name)}
          >
            Add to Cart
          </button>
        </div>

        {/* View Details */}
        <Link 
          to={`/product/${product.id}`} 
          className="flex items-center mt-3 text-green-600 hover:text-green-700"
        >
          <FaInfoCircle className="mr-1" /> 
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;