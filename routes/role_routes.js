const express = require("express")
const router  = express.Router()
const createRole = require("../role/create_role")
const updatedRole = require("../role/updated_role")
const RoleList = require("../role/getall")
const deletedRole = require("../role/deletd_role")

router.post("/", async (req,res) =>{
    try {
        let data = await new createRole(req).exec()

        return res.send({
            code: 201,
            status: "sucess",
            message: " Role created succesfuly",
            data


        })
        
    } catch (error) {
        return res.send({
            code: 400,
            status: "error",
            message: error.message

        })
    }

}
)

router.put("/:id", async (req,res) => {
        try {

            let {id} = req.params
            let data = await new updatedRole(id,req).update()

            return res.send({
                code: 201,
                status: "success",
                message: " role data updated succesfully",
                data


            })

            
        } catch (err) {
            return res.send({
                code: 400,
                status: "error",
                message: err.message


            })
            
        }
    }
)

router.get("/find", async (req,res) => {

        try {
         let data = await new RoleList(req).exec()

         return res.send({
            code: 200,
            status: "succes",
            message: " get data requested",
            data: data

         })
            
        } catch (err) {
            return res.send({
                code: 400,
                status: "error",
                message: err.message
            })
        }
}
)

router.delete("/:id", async (req,res) =>{
        try {
            let {id} = req.params
            let data = await new deletedRole(id).delete()

            return res.send({
                code: 201,
                status: "Success",
                message:"role date deleted succesfully",
                data,

            }

            )
            
        } catch (error) {
            return res.send({
            code: 400,
            status: "error",
            message: err.message


            })
            
        }

    }

)




module.exports = router