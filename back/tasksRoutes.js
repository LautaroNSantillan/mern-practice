const express = require('express')
const database = require ("./connect")
const { ObjectId } = require('mongodb')

let taskRoutes = express.Router()

taskRoutes.route("/tasks").get(async (req, res)=>{
    let db = database.getDb()

    let data = await db.collection("tasks").find({}).toArray()
    if (data.length>0){
        res.json(data)
    }else{
        throw new Error("No data found")
    }
})

taskRoutes.route("/tasks/:id").get(async (req, res)=>{
    let db = database.getDb()

    let data = await db.collection("tasks").findOne({_id: new ObjectId(req.params.id)})
    if (Object.keys(data).length>0){
        res.json({ message: "Task found!", data: data })
    }else{
        throw new Error("No data found")
    }
})

taskRoutes.route("/tasks").post(async (req, res)=>{
    let db = database.getDb()

    let newTask = {
        title: req.body.title,
        description: req.body.description,
        completed: false,
    }

    if (!req.body.title || !req.body.description){
        return res.status(400).json({ error: "Task info is required" });
    }

    let data = await db.collection("tasks").insertOne(newTask)
    res.json({ message: "New task created!", data: data })
})

taskRoutes.route("/tasks/:id").put(async (req, res)=>{
    let db = database.getDb()

    let taskToUpdate = {
        $set:{
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
        }     
    }

    if (!req.body.title || !req.body.description){
        return res.status(400).json({ error: "Task info is required" });
    }

    let data = await db.collection("tasks").updateOne({_id: new ObjectId(req.params.id)}, taskToUpdate)
    res.json({ message: "Task updated!", data: data })
})

taskRoutes.route("/tasks/:id").delete(async (req, res)=>{
    let db = database.getDb()

    let data = await db.collection("tasks").deleteOne({_id: new ObjectId(req.params.id)})
    if (Object.keys(data).length>0){
        res.json({ message: "Task deleted!", data: data })
    }else{
        throw new Error("No data found")
    }
})

module.exports = taskRoutes;