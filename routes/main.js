const register =  require("./register_route")
const index = require("./index")

const route = app => {

    app.use("/",index)
    app.use("/register",register)
}

module.exports = route