
  
const express = require("express")
const router = express.Router()
const Create = require("../action/user/create_user")
const Detail = require("../action/user/detail")
const Update = require("../action/user/update")
const Delete = require("../action/user/destroy_user")
const { check, validationResult, body } = require("express-validator")

router.post(
    "/create",
    [
        check("name")
            .not()
            .isEmpty(),
        check("email")
            .not()
            .isEmpty()
            .isEmail()
            .normalizeEmail(),
        check("phone")
            .not()
            .isEmpty(),
        check("username")
            .not()
            .isEmpty(),
        check("gender")
            .not()
            .isEmpty(),
        check("password")
            .not()
            .isEmpty()
            .isLength({ min: 8 }),
        check("password_confirm")
            .not()
            .isEmpty(),
        body("password_confirm").custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error("Password confirmation does not match")
            } else {
                return value
            }
        })
    ],

    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.send({
                code: 400,
                status: "error",
                message: errors.array()
            })
        }

        try {
            let data = await new Create(req).exec()
            return res.send({
                code: 201,
                status: "success",
                message: "Register successfully",
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

router.get("/", async (req, res) => {
    try {
        let data = await new Detail(req).exec()

        return res.send({
            code: 200,
            status: "success",
            message: "Detail data!",
            data
        })
    } catch (err) {
        return res.send({
            code: 400,
            status: "error coy",
            message: err.message
        })
    }
})

router.put("/:id", async (req, res) => {
    try {
        let { id } = req.params
        let updated = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender
        }
        let data = await new Update(id, updated).exec()

        return res.send({
            code: 200,
            status: "success",
            message: "Data updated!",
            data
        })
    } catch (err) {
        return res.send({
            code: 400,
            status: "error coy",
            message: err.message
        })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        let data = await new Delete(req.params.id).exec()

        return res.send({
            code: 200,
            status: "success",
            message: "Data deleted!",
            data
        })
    } catch (err) {
        return res.send({
            code: 400,
            status: "error coy",
            message: err.message
        })
    }
})

module.exports = router

