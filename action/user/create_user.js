const User = require("../../models/Users_model")
const bcrypt = require("bcryptjs")

class Create {
    constructor(req) {
        (this.name = req.body.name),
            (this.email = req.body.email),
            (this.phone = req.body.phone),
            (this.username = req.body.username),
            (this.password = req.body.password),
            (this.password_confirmation = req.body.password_confirmation),
            (this.gender = req.body.gender),
            (this.role_id = req.body.role_id)
    }

    async exec() {
        try {
            let password = bcrypt.hashSync(this.password, 8)
            // console.log(`Hashing password ${password}`)

            let insert_data = {
                name: this.name,
                username: this.username,
                email: this.email,
                phone: this.phone,
                gender: this.gender,
                activated_at: Date.now(),
                password,
                role_id: this.role_id
            }

            let query = new User(insert_data)
            await query.save()

            return {
                insert_data
            }
        } catch (err) {
            throw err
        }
    }
}

module.exports = Create

