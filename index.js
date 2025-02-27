const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Controllers
const userController = require('./controllers/userController');
const itemController = require('./controllers/itemController');
const cartController = require('./controllers/cartController');
const orderController = require('./controllers/orderController');
const checkoutController=require('./controllers/checkoutController')

// Initialize the app
const app = express();
const PORT = 5500;

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000', // Or whichever origins you want to allow
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));
app.options('*', cors()); // Enable pre-flight for all routes, if not already implicitly handled




// Middleware for parsing JSON bodies
app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/eatathome', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB...');
}).catch(err => {
  console.error('Could not connect to MongoDB...', err);
});

// Routes
app.post('/signup', userController.signup);
app.post('/login', userController.login);
app.get('/items', itemController.showItems);
app.get('/item/:id', itemController.showItem);
app.get('/items/:category', itemController.getItemsByCategory);
app.post('/cart', cartController.addToCart);
app.delete('/cart/:userId/:itemId', cartController.removeItemFromCart);
app.get('/cart/:userId', cartController.showCart);
app.post('/order', orderController.addOrder);
app.post('/checkout',checkoutController.processCheckout);




// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
