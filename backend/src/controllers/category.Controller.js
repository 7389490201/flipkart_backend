const Category = require("../models/category.Model")
const slugify = require("slugify")


exports.createCategory = (req,res)=>{
    const categoryObj = {
        name:req.body.name,
        slug:slugify(req.body.name),
        
    }
    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId
    }
    if(req.file){
        categoryObj.categoryPicture = process.env.API + "/public/"+ req.file.filename
    }
    const _category  = new Category(categoryObj)
    _category.save()
    .then((data)=>{
        return res.status(201).json({message:data})
    }).catch((err)=>{
        return res.status(400).json({error:`Something went wrong ${err.message}`})
    })
}

function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;

    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined);
    } else {
        category = categories.filter(cat => cat.parentId == parentId);
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            children: createCategories(categories, cate._id) // Recursive call
        });
    }

    return categoryList;
}

exports.getCategory = (req, res) => {
    Category.find({})
        .then(categories => {
            const categoryList = createCategories(categories);
            return res.status(200).json(categoryList);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: "Something went wrong" });
        });
};
