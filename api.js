// const express = require('express');
// const dbConnection = require('./Views/Mongodb');
// const mongodb = require('mongodb')
// const app = express();

// app.get('/', async (req, resp) => {
//     let data = await dbConnection();
//     let documents = await data.find().toArray();
//     console.log(documents);
//     resp.send(documents);
// });
// app.post('/' , async (req,resp)=>{
//     let data = await dbConnection();
//     let newdata = await data.insertOne(req.body);
//     resp.send(newdata)
// })
// app.put('/:name', async (req,resp)=>{
//     let db = await dbConnection();
//     let newdb = db.updateOne(
//         {name: req.params.name},
//         {$set: req.body});
//     resp.send({newdb :"update"})
// })
// app.delete('/:id', async (req,resp)=>{
//     let datas =await dbConnection();
//     let newdatas = await datas.deleteOne({id:new mongodb.ObjectId(req.params.id)});
//     resp.send(newdatas)
// }) 

// app.listen(4000); 
