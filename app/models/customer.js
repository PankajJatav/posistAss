/* * ************************************************************ 
 * Date: 13 Apr, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Schema for customer collection
 * Typescript file customer.js
 * *************************************************************** */


// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var AddressSchema = new mongoose.Schema({
  flat: String,
  street: String,
  state: String,
  pin: String 
});

// Define our user schema
var CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    addresses : [AddressSchema],
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

CustomerSchema.index({'$**': 'text'});

// Export the Mongoose model
module.exports = mongoose.model('Customer', CustomerSchema);