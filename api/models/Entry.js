import mongoose, { Schema } from 'mongoose';

const EntrySchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    macro: {
      type: [Schema.Types.ObjectId],
      required: false,
      ref: 'Macro',
    },
    workout: {
      type: [Schema.Types.ObjectId],
      required: false,
      ref: 'Workout',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Entry', EntrySchema);
