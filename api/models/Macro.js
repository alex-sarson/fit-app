import mongoose from 'mongoose';

const MacroSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Macro', MacroSchema);
