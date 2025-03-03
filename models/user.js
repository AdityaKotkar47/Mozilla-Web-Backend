const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin"], // Only admins can log in
      default: "admin",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
