const connect = require ('./connect') //runs the whole file
const express = require('express')
const cors = require('cors')
const taskRoutes = require ('./tasksRoutes')

const app = express() //creates app
const PORT = 3000

// middleware
app.use(cors())
app.use(express.json())
app.use(taskRoutes)

app.listen(PORT, ()=> {
    connect.connectToServer()  //defined database
    console.log(`Server is running on port ${PORT}`)
})   //creates server