const { ObjectId } = require('mongodb');
const connect = require('../connect');

const COLLECTION = 'tasks';

function getCollection() {
  const db = connect.getDb();
  if (!db) throw new Error('Database not initialized');
  return db.collection(COLLECTION)//.find({})
}

module.exports = {
  createTask: async (task) => {
    const col = getCollection();
    return await col.insertOne(task);
  },

  getAllTasks: async () => {
    const col = getCollection();
    return await col.find({}).toArray();
  },

  getTaskById: async (id) => {
    const col = getCollection();
    return await col.findOne({ _id: new ObjectId(id) });
  },

  updateTask: async (id, update) => {
    const col = getCollection();
    return await col.updateOne({ _id: new ObjectId(id) }, { $set: update });
  },

  deleteTask: async (id) => {
    const col = getCollection();
    return await col.deleteOne({ _id: new ObjectId(id) });
  }
};
