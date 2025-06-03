import mongoose from "mongoose";
import { validate } from "react-native-web/dist/cjs/exports/StyleSheet/validate";

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
    },
  },
  { timestamps: true }
);

const Business = mongoose.model("Business", BusinessSchema);

    export default Business;