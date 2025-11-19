/* const connect = require ('./connect') //runs the whole file
const express = require('express')
const cors = require('cors')
const taskRoutes = require ('./tasksRoutes') */

const connect = require('./config/db');
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express() //creates app
const PORT = 3000

// middleware
/* app.use(cors())
app.use(express.json())
app.use(taskRoutes)

app.listen(PORT, ()=> {
    connect.connectToServer()  //defined database
    console.log(`Server is running on port ${PORT}`)
})   //creates server */

app.use(cors());
app.use(express.json());

// routes
app.use(taskRoutes);

// connect to DB then start server
connect.connectToServer()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server due to DB connection error', err);
    process.exit(1);
  });