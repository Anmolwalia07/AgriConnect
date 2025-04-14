import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FarmerHeader from './FamerHeader';

const AddProduct = () => {
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
    farmer: '',
    images: [''],
    status: 'available'
  });

  useEffect(() => {
    // Fetch farmers from API
    fetch('/api/farmers')
      .then(res => res.json())
      .then(data => setFarmers(data))
      .catch(err => console.error(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, '']
    });
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        navigate('/products');
      } else {
        alert('Error creating product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <FarmerHeader/>
    <div className="min-h-screen py-8 bg-gray-50">
      
      <div className="max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">Add New Product</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price and Quantity */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Price</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                  className="w-full py-2 pr-3 border rounded-lg pl-7 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                min="0"
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Category and Status */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="crop">Crop</option>
                <option value="livestock">Livestock</option>
                <option value="dairy">Dairy</option>
                <option value="organic">Organic</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="available">Available</option>
                <option value="sold_out">Sold Out</option>
              </select>
            </div>
          </div>

          {/* Images Section */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Images</label>
            <div className="space-y-2">
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="Image URL"
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="px-3 py-2 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addImageField}
              className="px-4 py-2 mt-2 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Add Image
            </button>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-6 py-3 text-white transition bg-green-600 rounded-lg md:w-auto hover:bg-green-700"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
    </>

  );
};

export default AddProduct;