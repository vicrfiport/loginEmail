const user = require("../models/Users_model")
const bcrypt = require("bcryptjs")
const nodemailer = require ("nodemailer")
const {randomKey} = require("../lib/genaratorkey")
const token  = randomKey(54, "aA#")

class Register {
    constructor(req) {

        (
            this.nama = req.body.nama
        ),
        (
            this.phone = req.body.phone
        ),
        (
            this.email = req.body.email

        ),
    
        (
            this.username = req.body.username
        ),
        (
            this.password = req.body.password
        ),
        (
            this.password_confirm = req.body.password_confirm
        ),
        (
            this.gender = req.body.gender
        ),
        (
            this.activation_token = req.body.activation_token
        )

    }

    async exec() {

        try {
            const options = {
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
            }
        

        let password = bcrypt.hashSync(this.password, 8)
        console.log(`Hasing password ${password} `)
        
        let insert_data = {

            nama:  this.nama,
            username: this.username,
            email: this.email,
            phone: this.phone,
            gender: this.gender,
            activation_token: this.activation_token,
            password

        }

        let query = new user(insert_data)
        await query.save()

        const transporter = await nodemailer.createTransport(options)

        const data = {

            to: this.email,
            subject: "Register anf GET toke n to verify",
            text: ` your token for verify is: ${token}`
        
        }

        setTimeout(async () => {

            return await transporter.sendMail(data,(error, resp) => {

                if (error) {
                    console.log(error)
                }
                    })
                },600)
            
            return {token,
                    expires_in: "24 hours"}
            } 
             catch (err){
            throw err
        }
    }
            
    }


    module.exports = Register
