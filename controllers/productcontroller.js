const productTbl = require('../models/productTbl');
const categoryTbl=require('../models/categoryTbl')

const product = async(req,res) => {
   try{
    if(req.file){
        let productinsert = await productTbl.create({
            categoryId : req.body.category,
            subcategoryId : req.body.subcategory,
            product_name : req.body.product_name,
            product_price : req.body.product_price,
            product_qty : req.body.product_qty,
            product_description : req.body.product_description,
            product_image : req.file.path
          });
          if(productinsert){
             return res.json({"messege" : "Product successfully insert"});
          }else{
            return res.json({"messege" : "Product not insert"});
          }
    }else{
         return res.json({"messege" : "File notupload",status : 1});
    }
   }catch(err){
       console.log(err);
       return false;
   }
}

const productview=async(req,res)=>{
  try{
    const results = await categoryTbl.aggregate([
      {
        $lookup: {
          from: 'subcategories',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'subcategory',
        },
      },
      {
        $unwind: '$subcategory',
      },
      {
        $lookup: {
          from: 'products',
          localField: 'subcategory._id',
          foreignField: 'subcategoryId',
          as: 'product',
        },
      },
    ]);
    res.json(results);
  }catch(err){
    console.log(err);
    return false;
  }
}

const productdelete=async(req,res)=>{
  try {
    let id = req.body.id;
    let productdelete = await categoryTbl.findByIdAndDelete(id);
    if (productdelete) {
        return res.json({ messege: "product deleted successfully", status: 1 })
    } else {
        return res.json({ messege: "product not deleted", status: 0 })
    }
} catch (err) {
    console.log(err);
    return false;
}
}

const productupdate=async(req,res)=>{
  try {
    let productupdate = await productTbl.findByIdAndUpdate(req.body.id, {
      productupdate : req.body.product
    });
    if (productupdate) {
        return res.json({ messege: "product updated successfully Update", status: 1 })
    } else {
        return res.json({ messege: "product not updated Update", status: 0 })
    }
} catch (err) {
    console.log(err);
    return false;
}
}

module.exports = {
    product,
    productview,
    productdelete,
    productupdate
}