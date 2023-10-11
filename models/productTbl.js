const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    subcategoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subcategory' 
    },
    product_name : {
        type : String,
        required : true
    },
    product_price : {
        type : String,
        required : true
    },
    product_qty : {
        type : Number,
        required : true
    },
    product_description : {
        type : String,
        required : true
    },
    product_image : {
        type : String,
        required : true
    }
})

const product = mongoose.model('product',productSchema);
module.exports = product;