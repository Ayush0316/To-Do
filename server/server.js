const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = require("./app")

dotenv.config({path:"./config.env"})

const db = process.env.DATABASE

mongoose.connect(db).then(()=>{
    console.log("Connect to database successfully.")
    const port = process.env.PORT || 3000
    app.listen(port,()=>{
        console.log(`Server running on port ${port}...`)
    })
})