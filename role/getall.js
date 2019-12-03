const Role = require("../models/role_models")

class RoleList {
    constructor(req){
        this.query = req.query


    }
async exec(){

    try {
        let {name, permission} = this.query
        let params = {
            deleted_at:null
        }
        if (name){
            params.name = {$regex:name, $options:"$i"}
        }
        if (permission){
            params.permission = permission
        }

        let query1 = await Role.find(params)
          
        
        return query1
        
    } catch (err) {
        throw err
        
    }
    }
}

module.exports = RoleList