import Customer from '../models/customer.model'
// const { Op } = require("sequelize");
import { Op } from "sequelize";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const handlebars = require("handlebars");
const transporter = require('../middleware/transporter');
import path from 'path';
import CustomerVoucher from '../models/customervoucher.model';
import Voucher from '../models/voucher.model';
require("dotenv").config()

export const userRegister = async (req, res) => {
    try {
        const { firstname, lastname, email, referral_code } = req.body

        const findUser = await Customer.findOne({
            where: {
                email
            }
        });

        if (findUser != null) {
            return res.status(400).send({ message: "Email is already registered" })
        }

        let referral = null

        if (referral_code) {
            const findReferralCode = await Customer.findOne({
                where: {
                    referral_code: referral_code.toUpperCase()
                }
            });

            if (!findReferralCode) {
                return res.status(400).send({ message: "Referral code doesn't match" });
            }

            const isReferralCodeExist = await Voucher.findOne({
                where: {
                    type: "referral_code"
                }
            });

            await CustomerVoucher.create({
                CustomerId: findReferralCode.id,
                VoucherId: isReferralCodeExist.id,
                quantity: 1,
            });

            referral = referral_code;
        }

        if (findUser == null) {
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
            const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: `12h` })

            const filePath = path.join(__dirname, '../../src/templates/template_verify.html');
            const data = fs.readFileSync(filePath, 'utf-8');
            const tempCompile = await handlebars.compile(data)
            const tempResult = tempCompile({ firstname: firstname, link: `http://localhost:5173/verify/${token}` })

            await transporter.sendMail({
                from: 'thoby.athayaa@gmail.com',
                to: email,
                subject: 'Fresh Finds - Email Verification',
                html: tempResult
            })

            await Customer.update({
                verificationSentAt: new Date()
            }, {
                where: {
                    id: result.id
                }
            })

        }
        return res.status(200).send({ message: "Successfully register new User, please check your email for verification" })

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

        console.log(findUser);

        if (findUser == null) {
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

            return res.status(200).send({ message: "Google Account registration success", result: result, token })

        } else if (findUser) {
            // jwt
            return res.status(400).send({ message: "Your account is already registered" })
        }

    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: error.message })
    }
}

export const userLoginWithGoogle = async (req, res) => {
    try {
        const { googleUserData } = req.body
        console.log(googleUserData);

        const findUser = await Customer.findOne({
            where: {
                firebaseUID: googleUserData?.uid
            }
        });

        if (findUser) {
            // jwt
            let payload = { id: findUser.id }
            const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: `12h` })

            console.log("Google account is already registered");
            return res.status(200).send({ message: "Google Account Sign In success", result: findUser, token })
        } else {
            return res.status(400).send({ message: "Account not found" })
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const userVerification = async (req, res) => {
    try {
        const { password } = req.body

        const user = await Customer.findOne({
            where: {
                id: req.user.id
            }
        })


        const verificationSentTime = user.verificationSentAt;
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000) //1 hour ago

        if (!verificationSentTime || verificationSentTime < oneHourAgo) {
            return res.status(400).send({ message: "Verification link has expired or is invalid" });
        }

        if (user.isVerified == true) {
            return res.status(400).send({ message: "Your Account has been verified before" })
        }

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
        res.status(200).send({ message: "Account verification success!" })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const userReverification = async (req, res) => {
    try {
        const { email } = req.query

        const findUser = await Customer.findOne({
            where: {
                email,
                isVerified: false,
                socialRegister: false
            }
        })

        console.log('FindUser', findUser);

        if (!findUser) {
            return res.status(400).send({
                message: "Email not found or already verified"
            })
        }

        if (findUser.isVerified === true) {
            return res.status(400).send({
                message: "Your account is already verified, please Sign in instead"
            })
        }

        const verificationSentTime = findUser.verificationSentAt;
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

        if (!verificationSentTime || verificationSentTime < oneHourAgo) {
            // let payload = { id: findUser.id }
            const token = jwt.sign({ id: findUser.id }, process.env.KEY_JWT, { expiresIn: `1h` })

            const filePath = path.join(__dirname, '../../src/templates/template_verify.html');
            const data = fs.readFileSync(filePath, 'utf-8');
            const tempCompile = await handlebars.compile(data)
            const tempResult = tempCompile({ firstname: findUser.firstname, link: `http://localhost:5173/verify/${token}` })

            await findUser.update({ verificationSentAt: new Date() })

            await transporter.sendMail({
                from: 'thoby.athayaa@gmail.com',
                to: email,
                subject: 'Fresh Finds - Email Verification',
                html: tempResult
            })
            return res.status(200).send({ message: "Verification link has been sent to your email." })

        } else {
            return res.status(400).send({ message: "Verification email has already been sent recently" })
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.query

        const result = await Customer.findOne({
            where: {
                email,
                socialRegister: false
            }
        })

        if (!result) {
            return res.status(400).send({
                message: "User not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, result.password);
        if (!isPasswordValid) {
            return res.status(400).send({
                message: "Incorrect password"
            })
        }

        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

        if (result.lastPasswordReset > oneHourAgo) {
            return res.status(400).send({
                message: "Password reset can only be done once per request within an hour"
            })
        }

        await result.update({ lastPasswordReset: new Date() })

        let payload = { id: result.id }
        const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: `1h` })

        const filePath = path.join(__dirname, '../../src/templates/template_reset_password_user.html');
        const data = fs.readFileSync(filePath, 'utf-8');
        const tempCompile = await handlebars.compile(data)
        const tempResult = tempCompile({ email: email, link: `http://localhost:5173/user-reset-password/${token}` })

        await transporter.sendMail({
            from: 'thoby.athayaa@gmail.com',
            to: email,
            subject: 'Fresh Finds - Reset Password',
            html: tempResult
        })


        res.status(200).send({ message: "Reset password link has been sent to your email" })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const resetPasswordVerification = async (req, res) => {
    try {
        const { password } = req.body

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        await Customer.update({
            password: hashPassword
        }, {
            where: {
                id: req.user.id
            }
        })
        res.status(200).send({ message: "Reset password success" })
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
        console.log(dataLoginUser);

        dataLoginUser = await Customer.findOne({
            where: {
                email,
            }
        })

        console.log(dataLoginUser);

        if (dataLoginUser == null) {
            return res.status(401).send({
                message: "User not found"
            })
        }

        if (dataLoginUser.password == null) {
            return res.status(400).send({
                message: "Your account is not verified, Please verify "
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
            const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: '12h' });
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

export const userLogout = async (req, res) => {
    try {
        req.user = null;
        return res.status(200).send({ message: "Log out Success" })
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

        if (!customer) {
            return res.status(404).send({ message: "User not found" })
        }

        return res.status(200).send({ message: "Keep login success", result: customer })
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

export const userDataUpdate = async (req, res) => {
    try {
        const { firstname, lastname, phoneNumber, gender } = req.body

        await Customer.update(
            {
                ...req.body
            },
            {
                where: {
                    id: req.user.id
                }
            }
        )
        res.status(200).send({ message: "Success updating your personal details" })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const userImgUpdate = async (req, res) => {
    try {
        console.log(req.file);
        const result = await Customer.update(
            {
                profile_picture: `http://localhost:8000/public/${req.file?.filename}`
            },
            {
                where: {
                    id: req.user.id
                }
            }
        )
        res.status(200).send("Success updating user profile picture")

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const findEmailForgotPassword = async (req, res) => {
    try {
        const { email } = req.query

        const findUser = await Customer.findOne({
            where: {
                email,
                isVerified: true,
                socialRegister: false
            }
        })

        if (findUser == null) {
            return res.status(400).send({
                message: "Email not found"
            })
        }

        let payload = { id: findUser.id }
        const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: `1h` })

        const filePath = path.join(__dirname, '../../src/templates/template_reset_password_user.html');
        const data = fs.readFileSync(filePath, 'utf-8');
        const tempCompile = await handlebars.compile(data)
        const tempResult = tempCompile({ email: email, link: `http://localhost:5173/user-reset-password/${token}` })

        await transporter.sendMail({
            from: 'thoby.athayaa@gmail.com',
            to: email,
            subject: 'Fresh Finds - Forgot Password',
            html: tempResult
        })

        res.status(200).send({ message: "Forgot password verification has been sent" })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const userEmailUpdate = async (req, res) => {
    try {
        const { email } = req.query

        const findUser = await Customer.findOne({
            where: {
                email,
                socialRegister: false,
                isVerified: true
            }
        });

        if (findUser == null) {
            const result = await Customer.update({
                email: email,
                isVerified: false,
            }, {
                where: {
                    id: req.user.id
                }
            })

            let payload = { id: req.user.id }
            const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: `1h` })

            const filePath = path.join(__dirname, '../../src/templates/template_update_email_user.html');
            const data = fs.readFileSync(filePath, 'utf-8');
            const tempCompile = await handlebars.compile(data)
            const tempResult = tempCompile({ email: email, link: `http://localhost:5173/user-update-email/${token}` })

            await transporter.sendMail({
                from: 'thoby.athayaa@gmail.com',
                to: email,
                subject: 'Fresh Finds - Email Update',
                html: tempResult
            })
        } else {
            return res.status(400).send({ message: "This email address is already registered" })
        }

        res.status(200).send({ message: "Email update link has been sent" })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const userEmailUpdateVerification = async (req, res) => {
    try {
        console.log('User ID:', req.user.id);

        await Customer.update({
            isVerified: true
        }, {
            where: {
                id: req.user.id
            }
        })
        res.status(200).send({ message: "Email verification success" })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const getTotalCustomer = async (req, res) => {
    try {
        const totalCustomer = await Customer.count()
        res.status(200).send({ totalCustomer })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: error.message })
    }
}

export const getAllCustomer = async (req, res) => {
    try {
        const { page, sortBy, sortOrder = 'asc', search = '' } = req.query;
        const limit = 5;
        const offset = (page - 1) * limit;

        const dataCustomer = await Customer.findAndCountAll({
            where: {
                firstname: { 
                    [Op.like]: `%${search}%` 
                }
            },
            attributes: {
                exclude: ['password'],
            },
            order: [[sortBy, sortOrder.toUpperCase()]],
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        const totalPages = Math.ceil(dataCustomer.count / limit);
        return res.status(200).send({ result: dataCustomer, page, totalPages })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: error.message })
    }
}
