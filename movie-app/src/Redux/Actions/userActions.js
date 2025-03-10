import * as userConstants from "../Constants/userConstants";
import * as userApi from "../APIs/userServices";
// import {toast} from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";

// Login action
const loginAction = (user) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });
    const response = await userApi.loginService(user); // Use `user` instead of `datas`
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
  }
};

// Register action
const registerAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const response = await userApi.registerService(datas);
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
  }
};

// Logout action
const logoutAction = () => (dispatch) => {
  userApi.logoutService();
  dispatch({ type: userConstants.USER_LOGOUT });
  dispatch({ type: userConstants.USER_REGISTER_RESET });
  
};

//update profile action
const updateProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });

    const token = tokenProtection(getState);
    // console.log("Token:", token);

    const response = await userApi.updateProfileService(user, token);
    // console.log("API Response:", response);

    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
      payload: response,
    });

    toast.success("Profile Updated");

    // Update user info in localStorage
    localStorage.setItem("userInfo", JSON.stringify(response));

    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log("Action Error:", error);
    ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
  }
};

// delete profile action


const deleteProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
    const token = tokenProtection(getState);
    const userId = getState().userLogin.userInfo?._id; // Get the logged-in user's ID
    await userApi.deleteProfileService(token, userId);
    dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS });
    toast.success("Profile Deleted");

    // Dispatch logout action to clear user session
    dispatch(logoutAction());
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
  }
};

// change password 

const changePasswordAction =(passwords)=> async (dispatch,getState)=>{
  try {
    dispatch({type:userConstants.USER_CHANGE_PASSWORD_REQUEST})
    const response = await userApi.changePasswordService(
      passwords,tokenProtection(getState)
    );
    dispatch({
      type:userConstants.USER_CHANGE_PASSWORD_SUCCESS,
      payload:response
    })
  } catch (error) {
    ErrorsAction(error,dispatch,userConstants.USER_DELETE_PROFILE_FAIL)
  }
}

// get all favorite movies 

const getFavoriteMoviesAction =()=>async (dispatch,getState)=>{
  try {
    dispatch({type:userConstants.GET_FAVORITE_MOVIES_REQUEST})
    const response = await userApi.getFavoriteMovies(tokenProtection(getState))
    dispatch({
      type:userConstants.GET_FAVORITE_MOVIES_SUCCESS,
      payload:response
    })
  } catch (error) {
    ErrorsAction(error,dispatch,userConstants.GET_FAVORITE_MOVIES_FAIL)
  }
}

//delete all favorite movies action
const deleteFavoriteMoviesAction =()=>async (dispatch,getState)=>{
  try {
    dispatch({type:userConstants.DELETE_FAVORITE_MOVIES_REQUEST})
   await userApi.deleteFavoriteMovies(tokenProtection(getState))
    dispatch({
      type:userConstants.DELETE_FAVORITE_MOVIES_SUCCESS,
    })
    toast.success("Favorites Movies Deleted")
  } catch (error) {
    ErrorsAction(error,dispatch,userConstants.DELETE_FAVORITE_MOVIES_FAIL)
  }
}

// admin get all users action
const getAllUsersAction= ()=> async (dispatch,getState)=>{
  try {
    dispatch({type:userConstants.GET_ALL_USERS_REQUEST})
    const response = await userApi.getAllUsersServices(tokenProtection(getState));
    dispatch({
      type:userConstants.GET_ALL_USERS_SUCCESS,
      payload:response
    })
  } catch (error) {
    ErrorsAction(error,dispatch,userConstants.GET_ALL_USERS_FAIL)
  }
}

//admin delete user action
const deleteUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.DELETE_USER_REQUEST });

    // Await the deleteUserService call
    await userApi.deleteUserService(id, tokenProtection(getState));

    dispatch({
      type: userConstants.DELETE_USER_SUCCESS,
    });

    toast.success("User Deleted");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.DELETE_USER_FAIL);
  }
};


//user like movie 
const likeMovieAction = (movieId) => async (dispatch,getState)=>{
  try {
    dispatch({ type: userConstants.LIKE_MOVIE_REQUEST });
    await userApi.likeMovieService(movieId,tokenProtection(getState));
    dispatch({
      type: userConstants.LIKE_MOVIE_SUCCESS,
    });
   toast.success("Movie added to your favorites")
   dispatch(getFavoriteMoviesAction())
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.LIKE_MOVIE_FAIL);
  }
}


export { registerAction, loginAction, logoutAction , updateProfileAction ,deleteProfileAction,changePasswordAction,getFavoriteMoviesAction ,deleteFavoriteMoviesAction,getAllUsersAction,deleteUserAction,likeMovieAction};