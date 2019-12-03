const User = require("../models/Users_model")
const bcrypt = require("bcryptjs")
const Role = require("../models/role_models")
const jwt   = require("jsonwebtoken")

class Login {
    constructor(req) {
        
            (this.email = req.body.email),
            (this.password = req.body.password)
            
           
            
    }

    async exec() {
        try {
            let data = await User.find({
                email: this.email
            }).populate({
                path: 'Role_id',
                model: Role
        }).exec()
           

            if (data.length == 0) {
                throw Error("User not found")
            }
            if (data[0].activated_at == null) {
                throw Error("Account has not activated")
            }
            if (data[0].deleted_at != null) {
                throw Error("This account not found")
            }

            let password = await bcrypt.compare(
                this.password,
                data[0].password
            )

            let payload = {

                user_id: data[0]._id,
                user_name: data[0].name,
                user_email: data[0].email,
                user_gender: data[0].gender,
                user_phone: data[0].phone,
                user_role_id: data[0].role_id,
                user_permissio: data[0].role_id.name
              
            }

            let token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn: 86400
            })

           
            return {
                user: payload,
                token,
                expire_in: "24 hours"
            }

        } catch (err) {
            throw err
        }
    }
}

module.exports = Login