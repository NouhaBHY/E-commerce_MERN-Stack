const express = require('express'); 
const env = require('dotenv');
const app = express();        //create app
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');//routes
const adminRoutes = require('./routes/admin/auth');//routes
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
env.config(); //envirnmrnt variable === constants
//mongodb connection
//mongodb+srv://nouha:<password>@cluster0.7s184.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.7s184.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => console.log('Database connected'))
.catch(() => console.log('connection echoue !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});  
module.exports =app;