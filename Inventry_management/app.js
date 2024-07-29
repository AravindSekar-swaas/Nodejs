const express = require('express')
const app=express()
app.use(express.json())
const user = require("./Routes/User")
const verify=require("./Routes/JWT")
const category=require("./Routes/Categories")

app.get("/", (req, res) => {
    res.send("hii")
})
// app.use("/user/register", user)
app.use("/api/v1/user", user)
app.use("/api/v1/user/category",verify,category)




app.listen(8080, (err) => {
    if (err) {
    console.log("Error",err)
    }
    console.log(`Server is running on Port 8080`)
})