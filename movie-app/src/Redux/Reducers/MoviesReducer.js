
import * as MoviesConstants from '../Constants/MoviesConstants';

// Get all movies
export const moviesListReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case MoviesConstants.MOVIES_LIST_REQUEST:
      return { isLoading: true };
    case MoviesConstants.MOVIES_LIST_SUCCESS:
      return {
        isLoading: false,
        movies: action.payload.movies,
        pages: action.payload.pages,
        page: action.payload.page,
        totalMovies: action.payload.totalMovies,
      };
    case MoviesConstants.MOVIES_LIST_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstants.MOVIES_LIST_FAIL_RESET:
      return { ...state, isError: false }; // Reset error state
    default:
      return state;
  }
};

// Get random movies
// export const moviesRandomReducer = (state = { movies: [] }, action) => {
//   switch (action.type) {
//     case MoviesConstants.MOVIES_RANDOM_REQUEST:
//       return { isLoading: true };
//     case MoviesConstants.MOVIES_RANDOM_SUCCESS:
//       return { isLoading: false, movies: action.payload };
//     case MoviesConstants.MOVIES_RANDOM_FAIL:
//       return { isLoading: false, isError: action.payload };
//     case MoviesConstants.MOVIES_RANDOM_FAIL_RESET:
//       return { ...state, isError: false }; // Reset error state
//     default:
//       return state;
//   }
// };
export const moviesRandomReducer = (state = { movies: [], isLoading: false, isError: false }, action) => {
    switch (action.type) {
      case MoviesConstants.MOVIES_RANDOM_REQUEST:
        return { ...state, isLoading: true };
      case MoviesConstants.MOVIES_RANDOM_SUCCESS:
        return { ...state, isLoading: false, movies: action.payload };
      case MoviesConstants.MOVIES_RANDOM_FAIL:
        return { ...state, isLoading: false, isError: action.payload };
      case MoviesConstants.MOVIES_RANDOM_FAIL_RESET:
        return { ...state, isError: false };
      default:
        return state;
    }
  };

// Get movie by ID
export const moviesDetailsReducer = (state = { movie: {} }, action) => {
  switch (action.type) {
    case MoviesConstants.MOVIE_DETAILS_REQUEST:
      return { isLoading: true };
    case MoviesConstants.MOVIE_DETAILS_SUCCESS:
      return { isLoading: false, movie: action.payload };
    case MoviesConstants.MOVIE_DETAILS_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstants.MOVIE_DETAILS_RESET:
      return { movie: {} };
    default:
      return state;
  }
};

// Get top-rated movies
export const movieTopRatedReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case MoviesConstants.MOVIE_TOP_RATED_REQUEST:
      return { isLoading: true };
    case MoviesConstants.MOVIE_TOP_RATED_SUCCESS:
      return { isLoading: false, movies: action.payload };
    case MoviesConstants.MOVIE_TOP_RATED_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstants.MOVIE_TOP_RATED_FAIL_RESET:
      return { ...state, isError: false }; // Reset error state
    default:
      return state;
  }
};


// create Review 

export const createReviewReducer = (state={},action)=>{
  switch (action.type) {
    case MoviesConstants.CREATE_REVIEW_REQUEST:
      return { isLoading: true };
    case MoviesConstants.CREATE_REVIEW_SUCCESS:
      return { isLoading: false, isSuccess:true};
    case MoviesConstants.CREATE_REVIEW_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstants.CREATE_REVIEW_RESET:
      return {}; 
    default:
      return state;
  }
}


// delete movie 


export const deleteMovieReducer = (state={},action)=>{
  
  switch (action.type) {
    case MoviesConstants.DELETE_MOVIE_REQUEST:
      return {isLoading:true}
    case MoviesConstants.DELETE_MOVIE_SUCCESS:
      return {isLoading:false,isSuccess:true}
    case MoviesConstants.DELETE_MOVIE_FAIL:
      return {isLoading:false , isError:action.payload}
    default:
      return state;
  }

}

// delete all movie 

export const deleteAllMoviesReducer = (state={},action)=>{
  switch(action.type){
  case MoviesConstants.DELETE_ALL_MOVIES_REQUEST:
    return {isLoading:true}
  case MoviesConstants.DELETE_ALL_MOVIES_SUCCESS:
    return {isLoading:false,isSuccess:true}
  case MoviesConstants.DELETE_ALL_MOVIES_FAIL:
    return {isLoading:false , isError:action.payload}
  default:
    return state;
  }
}



//create movie 

export const createMovieReducer = (state ={},action)=>{
  switch (action.type) {
    case MoviesConstants.CREATE_MOVIE_REQUEST:
      return {isLoading:true}
    case MoviesConstants.CREATE_MOVIE_SUCCESS:
      return {isLoading:false,isSuccess:true};
    case MoviesConstants.CREATE_MOVIE_FAIL:
      return {isLoading:false,isError:action.payload};
    case MoviesConstants.CREATE_MOVIE_RESET:
    default:
      return state;
  }
}

// CASTS 
export const castsReducer =(state={casts:[]},action)=>{
  switch (action.type) {
    case MoviesConstants.ADD_CAST:
        return {casts:[...state.casts,action.payload]};
    case MoviesConstants.EDIT_CAST:
    const updatedCasts = state.casts.map((cast)=>
      cast.id === action.payload.id ? action.payload:cast)
        return {
          casts:updatedCasts
        };
    case MoviesConstants.DELETE_CAST:
      return {
        ...state,
        casts:state.casts.filter((cast)=> cast.id !== action.payload)
      };
      case MoviesConstants.RESET_CAST:
        return  {casts:[]};
    default:
      return state;
  }
}


//Update movie

export const updateMovieReducer = (state={},action)=>{
  switch (action.type) {
    case MoviesConstants.UPDATE_MOVIE_REQUEST:
      return {isLoading:true}
    case MoviesConstants.UPDATE_MOVIE_SUCCESS:
      return {isLoading:false,isSuccess:true}
    case MoviesConstants.UPDATE_MOVIE_FAIL:
      return {isLoading:false,isError:action.payload}
    case MoviesConstants.UPDATE_MOVIE_RESET:
      return {}
    default:
     return state;
  }
}