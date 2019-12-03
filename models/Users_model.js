const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({

    name: {
        type: String,
        default: null

    }, 
    email: { 
         
        type: String,
        default: null,
        unique: true
},
    phone: {
        type: String,
        default: null
    },
    username: {
        type: String,
        default: null,
        unique: true
    },
    gender: String,
    password: {

        type: String,
        default: null
    },
    created_at:{

        type: Date,
        default: Date.now()
    },
    activated_at: {
        type: Date,
        default: null
    },
    activation_token: {
        type: String,
        default: null
    },
    updated_at: {
        type: Date,
        default: Date.now()

    },
    deleted_at: {
        type: Date,
        default: null
    },
    role_id: {
            type: String,
            default: null
            
        }
    
})

let User = mongoose.model("User", userSchema)

module.exports = User


    

    

