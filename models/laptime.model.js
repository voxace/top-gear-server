module.exports = mongoose => {
    const LapTime = mongoose.model("LapTime",
      mongoose.Schema(
        {
          name: {type: String, required: true },
          minutes: { type: Number, required: true, min: 0, max: 59 },
          seconds: { type: Number, required: true, min: 0, max: 59 },
          ms: { type: Number, required: true, min: 0, max: 999},
          leaderboard: { type: mongoose.Schema.Types.ObjectId, ref: 'Leaderboard', required: true }
        },
        { timestamps: true }
      )
    );

    return LapTime;
  };