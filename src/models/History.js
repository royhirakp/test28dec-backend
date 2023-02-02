
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

 const HistorySchma = new Schema({
    Acivity : String,
    Time: String,
    user: {type: ObjectId, ref: "User"}
 })
const HistoryModel = mongoose.model('History',HistorySchma)
module.exports = HistoryModel;
// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

//  const HistorySchma1 = new Schema({
//     Acivity : String,
//     TimeTaken: String,
//     user: {type: ObjectId, ref: "User"}
//  })
// const HistoryModel1 = mongoose.model('Todos',HistorySchma1)
// module.exports = HistoryModel1;
