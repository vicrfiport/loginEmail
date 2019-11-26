const register =  require("./register_route")
const index = require("./index")
const activation = require("./activation_route")
const login = require("./login_routes")

const route = app => {

    app.use("/",index)
    app.use("/register",register)
    app.use("/activation",activation)
    app.use("/login",login)
}

module.exports = route