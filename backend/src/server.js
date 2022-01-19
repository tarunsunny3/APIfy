require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
// DB config

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('MongoDB Connected successfully');
});

app.get('/', (req, res) => {
  res.send('Welcome to APIfy');
});

/**
 * Router Middleware
 * Router - /api/auth/*
 * Method - *
 */
app.use('/api/auth', authRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
