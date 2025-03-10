import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { adminDeleteAllUsersReducers, adminGetAllUsersReducers, userChangePasswordReducer, userDeleteFavoriteMoviesReducer, userDeleteProfileReducer, userGetFavoriteMoviesReducer, userLikeMovieReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './Reducers/userReducers';
import { createCategoryReducer, deleteCategoryReducer, getAllCategoriesReducer, updateCategoryReducer } from './Reducers/CategoriesReducer';
import { castsReducer, createMovieReducer, createReviewReducer, deleteAllMoviesReducer, deleteMovieReducer, moviesDetailsReducer, moviesListReducer, moviesRandomReducer, movieTopRatedReducer, updateMovieReducer } from './Reducers/MoviesReducer';

// Combine reducers
const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile:userUpdateProfileReducer,
  userDeleteProfile:userDeleteProfileReducer,
  userChangePassword:userChangePasswordReducer,
  userGetFavoriteMovies:userGetFavoriteMoviesReducer,
  userDeleteFavoriteMovies:userDeleteFavoriteMoviesReducer,
  adminGetAllUsers:adminGetAllUsersReducers,
  adminDeleteUser:adminDeleteAllUsersReducers,
  userLikeMovie:userLikeMovieReducer,


  //category reducers 

  categoryGetAll:getAllCategoriesReducer,
  categoryCreate:createCategoryReducer,
  categoryUpdate:updateCategoryReducer,
  categoryDelete:deleteCategoryReducer,

  // Movies reducers

  getAllMovies:moviesListReducer,
  getRandomMovies:moviesRandomReducer,
  getMovieById:moviesDetailsReducer,
  getTopRatedMovie:movieTopRatedReducer,
  createReview:createReviewReducer,
  deleteMovie:deleteMovieReducer,
  deleteAllMovies:deleteAllMoviesReducer,
  createMovie:createMovieReducer,
  casts:castsReducer,
  updateMovie:updateMovieReducer,




});

// Check localStorage for userInfo
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Initial state
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

// Create the store
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  // Redux DevTools is enabled by default in Redux Toolkit
});

export default store;