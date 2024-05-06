// const app = require('./App')
// console.log("hello")
// console.log(app.z())

// const arr =[1,2,3,4,5,56,54,332,23,43]
// const response = arr.filter((iteam)=>{
//     return iteam < 50
// })
// console.log(response);
// const fs = require('fs');
// fs.writeFileSync('home.js', 'hello home file ');
// const http = require('http');
// const data = require('./data');
// http.createServer((req,resp)=>{
//     resp.writeHead(200,{'Content-Type': 'aplication\json'})
//     resp.write(JSON.stringify(data));
//     resp.end();
// }).listen(4000);
//  const fs = require('fs');
//  const path = require('path');
//  const dirrpath = path.join(__dirname,'files');
// for(i=0; i<5; i++){
//     fs.writeFileSync(dirrpath+`/hello${i}.txt`,"a simple txt file")
// }
// fs.readdir(dirrpath , (err , files)=>{
// files.forEach((sile)=>{
//     console.log(sile)
// })
// })
// app.get('/',(req , resp)=>{
    // resp.send(`<input type = 'text' placeholder = 'enter name ' value = ${req.query.name}  /> <button type = submit>okey</button> <a href = "/about"> back to about page  </a>`)
    // })
    // app.get('/about',(req , resp)=>{
    //     resp.send(`<a href = "/"> back to home page  </a>`)
    //     })
// const express = require('express');
// const app = express();
// const path = require('path');
// const mainPath = path.join(__dirname , 'public');
// const mainPath2 = path.join(__dirname , 'view');

// app.set('view engine', 'ejs');

// app.use(express.static(mainPath));
// app.use(express.static(mainPath2));

// app.get('', (req , resp)=>{
//     resp.sendFile(`${mainPath}/Homes.html`);
// })

// app.get('/addnew', ( _, resp)=>{
//     const user ={
//         name:"akash",
//         email:'akashshamra@gmial.com',
//         age:'12'
//     }
//    resp.render('addnew', {user})
// })
// app.get('/login', (req,resp)=>{
//    {
//         const abc = " heloo bro i am login page";
//         resp.render('login', {abc})
//     }
// });
// app.get('/navbar', (req,resp)=>{
//    {
//         const abc = " heloo bro i am login page";
//         resp.render('login', {abc})
//     }
// })

// app.get('*', (req , resp)=>{
//     resp.sendFile(`${mainPath}/NotFound.html`);
// })
// app.listen(4000);


// const express = require('express');
// const app =  express();
// const route = express.Router();
// const reqFilter = require('./Views/Middleware');

// route.use(reqFilter);

// app.get('',(req,resp)=>{
//  resp.send('hello home page')   
// });
// route.get('/about', (req,resp)=>{
//  resp.send('hello about page')   
// });
// app.use('/', route);

// app.listen(4000)


// dbConnection().then((resp)=>{
//     resp.find().toArray().then((data)=>{
//         console.log(data)
//     })
// })
// console.log(dbConnection());
// const dbConnection = require('./Views/Mongodb');
// const  main = async ()=>{
//     let data = await dbConnection();
//     data = await data.find().toArray();
//     console.log(data);
//  }
// main();
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/college');
// const main = async ()=>{
// const ProductSchema = new mongoose.Schema({
//     name:String,
//     id:Number,
//     roll:Number,
//     surname:String,
// });
// const product = mongoose.model('student',ProductSchema);
// let result = new product(
//     {
//         name:'ramm3', 
//         id:120,
//         roll:190,
//          surname:'sharma'});
// let data = await result.save();
// console.log(data)
// }
// main();