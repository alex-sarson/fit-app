import mongoose from 'mongoose';

const WorkoutSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    exercises: [
      {
        name: {
          type: String,
          required: true,
        },
        sets: {
          type: Number,
          required: true,
        },
        reps: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Workout', WorkoutSchema);
