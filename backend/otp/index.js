const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const mongoose = require('mongoose');

const dotenv = require("dotenv");
dotenv.config();

const User=require('../otp/models/Users');




const app = express();
app.use(cors());
app.use(express.json());

let otpStore = {}; // { email: otp }

app.post("/send-otp", async (req, res) => {
  const { email } = req.body;                                                      //

  if (!email.endsWith("@rgukt.ac.in")) {
    return res.status(400).json({ error: "Only @rgukt.ac.in emails allowed" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;                                                         //

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"EduHub OTP" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });

    return res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] === otp) {
    delete otpStore[email]; // Invalidate OTP after successful use
    return res.json({ success: true, message: "OTP verified" });
  } else {
    return res.status(400).json({ error: "Invalid OTP" });
  }
});



//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI,{})
.then(()=>console.log('MongoDB is Connected'))
.catch(err=>console.error(err));

app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Username already exists' });
    } else {
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
