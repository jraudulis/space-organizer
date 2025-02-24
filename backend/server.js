const express = require('express');
require('dotenv').config();
const nodemailer = require('nodemailer');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// // Env variables with sensitive info
// const emailUser = process.env.EMAIL_USER;
// const emailPass = process.env.EMAIL_PASS;

// Theoretical database
let messages = [];

app.post("/submit-form", async (req, res) => {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email || !message) {
        return res.status(400).json({ message: "All fields are required." });
    }
    // Store recieved data in to a database, in this case messages array
    messages.push({ name, phone, email, message, date: new Date() });

    // // Recipient recieves email notification with the form data
    // let transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: { user: emailUser,
    //             pass: emailPass
    //          }
    // });

    // let mailOptions = {
    //     from: email,
    //     to: process.env.EMAIL_USER,
    //     subject: "New Contact Form Message",
    //     text: `From: ${name} (${email})\n\nMessage: ${message}`
    // };

    try {
        return res.json({ message: "✅ Message sent successfully!", messages });
    } catch (error) {
        console.error("Email error:", error);
       return res.status(500).json({ message: "Error sending message. Try again later." });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});