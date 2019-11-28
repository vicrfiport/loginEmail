const register =  require("./register_route")
const index = require("./index")
const activation = require("./activation_route")
const login = require("./login_routes")
const reset = require("./reset_password")

const route = app => {

    app.use("/",index)
    app.use("/register",register)
    app.use("/activation",activation)
    app.use("/login",login)
    app.use("/reset",reset)
}

module.exports = route