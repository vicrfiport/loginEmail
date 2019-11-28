const mongoose = require("mongoose")
const Schema   = mongoose.Schema

const resetPasswordSchema = new Schema ({

    email: String,
    token: String,
    created_at: {
        type : Date,
        default: Date.now()
    }

})

let ResetPassword = mongoose.model("ResetPassword", resetPasswordSchema)

module.exports = ResetPassword