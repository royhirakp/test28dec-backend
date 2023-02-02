const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

 const TodoSchma = new Schema({
    Acivity : String,
    Status: String,
    TimeTaken: String,
    Action: String,
    user: {type: ObjectId, ref: "User"}
 })
const ToDoModel = mongoose.model('Todos',TodoSchma)
module.exports = ToDoModel;

