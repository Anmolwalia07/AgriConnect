import mongoose from "mongoose";
const adminSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin"],
    required: true
  },
  phone: { type: String, required: true },
  permissions: [{
    type: String,
    enum: ["manage_users", "manage_products", "resolve_disputes"],
    required: true
  }]
});

const AdminModel = mongoose.model('Admin', adminSchema);

export default AdminModel;