const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }, // Available stock
    category: { 
      type: String, 
      enum: ["crop", "livestock", "dairy", "organic"], 
      required: true 
    },
    farmer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Farmer', 
      required: true 
    },
    images: [{ type: String }], // URLs to product images
    createdAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["available", "sold_out"],
      default: "available"
    }
  });
  
  const ProductModel = mongoose.model('Product', productSchema);

  export default ProductModel;