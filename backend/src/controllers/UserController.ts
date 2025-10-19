import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repository/userRepository";

const JWT_SECRET = process.env.JWT_SECRET || "SESSION_SECRET";

export const signup = async (req: Request, res: Response) =>{
    try{
        const {first_name, last_name,email,password} = req.body;

        if (!first_name || !last_name || !email || !password){
            return res.status(400).json({message: "All fields are required."});
        }

        if(password.length <4 ){
            return res.status(400).json({message: "Password should me more than 4 characters!"})
        }

        const userRepos = new userRepository();

        const existingUser = await userRepos.findUserByEmail(email);
        if (existingUser){
            return res.status(400).json({message: "Hey! This email already exists!"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userRepos.createUser ({first_name, last_name, email, password: hashedPassword});

        return res.status(201).json({
            message: "User registered successfully!",
            user: {
                id: newUser.id, 
                email: newUser.email, 
                first_name, 
                last_name},
        });
    } catch (error){
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
};

export const signin = async (req:Request, res: Response)=>{
    try{
        const {email,password} = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "Email and password are mandatory!"});

        const userRepo = new userRepository();

        const user = await userRepo.findUserByEmail(email);
        if (!user || !user.password) return res.status(401).json({ message:"Invalid credentials"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({message: "Invalid credentials"})

        const token = jwt.sign({ userId: user.id}, JWT_SECRET, {expiresIn:"1h"});
        
        return res.status(200).json({
            message:"Login Successful",
            token,
            user: {id: user.id, email: user.email, first_name: user.first_name}
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
};