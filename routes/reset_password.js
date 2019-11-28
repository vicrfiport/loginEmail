const express = require("express")
const router = express.Router()
const Reset   = require("../action/reset_password")
const ShowPassword = require("../action/showPassword")
const ForgotPassword = require("../action/forgetPassword")

router.post("/", async (req, res) => {
    try {
        await new ForgotPassword(req.body.email).exec()

        return res.send({
            status: 'success',
            message: 'Reset password successfully'
        })
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

router.post("/:token", async(req, res) => {
    try {
        let data = await new Reset(req.body.password, req.params.token).exec()

        return res.send({
            status: 'success',
            data
        })
    } catch(err) {
        return res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
})

router.get("/:token", async (req, res) => {
    try {
        let data = await new ShowPassword({
            token: req.params.token
        }).exec()

        return res.send({
            status: 'success',
            data
        })
    } catch(err) {
        return res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
})

module.exports = router