import User from "../models/userModel.js";
import bcrypt from "bcrypt";



// User registration

export async function userRegistration(req, res) {
    try {
        const newUserData = req.body;

        
        if (!newUserData.firstName || !newUserData.lastName || !newUserData.email || !newUserData.password) {
        return res.status(400).json({ message: "All fields are required" });
         }

        if (newUserData.password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
  
        const existingUser = await User.findOne({ email: newUserData.email });
        if (existingUser) {
            return res.status(400).json({ message: "A user with this email already exists." });
        }

        newUserData.password = bcrypt.hashSync(newUserData.password, 10);
        
        const user = new User(newUserData);
        await user.save();

        res.status(201).json({ message: "Registration successful" });
    } catch (err) {
        console.error("Error in user registration:", err);
        res.status(500).json({ 
            message: "An error occurred during registration", 
            error: err.message 
        });
    }
}