const express = require('express');

const routes = express.Router();

const passport = require('passport');

const multer = require('multer');

const { verifyToken } = require('../config/passport-jwt');
const { checkRole } = require('../config/passport-jwt');

const admincontroller = require('../controllers/admincontroller');
const categorycontroller = require('../controllers/categorycontroller');
const subcategorycontroller = require('../controllers/subcategorycontroller');
const productcontroller = require('../controllers/productcontroller');


//file upload
const fileUpload = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})

const imageUpload = multer({ storage: fileUpload }).single('product_image');


routes.post('/registerapi',admincontroller.registerapi);
routes.get('/adminview', verifyToken, checkRole('admin'),admincontroller.adminview);
routes.delete('/admindelete',admincontroller.admindelete)
routes.put('/adminupdate',admincontroller.adminupdate)
routes.post('/loginuser',admincontroller.loginuser)

//category
routes.post('/category',categorycontroller.category);
routes.get('/categoryview',categorycontroller.categoryview);
routes.delete('/categorydelete',categorycontroller.categorydelete);
routes.put('/categoryupdate',categorycontroller.categoryupdate);

//subcategory
routes.post('/subcategory',subcategorycontroller.subcategory);
routes.get('/subcategoryview',verifyToken,subcategorycontroller.subcategoryview);
routes.delete('/subcategorydelete',subcategorycontroller.subcategorydelete);
routes.put('/subcategoryupdate',subcategorycontroller.subcategoryupdate);

//product
routes.post('/product',imageUpload,productcontroller.product);
routes.get('/productview',productcontroller.productview);
routes.delete('/productdelete',productcontroller.productdelete);
routes.put('/productupdate',productcontroller.productupdate);

module.exports = routes;