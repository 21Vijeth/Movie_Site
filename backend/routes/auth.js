// import express from 'express';
// import User from '../models/User.js';
// import jwt from 'jsonwebtoken';
// import { protect } from '../middleware/auth.js';


// const router = express.Router();

// //Register
// router.post('/register', async (req,res) =>{
//     const {username, email, password} = req.body;
//     try{
//         if(!username || !email || !password){
//             return res.status(400).json({message:"Please fill all the fields"})
//         }
//         const userExists = await User.findOne({email});
//         if(userExists){
//             return res.status(409).json({message:"User already exists"})
//         }
//         const user = await User.create({username,email,password});
//         const token = generateToken(user._id);
//         res.status(201).json({
//             id:user._id,
//             username:user.username,
//             email:user.email,
//             token
//         })
//     }catch(err){
//             res.status(500),json({message:"Server error"})
//     }
// })

// //Login
// router.post("/login",async (req,res)=>{
//     const {email,password} = req.body;
//     try{
//         if (!email || !password){
//             return res.status(400).json({message:"Please fill all the fields"})
//         }
//         const user = await User.findOne({email})

//         if(!user || !(await user.matchPassword(password))){
//             return res.status(401).json({message:"Invalid Credentials"})
//         }
//         const token = generateToken(user._id);
//         res.status(200).json({
//             id: user._id,
//             username: user.username,
//             email: user.email,
//             token
//         })

//     }catch(err){
//         res.status(500).json({message:"Server error"})
//     }

// })

// //Me
// router.get("/me",protect, async (req,res)=>{
//     res.status(200).json(req.user);
// });

// //Generate JWT Token
// const generateToken = (id) =>{
//     return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: "30d"})
// }

// export default router


import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { protect } from '../middleware/auth.js';

const router = express.Router();

//Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // --- THIS IS THE KEY CHANGE ---
        // Check if a user exists with EITHER the same email OR the same username.
        const userExists = await User.findOne({ $or: [{ email }, { username }] });

        if (userExists) {
            // Now we can give a specific error message.
            if (userExists.username === username) {
                return res.status(409).json({ message: "Username already exists" });
            }
            if (userExists.email === email) {
                return res.status(409).json({ message: "Email already registered" });
            }
        }

        const user = await User.create({ username, email, password });
        const token = generateToken(user._id);
        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
            token
        });
    } catch (err) {
        console.error(err); // Log the actual error for debugging
        res.status(500).json({ message: "Server error" });
    }
});

//Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        const token = generateToken(user._id);
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            token
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

//Me
router.get("/me", protect, async (req, res) => {
    res.status(200).json(req.user);
});

//Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export default router;