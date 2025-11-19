const { ObjectId } = require('mongodb');
const database = require('../config/db');

const COLLECTION = 'tasks';

function getCollection() {
  const db = database.getDb();
  if (!db) throw new Error('Database not initialized');
  return db.collection(COLLECTION);
}

module.exports = {
  getAllTasks: async () => {
    const col = getCollection();
    return await col.find({}).toArray();
  },

  getTaskById: async (id) => {
    const col = getCollection();
    return await col.findOne({ _id: new ObjectId(id) });
  },

  createTask: async (task) => {
    const col = getCollection();
    return await col.insertOne(task);
  },

  updateTask: async (id, update) => {
    const col = getCollection();
    return await col.updateOne({ _id: new ObjectId(id) }, update);
  },

  deleteTask: async (id) => {
    const col = getCollection();
    return await col.deleteOne({ _id: new ObjectId(id) });
  }
};