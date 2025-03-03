const testimonialSchema = new mongoose.Schema({
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    authorName: {
      type: String, // Name of the member providing the testimonial
      required: true,
    },
    authorRole: {
      type: String, // Role of the member (e.g., "President", "Member")
      default: "Member",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  