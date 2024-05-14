import mongoose from 'mongoose';

const WorkoutSchema = mongoose.Schema(
  {
    name: String,
    exercises: [
      {
        name: String,
        sets: {
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
