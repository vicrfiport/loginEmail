const mongoose = require("mongoose")
const Schema = mongoose.Schema

let roleSchema = new Schema ({

    name:{
            type: String, 
            unique: true,
            require: true
    },
    menu: {type: String},
    permission:{
        type: String,
        default: null
    },
    created_at:{
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()

    },
    deleted_at:{
        type: Date,
        default: null
    }
  
        
    
    
    
})

let Role = mongoose.model("Role",roleSchema)

module.exports = Role
