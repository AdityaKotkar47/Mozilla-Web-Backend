const memberSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String, // URL to the image
      default: "", // Default image if not provided
    },
    bio: {
      type: String,
      default: "",
    },
    department: {
      type: String,
      default: "",
    },
    year: {
      type: Number, // Year of study (e.g., 1, 2, 3, 4)
      default: 1,
    },
    achievements: [
      {
        title: String,
        description: String,
        date: Date,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });