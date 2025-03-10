import * as moviesConstants from '../Constants/MoviesConstants'
import * as MoviesAPIs from '../APIs/MoviesService'
import toast from 'react-hot-toast'
import { ErrorsAction,tokenProtection } from '../Protection'

export const getAllMoviesAction =({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = ""
}) => async (dispatch)=>{
    try {
        dispatch({type:moviesConstants.MOVIES_LIST_REQUEST})
        const response = await MoviesAPIs.getAllMoviesService(
            category,time,language,rate,year,search,pageNumber
        )
        dispatch({type:moviesConstants.MOVIES_LIST_SUCCESS , payload:response})
    } catch (error) {
        ErrorsAction(error,dispatch,moviesConstants.MOVIES_LIST_FAIL)
    }
}

// get random movies action

// export const getRandomMoviesAction = ()=> async (dispatch)=>{
//     try {
        
//         dispatch({type:moviesConstants.MOVIES_RANDOM_REQUEST})
//         const response = await MoviesAPIs.getRandomMoviesService();
//         dispatch({
//             type:moviesConstants.MOVIES_RANDOM_SUCCESS,
//             payload:response
//         })
//     } catch (error) {
//         ErrorsAction(error,dispatch,moviesConstants.MOVIES_LIST_FAIL)
//     }
// }

// get movie by id 

export const getMovieByIdAction = (id)=> async (dispatch)=>{
    try {
        
        dispatch({type:moviesConstants.MOVIE_DETAILS_REQUEST})
        const response = await MoviesAPIs.getMovieByIdService(id);
        dispatch({
            type:moviesConstants.MOVIE_DETAILS_SUCCESS,
            payload:response
        })
    } catch (error) {
        ErrorsAction(error,dispatch,moviesConstants.MOVIE_DETAILS_FAIL)
    }
}


// get Top Rated Movies 

// export const getTopRatedMovieAction = ()=> async (dispatch)=>{
//     try {
        
//         dispatch({type:moviesConstants.MOVIE_TOP_RATED_REQUEST})
//         const response = await MoviesAPIs.getMovieByIdService();
//         dispatch({
//             type:moviesConstants.MOVIE_TOP_RATED_SUCCESS,
//             payload:response
//         })
//     } catch (error) {
//         ErrorsAction(error,dispatch,moviesConstants.MOVIE_TOP_RATED_FAIL)
//     }
// }

// Clear all movies error
export const clearAllMoviesError = () => ({
    type: moviesConstants.MOVIES_LIST_FAIL_RESET,
  });
  
  // Clear random movies error
  export const clearRandomMoviesError = () => ({
    type: moviesConstants.MOVIES_RANDOM_FAIL_RESET,
  });
  
  // Clear top-rated movies error
  export const clearTopRatedMovieError = () => ({
    type: moviesConstants.MOVIE_TOP_RATED_FAIL_RESET,
  });
  export const getRandomMoviesAction = () => async (dispatch) => {
    try {
      dispatch({ type: moviesConstants.MOVIES_RANDOM_REQUEST });
      const response = await MoviesAPIs.getRandomMoviesService();
    //   console.log('Random Movies Response:', response); // Debugging
      dispatch({
        type: moviesConstants.MOVIES_RANDOM_SUCCESS,
        payload: response,
      });
    } catch (error) {
    //   console.error('Random Movies Error:', error); // Debugging
      ErrorsAction(error, dispatch, moviesConstants.MOVIES_RANDOM_FAIL);
    }
  };
  
  export const getTopRatedMovieAction = () => async (dispatch) => {
    try {
      dispatch({ type: moviesConstants.MOVIE_TOP_RATED_REQUEST });
      const response = await MoviesAPIs.getTopRatedMoviesService();
    //   console.log('Top Rated Movies Response:', response); // Debugging
      dispatch({
        type: moviesConstants.MOVIE_TOP_RATED_SUCCESS,
        payload: response,
      });
    } catch (error) {
    //   console.error('Top Rated Movies Error:', error); // Debugging
      ErrorsAction(error, dispatch, moviesConstants.MOVIE_TOP_RATED_FAIL);
    }
  };
  

  // review movie action

  export const reviewMovieAction = ({id,review}) => async (dispatch,getState) => {
    try {
      dispatch({ type: moviesConstants.CREATE_REVIEW_REQUEST });
      const response = await MoviesAPIs.reviewMovieService(
        tokenProtection(getState),
        id,
        review
      );
      dispatch({
        type: moviesConstants.CREATE_REVIEW_SUCCESS,
        payload: response,
      });
      toast.success("Review added Successfully")
      dispatch({type:moviesConstants.CREATE_REVIEW_RESET})
      dispatch(getMovieByIdAction(id));
    } catch (error) {
    //   console.error('Top Rated Movies Error:', error); // Debugging
      ErrorsAction(error, dispatch, moviesConstants.CREATE_REVIEW_FAIL);
    }
  };



  // delete movie action

  export const deleteMovieAction = (id) => async (dispatch,getState)=>{

    try {
      dispatch({type:moviesConstants.DELETE_MOVIE_REQUEST})
      const response = await MoviesAPIs.deleteMovieService(tokenProtection(getState),id)
      dispatch({type:moviesConstants.DELETE_MOVIE_SUCCESS,payload:response,})
      toast.success("Movie delete Successfully")
      dispatch(getAllMoviesAction({}))
    } catch (error) {
      ErrorsAction(error,dispatch,moviesConstants.DELETE_MOVIE_FAIL)
    }
  }


  // delete all movie action

  export const deleteAllMoviesAction = () => async (dispatch,getState)=>{

    try {
      dispatch({type:moviesConstants.DELETE_ALL_MOVIES_REQUEST})
      const response = await MoviesAPIs.deleteAllMoviesService(tokenProtection(getState))
      dispatch({type:moviesConstants.DELETE_ALL_MOVIES_SUCCESS,payload:response,})
      toast.success("All Movies deleted Successfully")
      dispatch(getAllMoviesAction({}))
    } catch (error) {
      ErrorsAction(error,dispatch,moviesConstants.DELETE_ALL_MOVIES_FAIL);
    }
  }


  //create movie action

  export const createMovieAction = (movie) => async (dispatch,getState)=>{
    try {
      dispatch({type:moviesConstants.CREATE_MOVIE_REQUEST});
      const response = await MoviesAPIs.createMovieService(
        tokenProtection(getState),
        movie
      )
      dispatch({
        type:moviesConstants.CREATE_MOVIE_SUCCESS,
        payload:response,
      })
      toast.success("Movie Created Successfully");
      dispatch(deleteAllCastAction())
    } catch (error) {
      ErrorsAction(error,dispatch,moviesConstants.CREATE_MOVIE_FAIL)
    }
  }

  //***************CATS********** */

  // add cast
  export const addCastAction =(cast) =>(dispatch,getState)=>{
    dispatch({type:moviesConstants.ADD_CAST,payload:cast})
    localStorage.setItem("casts",JSON.stringify(getState().casts.casts))
  };

  // remove cast
  export const removeCastAction = (id)=> async (dispatch,getState)=>{
    dispatch({type:moviesConstants.DELETE_CAST,payload:id})
    localStorage.setItem("casts",JSON.stringify(getState().casts.casts))
  }

  // update cast
  export const updateCastAction = (cast)=> async (dispatch,getState)=>{
    dispatch({type:moviesConstants.EDIT_CAST,payload:cast})
    localStorage.setItem("casts",JSON.stringify(getState().casts.casts))
  }

  // delete all casts
  export const deleteAllCastAction = ()=> async (dispatch)=>{
    dispatch({type:moviesConstants.RESET_CAST})
    localStorage.removeItem("casts")
  }


  //update movie action

  export const updateMovieAction = (id, movie) => async (dispatch, getState) => {
    try {
      dispatch({ type: moviesConstants.UPDATE_MOVIE_REQUEST });
  
      // Get the token from the state or localStorage
      const token = getState().userLogin.userInfo?.token || localStorage.getItem('token');
  
      if (!token) {
        throw new Error('No token found');
      }
  
      // Pass the token to the service
      const response = await MoviesAPIs.updateMovieService(token, id, movie);
  
      dispatch({ type: moviesConstants.UPDATE_MOVIE_SUCCESS, payload: response });
      toast.success("Movie updated successfully");
  
      // Refresh the movie list and clear casts
      dispatch(getAllMoviesAction(id));
      dispatch(deleteAllCastAction());
    } catch (error) {
      ErrorsAction(error, dispatch, moviesConstants.UPDATE_MOVIE_FAIL);
    }
  };
