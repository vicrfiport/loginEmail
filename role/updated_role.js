const Role = require("../models/role_models")

class updatedRole{

constructor(id,req) {
    (this.name = req.body.name),
    (this.permission = req.body.permission),
    (this.id = id)

        }

    async update(){

        try{
        let data = {

            name: this.name,
            permission: this.permission,
            updated_at: Date.now()

            
        }

    let query = await Role.findByIdAndUpdate({

        _id: this.id
            },
        data,
        {
        new : true
        }
        ).exec()
    
        return query
        } catch (err){
        throw err
            }

    }
}

module.exports = updatedRole
