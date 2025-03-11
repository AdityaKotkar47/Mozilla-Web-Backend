require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./DB/db');
const imageUploadRoutes = require('./routes/imageUpload');
const eventRoutes = require('./routes/eventRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// Connect to MongoDB
connectDB();

console.log("DB connected");

// Middleware
app.use(bodyParser.json({ limit: '50mb' })); // Increased limit for image uploads
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

app.use(cors({
    origin: 'http://localhost:3000'  //to be changed later to vercel url
}));

// Routes
app.get("/", (req, res) => {
  res.send("Server deployed and running on vercel.");
});
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/upload', imageUploadRoutes);
app.use('/api/events', eventRoutes);
// app.use('/api/users', require('./routes/users'));
app.use('/api/posts', blogRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});