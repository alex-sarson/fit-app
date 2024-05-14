import mongoose from 'mongoose';

const MacroSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Macro', MacroSchema);
