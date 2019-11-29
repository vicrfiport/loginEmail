const express = require("express")
const router  = express.Router()
const createRole = require("../role/create_role")

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

module.exports = router