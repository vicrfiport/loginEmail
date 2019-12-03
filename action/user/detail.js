const Role = require("../../models/role_models")
const User = require("../../models/Users_model")

class Detail {
    constructor(req) {
        this.query = req.query
    }

    async exec() {
        try {
            let { name, permission } = this.query
            let params = {
                deleted_at: null
            }

            if (name) {
                params.name = { $regex: name, $options: "$i" }
            }
            if (permission) {
                params.permission = permission
            }

            let query = await User.find(params).populate([
                {
                    path: 'role_id',
                    model: Role
                }
            ])
            return query
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}

module.exports = Detail