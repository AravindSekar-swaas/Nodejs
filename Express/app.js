const express=require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("Aravind")
})
app.get('/about',(req, res)=> {
    res.send("About Aravind")
})
app.listen(3000 ,(err)=> {
    if (err) {
    
        console.log(err);
    }
   console.log("Port is started...")
})