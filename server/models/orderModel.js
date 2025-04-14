import mongoose from "mongoose";
const orderSchema = mongoose.Schema({
    buyer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Buyer', 
      required: true 
    },
    farmer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Farmer', 
      required: true 
    },
    products: [{
      product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product' 
      },
      quantity: { type: Number, required: true },
      pricePerUnit: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending"
    },
    payment: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Payment' 
    },
    logistics: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Logistics' 
    },
    createdAt: { type: Date, default: Date.now }
  });
  
  const OrderModel = mongoose.model('Order', orderSchema);

  export default OrderModel;