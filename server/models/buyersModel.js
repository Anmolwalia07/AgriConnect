import mongoose from "mongoose";
const buyerSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["buyer"],
    required: true
  },
  phone: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },
  profilePicture: { type: String, default: null },
  orderHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  preferredPaymentMethod: {
    type: String,
    enum: ["credit_card", "paypal", "bank_transfer"],
    default: "credit_card"
  }
});

const BuyerModel = mongoose.model('Buyer', buyerSchema);

export default BuyerModel;