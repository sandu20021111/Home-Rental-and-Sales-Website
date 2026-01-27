import express from "express"
import cors from 'cors'
import "dotenv/config"
import connectDB from "./config/mongodb.js"


await connectDB()

const app = express()
app.use(cors())

//Route Endpoint to check API status
app.get('/', (req,res)=>{
    res.send("API sucessfully connected")
})

const port = process.env.PORT || 4000 

app.listen(port, ()=>console.log(`Server is running at http://localhost:${port}`))
