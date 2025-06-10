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




// User Login
export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });

    } catch (err) {
        console.error("Error in user login:", err);
        res.status(500).json({ 
            message: "An error occurred during login", 
            error: err.message 
        });
    }
}