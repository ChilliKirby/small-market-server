import mongoose from "mongoose";


const BusinessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      default: "000-000-0000",
    },
    street: {
      type: String,
      default: '',
      required: true,
    },
    city: {
      type: String,
      default: '',
      required: true,
    },
    state: {
      type: String,
      default: '',
      required: true,
    },
    zipcode: {
      type: String,
      default: '',
      required: true,
    },
    info: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    imageMain: {
      type: String,
      default: '',
    },
    imageFirst: {
      type: String,
      default: '',
    },
    imageSecond: {
      type: String,
      default: '',
    },
    imageThird: {
      type: String,
      default: '',
    },
    subscriptionPlan: {
      type: String,
      enum: ['free', 'pro'],
      default: 'free'
    },
    paymentDate: {
      type: Date,
    },
    subscriptionEndDate: {
      type: Date
    },
    autoRenew: {
      type: Boolean,
      default: false
    },
    paymentProvider: {
      type: String,
      enum: ['stripe', 'paypal', 'none'],
      default: 'none'
    },
    paymentId: {
      type: String, //External ID from Stripe/Paypal/etc
    },
    status:{
      type: String,
      enum: ['approved', 'suspended'],
      default: 'approved'
    }
  },


  
  { timestamps: true }
);

const Business = mongoose.model("Business", BusinessSchema);

export default Business;