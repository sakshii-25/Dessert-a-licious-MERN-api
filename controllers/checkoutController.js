// controllers/checkoutController.js
const Checkout = require('../models/Checkout');

exports.processCheckout = async (req, res) => {
  try {
    // Extract checkout data from request body
    const checkoutData = req.body;

    // Create a new checkout instance
    const newCheckout = new Checkout(checkoutData);

    // Save the checkout data to the database
    await newCheckout.save();

    // Send a success response
    res.status(200).json({ success: true, message: 'Checkout successful' });
  } catch (error) {
    // Handle errors
    console.error('Error processing checkout:', error);
    res.status(500).json({ success: false, message: 'Failed to process checkout' });
  }
};
