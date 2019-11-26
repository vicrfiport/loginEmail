const express = require("express")
const router = express.Router()

const Activation = require("../action/activation_action")

router.get("/:token", async (req,res) => {

    try {
        let data = await new Activation(req.params.token).exec()

        return res.send({

            code: 200,
            status: "success",
            message: "Activation is done",
            data: data
        }

        )
        
    } catch (err) {
        return res.send({

            code:400,
            status: "eror activition fail",
            message: err.message
        })
    }
}
)

module.exports = router