import express from 'express';
// import {protect ,admin} from "../Middlewares/Auth.js"
import { createMovieReview, getMovieById, getMovies, getRandomMovies, getTopRatedMovies, importMovies,updateMovie,deleteMovie,deleteAllMovies , createMovie} from '../Controllers/MoviesController.js';
import { admin, protect } from '../Middlewares/Auth.js';
const router = express.Router();

//public routes
router.post("/import",importMovies);
router.get("/",getMovies);
router.get("/:id",getMovieById);
router.get("/rated/top",getTopRatedMovies);
router.get("/random/all",getRandomMovies);



//protected routes 

router.post("/:id/reviews",protect,createMovieReview)

// admin routes ////

router.put("/:id",protect , admin , updateMovie)
router.delete("/:id",protect , admin , deleteMovie)
router.delete("/",protect , admin , deleteAllMovies)
router.post("/",protect , admin , createMovie)


export default router;