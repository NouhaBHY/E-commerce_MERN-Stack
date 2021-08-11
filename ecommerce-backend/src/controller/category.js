const Category = require('../models/category');
const slugify =require('slugify');
const shortId =require('shortid');
const env = require('dotenv');


function createCategories(categories, parentId = null){
    const categoryList = [];
    let category;
    if(parentId == null){ //fetch all parent categories
        category = categories.filter(cat => cat.parentId == undefined); // for parent category there is no parentId
    }else{ // if it isn't parent
        category = categories.filter(cat => cat.parentId == parentId); // it's a parent so it have parentId
    }
    for( let cate of category){
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: createCategories(categories, cate._id)//pass the _id of the current category
        });
    }
    return categoryList;
};
/*
exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
        }
        if(req.body.parentId){
            categoryObj.parentId = req.body.parentId;
        }
        const cat = new Category(categoryObj);
        cat.save((error, category) => {
            if(error) return res.status(400).json({ error});
            if(category){
                return res.status(201).json({ category });
            }
        });
    
}*/

exports.addCategory = (req, res) => {

    /*
    const categoryObj = {
        name: req.body.name,
        //slug: slugify(req.body.name)
   
    }*/
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)//`${slugify(req.body.name)}-${shortid.generate()}`,
       
    }
    if(req.file){ //if this exist, then extract the image
        categoryObj.categoryImage = process.env.API + "/public/" + req.file.filename;  
    }
    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }
    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if(error) return res.status(400).json({ error});
        if(category){
            return res.status(201).json({ category });
        }
    });
    
} 

//FETCH category
exports.getCategories = (req, res) => {
    Category.find({})
    .exec((error, categories) => {
        if(error) return res.status(400).json({ error});
        if(categories){
            const categoryList = createCategories(categories);
            res.status(200).json({ categoryList });
    
        }
    });
}