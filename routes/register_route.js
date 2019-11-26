const express = require("express")
const router = express.Router()
const register = require("../action/register_action")
const {check, validationResult, body} = require("express-validator")

router.post("/", 
[

    check("name")
        .not()
        .isEmpty(),
    check("email")
        .not()
        .isEmpty()
        .isEmail(),
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
        .isLength({min : 8}),
    check("password_confirmation")
        .not()
        .isEmpty(),
    body("password_confirmation").custom((value,{req}) => {

        if (value != req.body.password) {
            throw new  error("password confirmation does not match")
        } else{
            return true
        }
    })
],

  async (req,res) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
          return res.send({

            code: 400,
            status: "error",
            message: errors.array()
          })
      }

      try {
          let data = await new register(req).exec()
          return res.send({
              code: 201,
              status: "succes",
              message: "register succesfully !",
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
  module.exports = router

