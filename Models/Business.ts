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
      type: [String],
      default: [],
      validate: {
        validator: (val: string[]) =>
          val.every((num) => /^[0-9\-()+\s]+$/.test(num)),
        message: "Each phone number must be a valid format.",
      },
      address: {
        street: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        zip: { type: String, default: "" },
        country: { type: String, default: "" },
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
      },
      imageMain: {
        type: String,
      },
      imageMisc: {
        type: [String],
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
      }
    },
  },
  { timestamps: true }
);

const Business = mongoose.model("Business", BusinessSchema);

export default Business;