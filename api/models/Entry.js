import mongoose, { Schema } from 'mongoose';

const EntrySchema = mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
      unique: true,
    },
    macros: [
      {
        macro: {
          type: [Schema.Types.ObjectId],
          ref: 'Macro',
        },
        amount: Number,
      },
    ],
    workout: {
      session: {
        type: [Schema.Types.ObjectId],
        required: false,
        ref: 'Workout',
      },
      reps: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Entry', EntrySchema);
