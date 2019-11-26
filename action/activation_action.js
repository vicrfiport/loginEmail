const user = require("../models/Users_model")

class Activation {
    constructor(token) {

        this.token = token
    }

async exec() {
try {
    let data = await user.findOne({
        activation_token: this.token
    }).exec()
    console.log(data)

    if (data === null){

        throw new Error("data not found")
    }

    let updatedUser = await user.findOneAndUpdate(
        {

        _id: data._id
    },
    {
        activated_at: Date.now(),
        activation_token: null
    }
    ).exec()

    return data._id
} catch (err) {
    throw err
    
}

}
}


module.exports = Activation