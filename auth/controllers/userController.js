import mongoose from "mongoose";
import UserModel from "../model/userModel.js"
import { validateUser } from "../validations/userValidation.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

export const registerUserCtrl = async (req, res) => {
    try {
        const { name, password, passwordVerify, group } = req.body

        const { error, value } = validateUser(req.body)

        if (error) {
            const formattedErrors = error.details.map(detail => {
                return {
                    lable: detail.context.label,
                    message: detail.message.replace(/"/g, '')
                }
            })
            return res.status(400).json({
                success: false,
                error: formattedErrors
            })
        }

        //Collect errors
        const errors = []

        //check if User already exists
        const userExists = await UserModel.findOne({ 'name': name })
        if (userExists) {
            errors.push({
                label: 'name',
                message: 'User Already exists'
            })
        }

        if (password != passwordVerify) {
            errors.push({
                lable: 'passwordVerify',
                message: `Password doesn't Match`
            })
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            })
        }

        // Hash Password
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new UserModel({
            name,
            password: passwordHash,
            group: group
        })

        const savedUser = await newUser.save()

        // log the user in
        const token = jwt.sign({
            user: savedUser._id
        }, process.env.JWT_PRIVATE_KEY)

        // send the token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
        }).send()

    } catch (error) {
        console.error("Error Creating User", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating User",
            error: error.message
        });
    }
}

export const loginUserCtrl = async (req, res) => {
    try {
        const { name, password } = req.body

        //Collect errors
        const errors = []

        if (!name) {
            errors.push({
                label: 'name',
                message: `Please Enter Name`
            })
        }
        if (!password) {
            errors.push({
                label: 'password',
                message: `Please Enter Password`
            })
        }
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            })
        }

        //check if User already exists
        const userExists = await UserModel.findOne({ 'name': name })
        if (!userExists) {
            return res.status(401).json({
                success: false,
                error: 'User Not Found'
            })
        }

        // check password
        const passwordCorrect = await bcrypt.compare(password, userExists.password)
        if (!passwordCorrect) {
            return res.status(401).json({
                success: false,
                error: 'Wrong Credentials'
            })
        }

        // log the user in
        const token = jwt.sign({
            user: userExists._id
        }, process.env.JWT_PRIVATE_KEY)

        // send the token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
        }).send()

    } catch (error) {
        console.error("Error Creating User", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating User",
            error: error.message
        });
    }
}


export const logoutCtrl = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        }).send()

    } catch (error) {
        console.error("Error logout", error);
        return res.status(500).json({
            success: false,
            message: "Error in logout",
            error: error.message
        });
    }
}

export const loggedInCtrl = async (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) return res.json(false)

        jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        res.send(true)
    } catch (error) {
        res.json(false)
    }
}

export const userListCtrl = async(req,res)=>{
    try {

        const list = await UserModel.find()

        return res.status(200).json({
            success: true,
            list,
            message: 'User List ',
        });
        
    } catch (error) {
        console.error("Error User List", error);
        return res.status(500).json({
            success: false,
            message: "Error in User List",
            error: error.message
        });
    }

}