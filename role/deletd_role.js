const Role = require("../models/role_models")

class deletedRole{
    constructor(id){
        this.id = id
    }

async delete(){

    try {
        let query = await Role.findByIdAndUpdate({
            _id: this.id
        },
        {
            deleted_at: Date.now()
        },
        {
            new: true
        }
        ).exec()

        return query
        
    } catch (err) {
        throw err
    }
}
}

module.exports = deletedRole
