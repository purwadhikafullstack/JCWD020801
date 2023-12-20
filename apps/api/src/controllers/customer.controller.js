import Customer from '../models/customer.model'
// const { Op } = require("sequelize");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const handlebars = require("handlebars");
const transporter = require('../middleware/transporter');
import path from 'path';
require("dotenv").config()

export const userRegister = async (req, res) => {
    try {
        const { firstname, lastname, email } = req.body

        // check if user is already exist
        const findUser = await Customer.findOne({
            where: {
                email
            }
        });

        if (findUser == null) {

            // Generate Referral code
            const generateReferralCode = (firstname) => {
                const words = firstname.split(' ')
                const userChars = words
                    .map((word) => word.charAt(0).toUpperCase())
                    .join('');

                const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();

                const generatedCode = `${userChars}${randomChars}`;

                return generatedCode;
            }

            const referral = generateReferralCode(firstname)

            // Customer create
            const result = await Customer.create({
                ...req.body,
                referral_code: referral
            })

            // jwt
            let payload = { id: result.id }
            const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: `1h` })

            const filePath = path.join(__dirname, '../../src/template_verify.html');
            const data = fs.readFileSync(filePath, 'utf-8');
            const tempCompile = await handlebars.compile(data)
            const tempResult = tempCompile({ firstname: firstname, link: `http://localhost:5173/verify/${token}` })

            await transporter.sendMail({
                from: 'thoby.athayaa@gmail.com',
                to: email,
                subject: 'Fresh Finds - Email Verification',
                html: tempResult
            })

        } else {
            console.log("Email is already registered");
            return res.status(400).send({ message: "User is already exist" })
        }
        return res.status(200).send({ message: "Successfully register new User" })

    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: error.message })
    }
}

export const userRegisterWithGoogle = async (req, res) => {
    try {
        const { googleUserData } = req.body
        console.log(googleUserData);

        const findUser = await Customer.findOne({
            where: {
                firebaseUID: googleUserData?.uid
            }
        });

        if (findUser == null) {
            // Generate Referral code
            const generateReferralCode = (name) => {
                const words = name.split(' ')
                const userChars = words
                    .map((word) => word.charAt(0).toUpperCase())
                    .join('');

                const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();

                const generatedCode = `${userChars}${randomChars}`;

                return generatedCode;
            }

            const referral = generateReferralCode(googleUserData.displayName)

            // Customer create
            const result = await Customer.create({
                firstname: googleUserData.displayName.split(' ')[0] || '',
                lastname: googleUserData.displayName.split(' ')[1] || '',
                email: googleUserData.email,
                profile_picture: googleUserData.photoURL,
                firebaseUID: googleUserData.uid,
                referral_code: referral,
                socialRegister: true,
                isVerified: true
            })

            // jwt
            let payload = { id: result.id }
            const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: `1h` })

            // 
            const filePath = path.join(__dirname, '../../src/template_verify.html');
            const data = fs.readFileSync(filePath, 'utf-8');
            const tempCompile = await handlebars.compile(data)
            const tempResult = tempCompile({ firstname: googleUserData.displayName, link: `http://localhost:5173/verify/${token}` })

            await transporter.sendMail({
                from: 'thoby.athayaa@gmail.com',
                to: googleUserData.email,
                subject: 'Fresh Finds - Email Verification',
                html: tempResult
            })
        } else {
            console.log("Google account is already registered");
            return res.status(400).send({ message: "Google account is already registered" })
        }
        return res.status(200).send({ message: "Successfully registering new user with Google Account" })

    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: error.message })
    }
}

export const userVerification = async (req, res) => {
    try {
        const { password } = req.body

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        await Customer.update({
            isVerified: true,
            password: hashPassword
        }, {
            where: {
                id: req.user.id
            }
        });
        res.status(200).send({ message: "User verification success" })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const userLogin = async (req, res) => {
    try {
        let dataLoginUser;
        const { email, password } = req.query
        console.log(req.query);

        dataLoginUser = await Customer.findOne({
            where: {
                email,
            }
        })

        if (dataLoginUser == null) {
            return res.status(401).send({
                message: "User not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, dataLoginUser.password);
        if (!isPasswordValid) {
            return res.status(400).send({
                message: "Incorrect password"
            })
        }

        let payload = { id: dataLoginUser.id };
        if (dataLoginUser.isVerified) {
            const token = jwt.sign(payload, process.env.KEY_JWT);
            return res.status(200).send({
                message: 'Login Success!', result: dataLoginUser, token
            })
        } else {
            return res.status(400).send({
                message: "Your account is not verified."
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const keepLogin = async (req, res) => {
    try {
        const customer = await Customer.findOne({
            where: {
                id: req.user.id
            }
        })
        res.status(200).send({ message: "Keep login success", result: customer })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const getAllUser = async () => {
    try {
        const dataUser = await Customer.findAll()
        return dataUser
    } catch (error) {
        console.log(error);
        return error
    }
}