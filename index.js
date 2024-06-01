const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const uuid = require('uuid');
const exp = require('constants');
const fs = require('fs').promises;
const authRouter = require('./routes/auth');
const shiftRouter = require('./routes/shift');
const dotenv = require('dotenv').config();

const { MONGO_URL } = process.env;

const app = express();

mongoose
  .connect(MONGO_URL)
  .then(con => {
    console.log('Database connection successful');
  })
  .catch(err => {
    console.log(err);

    process.exit(1);
  });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRouter);
app.use('/api/shift', shiftRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});
const port = 4000;

app.listen(port, () => {
  console.log(`Server up and running on port: ${port}`);
});
