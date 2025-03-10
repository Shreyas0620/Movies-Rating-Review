import Categories from "../Models/CategoriesModal.js"
import asyncHandler from "express-async-handler";

// ******* Public controller ***********
// @desc get all categories 
// @route GET/api/categories 

const getCategories = asyncHandler(async(req , res)=>{
    try {
        const categories = await Categories.find({});
        res.json(categories)  
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
// ********** Private **********// 
// @desc create new category
// @route POST/api/categories
//@access Private/admin

const createCategory = asyncHandler(async(req,res)=>{
    try {
        const {title} = req.body;
        const category = new Categories({
       title,
        })
        const createdCategory = await category.save();
        res.status(201).json(createdCategory)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


// @desc update new category
// @route PUT/api/categories
//@access Private/admin

const updateCategory = asyncHandler(async (req,res)=>{
try {
    const category = await Categories.findById(req.params.id)
    if(category){
        category.title =req.body.title || category.title;
        const updatedCategory = await category.save();
        res.json(updatedCategory)
    }else{
        res.status(400).json({message:"Category not found"})
    }
} catch (error) {
    res.status(400).json({message:error.message})
}
})

// @desc delete new category
// @route DELETE/api/categories
//@access Private/admin

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Categories.findById(req.params.id);

        if (category) {
            await Categories.deleteOne({ _id: category._id }); // Use deleteOne instead of remove
            res.json({ message: "Category removed" });
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



export {getCategories,createCategory,updateCategory,deleteCategory}