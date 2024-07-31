import mongoose from "mongoose";
import UserModel from "../model/userModel.js"
import { validateUser } from "../validations/userValidation.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';


export const registerUserCtrl = async (req, res) => {
    try {
        const { name, password, passwordVerify, group } = req.body

        console.log(req.body)

        const { error, value } = validateUser(req.body)
        console.log(error)
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

        // // log the user in
        // const token = jwt.sign({
        //     user: savedUser._id
        // }, process.env.JWT_PRIVATE_KEY)
        // console.log("Passsssss", newUser)
        // // send the token in HTTP-only cookie
        // res.cookie("token", token, {
        //     httpOnly: true,
        // }).send()
        return res.status(200).json({
            success: true,
            message: 'User Created Successfully',
            data: savedUser
        })

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

        if (!name || !password) {
            errors.push({
                label: 'name',
                message: `Please Enter Username and Pasword`
            })
        }

        //check if User already exists
        let userId = ''
        if (name && password) {
            const userExists = await UserModel.findOne({ 'name': name })
            if (!userExists) {
                errors.push({
                    label: 'userNotFound',
                    message: 'User Not Found'
                })
            } else {
                userId = userExists._id
                if (userExists.password) {
                    // check password
                    const passwordCorrect = await bcrypt.compare(password, userExists.password)
                    if (!passwordCorrect) {
                        errors.push({
                            label: 'wrongCred',
                            message: 'Wrong Credentials'
                        })
                    }
                }
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            })
        }

        // log the user in
        const token = jwt.sign({
            user: userId,
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

        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        const userId = decoded.user
        res.json({ loggedIn: true, userId })
    } catch (error) {
        res.json({ loggedIn: false })
    }
}

export const userListCtrl = async (req, res) => {
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


export const getUserProfileCtrl = async (req, res) => {
    try {
        const { id } = req.params
        const userInfo = await UserModel.findById(id)
            .populate({
                path: 'group',
                model: 'Group',
                populate: {
                    path: 'permissions',
                    model: 'Permission'
                }
            });


        // Check if userInfo exists and has groups
        if (userInfo && userInfo.group) {
            // Format the data to include permission details
            const formattedUserInfo = {
                _id: userInfo._id,
                name: userInfo.name,
                group: userInfo.group.map(group => ({
                    _id: group._id,
                    name: group.name,
                    code: group.code,
                    permissions: group.permissions.map(permission => ({
                        resource: permission.resource,
                        action: permission.action
                    })),
                })),
                createdAt: userInfo.createdAt,
                updatedAt: userInfo.updatedAt,
                __v: userInfo.__v
            };

            return res.status(200).json({
                success: true,
                data: formattedUserInfo
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found or user has no groups"
            });
        }

    } catch (error) {
        console.error("Error User Profile", error);
        return res.status(500).json({
            success: false,
            message: "Error in User Profile",
            error: error.message
        });
    }
}


