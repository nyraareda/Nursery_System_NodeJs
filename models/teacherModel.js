const mongoose = require("mongoose");

const schemaTeacher = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    fullName: {
      type: String,
      required: true,
      minlength: 5,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    image: {
      type: String,
      default: "uploads/profile.jpg",
      // required: true,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

schemaTeacher.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
schemaTeacher.index({ email: 1 }, { unique: true });
module.exports = mongoose.model("Teacher", schemaTeacher);
