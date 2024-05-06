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



const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const Product = require('./Product')
const Subcategory = require('./Subcategory');
const Category = require('./Category');
const AddProduct = require('./AddProduct');

require('./Config');

const app = express();
app.use(express.json());

app.use(cors());

const secretKey = 'yourSecretKey'; 
const saltRounds = 10;

app.post('/main', async (req, resp) => {
    try {
        const { username, email, password } = req.body;
        console.log('Received user data:', { username, email });
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new Product({ username, email, password: hashedPassword });
        await newUser.save();

        console.log('User saved successfully:', newUser);
        const token = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn: '300s' });

        resp.status(200).send({ token });
    } catch (error) {
        console.error('Error signing up:', error);
        resp.status(500).send({ error: 'Error signing up' });
    }
});

mongoose.connect(process.env.MONGOOB_CONNECT_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
    
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

    app.post('/login', async (req, res) => {
        try {
          const { email, password } = req.body;
      
          // Query the user from the database based on email
          const user = await Product.findOne({ email });
      
          if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
          }
      
          // Check if the provided password matches the hashed password in the database
          const isPasswordValid = await bcrypt.compare(password, user.password);
      
          if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
          }
      
          // Generate JWT token for the authenticated user
          const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '300s' });
      
          // Send the token back to the client add a new line
          res.status(200).json({ token });
        } catch (error) {
          console.error('Error logging in:', error);
          res.status(500).json({ error: 'Error logging in' });
        }
      });
      app.post('/category', async (req, resp) => {
        try {
            const data = new Category(req.body);
            const newdata = await data.save();
            resp.send(newdata);
        } catch (error) {
            console.error('Error saving category:', error);
            resp.status(500).send({ error: 'Error saving category' });
        }
    });
    app.post('/categories/:categoryId/subcategories', async (req, res) => {
      try {
          const { name } = req.body;
          const categoryId = req.params.categoryId;
          const newSubcategory = new Subcategory({ name, categoryId });
          const savedSubcategory = await newSubcategory.save();
          res.status(201).json(savedSubcategory);
      } catch (error) {
          console.error('Error adding subcategory:', error);
          res.status(500).json({ error: 'Error adding subcategory' });
      }
  });

  
  app.post('/subcategories/:subcategoryId/products', async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const subcategoryId = req.params.subcategoryId;
        const newProduct = new AddProduct({ name, description, price, subcategoryId });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Error adding product' });
    }
});

