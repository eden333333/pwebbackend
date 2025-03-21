import { log } from "console";
import User from "../models/user";
import jsonwebtoken from 'jsonwebtoken'
import mongoose from "mongoose";
// פונקציה שמחזירה את כל המשתמשים
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) return res.status(404).json({ error: "No users found." });
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: "Error fetching users", details: error.message });
    }
};

// פונקציה שמחזירה משתמש לפי ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: "Error fetching user", details: error.message });
    }
};

// פונקציה שמוחקת משתמש לפי ID
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ error: "User not found" });
        return res.json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Error deleting user", details: error.message });
    }
};

// פונקציה שמעדכנת משתמש לפי ID
const updateUser = async (req, res) => {
    let image;
    try {
        const { id } = req.params;
        const { firstName, lastName, birthDate, email, password } = req.body;
        if(req.filename){
            image = req.filename;
        }
        const updatedUser = await User.findByIdAndUpdate(
            { _id: id },
            { firstName, lastName, birthDate, email, password, image },
            { new: true }
        );
        if (!updatedUser) return res.status(404).json({ error: "User not found" });
        return res.json(updatedUser);
    } catch (error) {
        return res.status(500).json({ error: "Error updating user", details: error.message });
    }
};

// פונקציה שמוסיפה משתמש חדש
const addUser = async (req, res) => {
    try {
        const { firstName, lastName, birthDate, email, password } = req.body;
        const user = new User({ firstName, lastName, birthDate, email, password });
        await user.save();
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: "Error adding user", details: error.message });
    }
};

// פונקציה שמבצעת התחברות לפי אימייל וסיסמה
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        else{
            const token = jsonwebtoken.sign({ email:user.email, id:user._id},process.env.JWT_SECRET , {expiresIn: "3h"});
            const refreshToken = jsonwebtoken.sign({ email:user.email, id:user._id},process.env.REFRESH_TOKEN , {expiresIn: "3d"});
            const {password, ...userToReact} = user.toObject();
            
            return res.json({user: userToReact, token, refreshToken});
        }
       
    } catch (error) {
        return res.status(500).json({ error: "Error during login", details: error.message });
    }
};

const refreshToken = (req, res) => {
    const {refreshToken} = req.body;

    if(!refreshToken){
        return res.status(401)
    }
    try{

        jsonwebtoken.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
            if(err){
                return res.status(401);
            }
            const token = jsonwebtoken.sign({ email:decoded.email, id:decoded._id},process.env.JWT_SECRET , {expiresIn: "3h"});
            return res.json({token: token});
        });
    }catch(err){
        return res.status(401);
    }

}

export default { getUsers, getUserById, deleteUser, updateUser, addUser, login, refreshToken };
