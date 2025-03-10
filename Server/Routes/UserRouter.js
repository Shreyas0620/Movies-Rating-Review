import express from 'express';
import { registerUser , loginUser , updateUserProfile, deleteUserProfile, changeUserPassword, getLikedMovies, addLikedMovie, deleteLikedMovies, getUsers, deleteUser} from '../Controllers/UserController.js';
import {protect ,admin} from "../Middlewares/Auth.js"
const router = express.Router();

//public routes
router.post("/",registerUser);
router.post("/login",loginUser)


//protected routes 
router.put("/", protect,updateUserProfile)
router.delete("/",protect,deleteUserProfile)
router.put("/password",protect,changeUserPassword)
router.get("/favorites",protect,getLikedMovies) // it cause error because we dont have movie models
router.post("/favorites",protect,addLikedMovie) 
router.delete("/favorites",protect,deleteLikedMovies) 


// admin routes ////

router.get("/",protect,admin,getUsers);
router.delete("/:id",protect,deleteUser);

export default router;