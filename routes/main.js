const register =  require("./register_route")
const index = require("./index")
const activation = require("./activation_route")
const login = require("./login_routes")
const reset = require("./reset_password")
const role  = require("./role_routes")
const user  = require("./user_routes")
const verifyjwt = require("../middleware/verify_middleware")

const route = app => {

    app.use("/",index)
    app.use("/register",register)
    app.use("/activation",activation)
    app.use("/login",login)
    app.use("/reset",reset)
    app.use("/role",verifyjwt(),role)
    app.use("/user",verifyjwt(),user)
    
}

module.exports = route