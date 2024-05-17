require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors package
const app = express();
const formRoutes=require('./routes/form')



app.use(express.json());
app.use(cors({
  origin: 'https://benevolent-melba-c893ce.netlify.app', // Allow requests from localhost:3000
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));


app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error('Error connecting to database:', err));

app.get('/', (req, res) => {
  res.send("Welcome to project Tech?H");
});

app.get('/gf', (req, res) => {
  res.send("Welcome to project Tech?Hostel");
});

app.use('/api/form',formRoutes)


app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
