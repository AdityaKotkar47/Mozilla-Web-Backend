const eventSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      enum: ["Workshop", "Hackathon", "Webinar", "Meetup", "Other"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    photos: [
      {
        type: String, // URLs to event photos
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });