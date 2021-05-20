module.exports = mongoose => {
    const Leaderboard = mongoose.model("Leaderboard",
      mongoose.Schema(
        {
          track: {type: String, required: true },
          car: {type: String, required: true }
        },
        { timestamps: true }
      )
    );

    return Leaderboard;
  };