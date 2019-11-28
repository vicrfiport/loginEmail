const ResetPassword = require("../models/reset_password")
const User          = require("../models/Users_model")
const bcrypt        = require("bcryptjs")
const showPassword  = require("./showPassword")

class reset {

    constructor(password, token) {

        this.password = password
        this.token    = token 
    }

    async exec(){

        try{
            let data = await new showPassword({
                token: this.token
            }).exec()
            

            let password = bcrypt.hashSync(this.password,8)
            let user = await User.findOne({
                email: data.email
            }).exec()
        
            if(user === null){
                throw new Error("user not found"
                    )
            }

            let updatedUsher = await User.findOneAndUpdate({
                _id:user._id
            },{
                password
            }).exec()

            await ResetPassword.findOneAndDelete({
                token: this.token
            }).exec()

                return updatedUsher
        } catch(err){
            throw err
        } 
    }
 }


module.exports = reset






