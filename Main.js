
// app.get('/finding', async (req, resp)=>{
//     const db = await product.find()
//     console.log(db);
//     resp.send(db);

// })
// app.delete('/delete/:_id', async (req, resp)=>{
//     const db = await product.deleteOne(req.params)
//     console.log(db);
//     resp.send(db);
// })
// app.put('/update/:_id', async (req, resp)=>{
//     let updates = await product.updateOne(
//         req.params,
//         {
//             $set: req.body
//         }
//     )
//     console.log(updates);
//     resp.send(updates);
// })

// app.get('/search/:key', async (req, resp) => {
//     const data = await product.find(
//         {
//             "$or": [
//                 { "name": { $regex: req.params.key } },
//                 { "class": { $regex: req.params.key } },
//                 { "section": { $regex: req.params.key } },
//                 { "fathername": { $regex: req.params.key}},
//                 { "rollnumber": { "$eq": parseInt(req.params.key) } },
//             ]
//         }
//     );

//     resp.send(data)
// })
// app.listen(3000);

