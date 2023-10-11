const subcategoryModel = require("../models/subcategoryTbl");
const categoryModel = require('../models/categoryTbl');
const subcategory = async (req, res) => {
    try {
        let subcategoryinsert = await subcategoryModel.create({
            categoryId: req.body.categoryId,
            subcategory: req.body.subcategory
        });
        if (subcategoryinsert) {
            return res.json({ "messege": "Subcategory record insert", status: 1 });
        } else {
            return res.json({ "messege": "Subcategory not insert", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return false
    }
}

const subcategoryview = async (req, res) => {
    try {

        let viewsubcategory = await subcategoryModel.find({}).populate('categoryId');
        if (viewsubcategory) {
            return res.json({ "viewsubcategory": viewsubcategory, status: 1 });
        } else {
            return res.json({ "messege": "Subcategory not fetch", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const subcategorydelete=async(req,res)=>{
    try {
        let id = req.body.id;
        let deletesubcategory = await subcategoryModel.findByIdAndDelete(id);
        if (deletesubcategory) {
            return res.json({ messege: "subcategory successfully delete", status: 1 })
        } else {
            return res.json({ messege: "subcategory not delete", status: 0 })
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
const subcategoryupdate=async(req,res)=>{
    try {
        let subcategoryupdate = await subcategoryModel.findByIdAndUpdate(req.body.id, {
            subcategoryupdate : req.body.category
        });
        if (subcategoryupdate) {
            return res.json({ messege: "subcategory successfully Update", status: 1 })
        } else {
            return res.json({ messege: "subcategory not Update", status: 0 })
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    subcategory,
    subcategoryview,
    subcategorydelete,
    subcategoryupdate
}