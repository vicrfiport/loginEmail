const User = require("../models/Users_model")
const bcrypt = require("bcryptjs")

class Login {
    constructor(req) {
        
            (this.email = req.body.email),
            (this.password = req.body.password)
    }

    async exec() {
        try {
            let data = await User.find({
                email: this.email
            }).exec()
           console.log(data)

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

           
            return {
                data,
                expire_in: "24 hours"
            }

        } catch (err) {
            throw err
        }
    }
}

module.exports = Login