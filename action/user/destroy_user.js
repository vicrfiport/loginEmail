
const User = require("../../models/Users_model")

class Delete {
    constructor(id) {
        (this.id = id)
    }

    async exec() {
        try {
            let data = await User.findOneAndDelete({
                _id: this.id
            }).exec()

            if (data === null) {
                throw new Error("Data not found")
            }

            return {
                data
            }
        } catch (err) {
            throw err
        }
    }
}

module.exports = Delete

