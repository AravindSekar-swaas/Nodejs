const express = require('express')
const app=express()
app.use(express.json())
const user = require("./Controller/User")
const verify=require("./JWT_AUTH/JWT")
const category=require("./Controller/Categories")
const inventory=require("./Controller/Inventory")



app.use("/api/v1/user", user)
app.use("/api/v1/user/category",verify,category)
app.use("/api/v1/user/inventory",verify,inventory)





app.listen(process.env.PORT , (err) => {
    if (err) {
    console.log("Error",err)
    }
    console.log(`Server is running on Port ${process.env.PORT}`)
})