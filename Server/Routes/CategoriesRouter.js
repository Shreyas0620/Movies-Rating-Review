import express from 'express';
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../Controllers/CategoriesController.js';
import { admin, protect } from '../Middlewares/Auth.js';
const router = express.Router();


// **************** PUBLIC Routes *********
router.get("/",getCategories)

//***************ADMIN Routes***************** */

router.post("/", protect, admin, createCategory)
router.put("/:id", protect, admin, updateCategory)
router.delete("/:id", protect, admin, deleteCategory)


export default router;