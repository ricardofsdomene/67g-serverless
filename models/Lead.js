const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const leadSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

leadSchema.plugin(mongoosePaginate);

module.exports = mongoose.models.Lead || mongoose.model("Lead", leadSchema);
