
if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const upload = require("multer")();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const authRouter = require('./routes/authRoutes');
const bgRouter = require('./routes/bgRemoveRoutes');
const apiRouter = require('./routes/apiRoutes');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
// app.use(upload.single());
app.use(express.json({ limit: '50mb' }));
app.use(
  cors({
    credentials: true,
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
);
app.use(cookieParser());
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
//Serve  static files
if(process.env.NODE_ENV == 'production'){
	app.use(express.static(path.resolve(__dirname,  'frontend', 'build')));
	app.get('/', (req, res)=>{
		res.sendFile(path.resolve(__dirname ,'frontend', 'build', 'index.html'));
	});
	app.get('/*', (req, res)=>{
		res.sendFile(path.resolve(__dirname ,'/frontend', 'build', 'index.html'));
	});
};
app.get('/', (req, res) => {
  res.send('Welcome to APIfy');
});

/**
 * Router Middleware
 * Router - /api/auth/*
 * Method - *
 */
app.use('/api/auth', authRouter);

/**
 * Router Middleware
 * Router - /api/bg/*
 * Method - *
 */
app.use('/api/bg', bgRouter);

/**
 * Router Middleware
 * Router - /api/userAPIs/*
 * Method - *
 */
app.use('/api/userAPIs', apiRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
