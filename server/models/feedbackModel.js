import mongoose from "mongoose";
const feedbackSchema = mongoose.Schema({
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
    order: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Order', 
      required: true 
    },
    rating: { 
      type: Number, 
      min: 1, 
      max: 5, 
      required: true 
    },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });
  
  const FeedbackModel = mongoose.model('Feedback', feedbackSchema);

  export default FeedbackModel;