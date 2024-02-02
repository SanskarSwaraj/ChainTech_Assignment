// Import required modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Secret key for JWT
const JWT_SECRET = "asdcbbiq21376330[]slc39";

// MongoDB connection string
const mongoUrl = "mongodb+srv://sanskar:sanskarpw@cluster0.h5ftb2c.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(mongoUrl, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to Database");
}).catch(e => console.log(e));

// Define User model
require("./userDetails");
const User = mongoose.model("UserInfo");

// Register endpoint
app.post("/register", async (req, res) => {
    const { fname, lname, email, password } = req.body;

    // Encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        // Check if user already exists
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.send({ error: "User Exists" });
        }

        // Create new user
        await User.create({
            fname,
            lname,
            email,
            password: encryptedPassword,
        });
        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});

// Login endpoint
app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "User not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        // Generate JWT token
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: 5000 });
        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
        } else {
            return res.json({ error: "error" });
        }
    }
    res.json({ status: "error", error: "Invalid Password" });
});

// Get user data endpoint
app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
        // Verify JWT token
        const user = jwt.verify(token, JWT_SECRET, (err, res) => {
            if (err) {
                return "token expired";
            }
            return res;
        });
        if (user == "token expired") {
            return res.send({ status: "error", data: "token expired" });
        }

        const useremail = user.email;
        // Find user data by email
        User.findOne({ email: useremail })
            .then((data) => {
                res.send({ status: "ok", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            });
    } catch (error) { }
});

// Start server
app.listen(5000, () => {
    console.log("Server Started");
});
