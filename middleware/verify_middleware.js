const jwt = require("jsonwebtoken")
const Role = require("../models/role_models")

module.exports = ()=>{

    return async (req,res,next) => {
        let token = req.header("Authorization")
        let unauthenticated = {
            status: "unauthenticated",
            message: "invalid Reader Token"

        }

        if (token){
             jwt.verify(token, process.env.JWT_SECRET, async (err,data) => {
                
                if (data.user_permission !== 'User') return res.status(401).json(unauthenticated)
                //  if (err) return res.status(401).json(unauthenticated)
                 console.log(data)

                 return next()
                
                })
                 

        } else {
            return res.status(401).json(unauthenticated)
        }
    

        }

}