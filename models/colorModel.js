const mongoose = require('mongoose')

const colorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please provide the color name'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Color = mongoose.model('Color', colorSchema)

module.exports = Color