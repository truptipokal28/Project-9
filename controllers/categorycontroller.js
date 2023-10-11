const categoryTbl = require('../models/categoryTbl');

const category = async(req,res) => {
   try{
        if(req.body.category != ""){
            let categorydata = await categoryTbl.create({
                category : req.body.category
            })
            if(categorydata){
                return res.json({"messege" : "Category Successfully Add",status : 1});
            }else{
                return res.json({"messege" : "Category Not  Add",status : 0});
            }
        }else{
            return res.json({"messege" : "Category Must be required",status : 0});
        }
   }catch(err){
        console.log(err);
        return false;
   }
}

const categoryview = async(req,res) => {
    try{
        let viewcategory = await categoryTbl.find({});
        if(viewcategory){
            return res.json({"viewcategory" : viewcategory,status : 1});
        }else{
            return res.json({"messege" : "Category not fetch",status : 0});
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const categoryupdate=async(req,res)=>{
    try {
        let categoryUpdate = await categoryTbl.findByIdAndUpdate(req.body.id, {
            category : req.body.category
        });
        if (categoryUpdate) {
            return res.json({ messege: "category successfully Update", status: 1 })
        } else {
            return res.json({ messege: "category not Update", status: 0 })
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const categorydelete=async(req,res)=>{
    try {
        let id = req.body.id;
        let categorydelete = await categoryTbl.findByIdAndDelete(id);
        if (categorydelete) {
            return res.json({ messege: "category successfully delete", status: 1 })
        } else {
            return res.json({ messege: "category not delete", status: 0 })
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    category,
    categoryview,
    categoryupdate,
    categorydelete
}