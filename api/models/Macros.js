import mongoose from 'mongoose';

const MacroSchema = mongoose.Schema(
  {
    calories: {
      type: Number,
      required: false,
      default: 0,
    },
    creatine: {
      type: Number,
      required: false,
      default: 0,
    },
    protein: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Macros', MacroSchema);
