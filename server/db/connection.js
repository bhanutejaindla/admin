import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://bhanutejaindla123:tvGwoTyqHDAbgYWF@cluster0.v8jq1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);  // Exit process with failure
    }
};

// Define User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
});

// Create User model
export const User = mongoose.model('User', userSchema);

// Define Employee schema
const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    designation: String,
    gender: String,
    course: [String],
    image: String, // Path to the uploaded image
    createDate: String
});

export const Employee = mongoose.model('Employee', employeeSchema);
