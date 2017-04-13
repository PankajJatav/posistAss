/* * ************************************************************ 
 * Date: 13 Apr, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Schema for Bill collection
 * Typescript file bill.js
 * *************************************************************** */

// Load required packages
var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  rate: Number
});

// Define our bill schema
var BillSchema = new mongoose.Schema({
    number: {
        type: String,
        unique: true,
        required: true,
        default: 0
    },
    date: {
    	type: Date,
    	default: new Date()
    },
    discount: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    customer_id: {
    	type: mongoose.Schema.Types.ObjectId, 
    	ref: 'Customer',
    	required: true
    },
    items: [ItemSchema]
});


Bill = mongoose.model('Bill', BillSchema);

module.exports = Bill;