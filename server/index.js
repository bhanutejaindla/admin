import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';

import jwt from 'jsonwebtoken';
import { connectDB, User, Employee } from './db/connection.js'; 
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to the database
connectDB();

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET;

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


const password = 'Basara@2020';  // Replace with the password you want to hash

// Hash the password

const DEFAULT_ADMIN_USERNAME = 'admin';
const DEFAULT_ADMIN_PASSWORD_HASH = process.env.DEFAULT_ADMIN_PASSWORD_HASH;  // Replace with your actual hashed password

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (username === DEFAULT_ADMIN_USERNAME) {
        // Check if the password matches the default hashed password
        const isPasswordValid = await bcrypt.compare(password, DEFAULT_ADMIN_PASSWORD_HASH);

        if (isPasswordValid) {
            // Generate a JWT token
            const token = jwt.sign({ username: DEFAULT_ADMIN_USERNAME }, JWT_SECRET, { expiresIn: '1h' });

            // Respond with the token
            return res.status(200).json({ message: 'Login successful', token });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});


app.post('/createEmployee', upload.single('image'), async (req, res) => {
    const { name, email, mobile, designation, gender, course, createDate } = req.body;
    const image = req.file ? req.file.path : ''; // Path to the uploaded image

    try {
        const newEmployee = new Employee({
            name,
            email,
            mobile,
            designation,
            gender,
            course: JSON.parse(course), // Assuming course is sent as a JSON string
            image,
            createDate
        });

        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating employee', error });
    }
});

// Protected Route Example
app.get('/protected', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        res.status(200).json({ message: 'Protected data', user: decoded });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});