import {MoviesData}  from "../Data/MovieData.js"
import Movie from "../Models/MoviesModel.js"
import asyncHandler from "express-async-handler";


// Public controllers 
// import all movies 

const importMovies = asyncHandler(async (req, res) => {
    try {
        // First, we make sure our movie table is empty by deleting all documents
        await Movie.deleteMany({});
        // Then, we insert all movies from the provided data
        const movies = await Movie.insertMany(MoviesData);
        // Send back a successful response with the inserted movies
        res.status(201).json(movies);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ message: error.message });
    }
});

// get all movie 

const getMovies = asyncHandler(async(req,res)=>{
    try {
        // filter movies by category,time,language ,rate ,year and search 
        const {category,time,language,rate,year,search} = req.query;
        let query = {
            ...(category && {category}),
            ...(time && {time}),
            ...(language && {language}),
            ...(rate && {rate}),
            ...(year && {year}),
            ...(search && {name:{$regex:search,$options:"i"}})
        } 

        // load more movies functionality

        const page = Number(req.query.pageNumber) || 1;
        const limit = 9; // two movies per page
        const skip =(page - 1)*limit;

        //find movies by query

        const movies = await Movie.find(query)
        .sort({createdAt:-1})
        .skip(skip).limit(limit)

        const count = await Movie.countDocuments(query)

        // send response with movies and total number of movies
        res.json({movies ,
             page,
             pages:Math.ceil(count/limit), // total pages 
             totalMovies:count}) // total movies \

            





    } catch (error) {
    res.status(500).json({message:error.message})    
    }
})

// get movies by id 

const getMovieById = asyncHandler(async(req,res)=>{
    try {
        // find movie by id
        const movie = await Movie.findById(req.params.id)
        // if movie find send to client 

        if(movie){
            res.json(movie);
        }else{
            res.status(404);
            throw new Error("Movie not found")
        }

    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

// get top rated movie 

const getTopRatedMovies = asyncHandler(async(req,res)=>{
    try {
        const movies = await Movie.find({}).sort({rate:-1})
        // send top rated movies client 

        res.json(movies)



    } catch (error) {
        res.status(400).json({message:error.message})
        
    }
})


// get random movies

const getRandomMovies = asyncHandler(async(req,res)=>{
    try {
        
        const movies = await Movie.aggregate([{$sample:{size:8}}])
        res.json(movies)


    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

// Create movie  review
// @access private 

const createMovieReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) {
        res.status(404);
        throw new Error("Movie not found");
      }
  
      // Ensure reviews property exists and is an array
      if (!Array.isArray(movie.reviews)) {
        movie.reviews = [];
      }
  
      // Check if user already reviewed this movie
      const alreadyReviewed = movie.reviews.find(
        (r) => r.userId.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("You already reviewed this movie");
      }
  
      // Create review
      const newReview = {
        userName: req.user.fullName,
        userId: req.user._id,
        userImage: req.user.image,
        rating: Number(rating),
        comment,
      };
  
      // Push the new review to the reviews array
      movie.reviews.push(newReview);
      movie.numberOfReviews = movie.reviews.length;
  
      // Calculate the new rate
      movie.rate =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;
  
      // Save the movie in the database
      await movie.save();
      res.status(201).json({
        message: "Review added..",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // ******************* ADMIN Controllers *************** //

  // @desc Update  movie 
  //@route PUT/api/movies/:id
  // @access Private/Admin 
  
  const updateMovie = asyncHandler(async(req,res)=>{
    try {
      const {
        name,
        desc,
        image,
        titleImage,
        rate,
        numberOfReviews,
        category,
        time,
        language,
        year,
        video,
        casts
      } = req.body;

      const movie = await Movie.findById(req.params.id);

      if(movie){
        movie.name = name || movie.name;
        movie.desc = desc || movie.desc;
        movie.image = image || movie.image;
        movie.titleImage = titleImage || movie.titleImage;
        movie.rate = rate || movie.rate;
        movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
        movie.category = category || movie.category;
        movie.time = time || movie.time;
        movie.language = language || movie.language;
        movie.year = year || movie.year;
        movie.video = video || movie.video;
        movie.casts = casts || movie.casts;
        
        // Save movies in database

        const updatedMovie = await movie.save();
        res.status(200).json(updatedMovie);

      }else{
        res.status(404);
        throw new Error("Movie not found")
      }
    }catch(error){
      res.status(400).json({message: error.message})
    } 
  })

  // @desc Delete a movie 
  //@route DELETE/api/movies/:id
  // @access Private/Admin


const deleteMovie = asyncHandler(async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id); // Use findByIdAndDelete
    if (movie) {
      res.json({ message: "Movie removed" });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete ALL  movie 
//@route DELETE/api/movies/:id
// @access Private/Admin

const deleteAllMovies = asyncHandler(async (req, res) => {
  try {
    await Movie.deleteMany({}); // Delete all documents in the Movie collection
    res.json({ message: "All Movies removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Create Movie
//@route POST/api/movies
//@access Private/Admin

const createMovie = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;

    // Create a new movie
    const movie = new Movie({
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
      userId: req.user._id, // Corrected from req.use._id to req.user._id
    });

    // Save the movie in the database
    const createdMovie = await movie.save();
    res.status(201).json(createdMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


export {importMovies , getMovies ,  getMovieById , getTopRatedMovies , getRandomMovies , createMovieReview , updateMovie ,deleteMovie , deleteAllMovies ,createMovie }