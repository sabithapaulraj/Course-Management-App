const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const courseRoutes = require('./routes/courseRoutes');
const cors = require('cors');

// Load .env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/courses', courseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
