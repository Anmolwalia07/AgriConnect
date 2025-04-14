import mongoose from "mongoose";
const farmerSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["farmer"],
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
  farmName: { type: String },
  cropsGrown: [{ type: String }], // Array of crops
  livestock: [{ type: String }], // Array of livestock
  certifications: [{ type: String }], // e.g., organic, ISO
  bankDetails: { // For payments
    accountHolder: String,
    accountNumber: String,
    bankName: String,
    ifscCode: String
  }
});

const FarmerModel = mongoose.model('Farmer', farmerSchema);

export default FarmerModel;