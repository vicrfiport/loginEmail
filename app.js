const express = require('express')
const app     = express()

require("./db")



app.use(express.urlencoded({extended : true}))
app.use(express.json())

require('./routes/main')(app)


app.listen(3300, () => {
    console.log("exqample")
})

module.exports = app