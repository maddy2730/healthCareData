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

mongoose.connect('mongodb://localhost:27017/college', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(5000, () => {
            console.log('Server is running on port 5000');
        });
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

