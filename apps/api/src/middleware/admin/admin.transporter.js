import nodemailer from 'nodemailer'
require('dotenv').config()

export const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    },
    tls:{
        rejectUnauthorized: false
    }
})
