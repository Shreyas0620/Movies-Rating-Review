import { logoutAction } from "./Actions/userActions";

//     console.log("Error Object:", error);
  
//     const message =
//       error.response && error.response.data && error.response.data.message
//         ? error.response.data.message
//         : error.message;
  
//     if (message === "Not authorized, token failed") {
//       dispatch(logoutAction());
//     }
  
//     return dispatch({ type: action, payload: message });
//   };

// api token protection 
export const ErrorsAction = (error, dispatch, action) => {
    // console.log("Error Object:", error);
  
    // Safely access the error message
    const message =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message || "An unknown error occurred";
  
    // Handle token failure
    if (message === "Not authorized, token failed") {
      dispatch(logoutAction());
    }
  
    // Dispatch the error action
    return dispatch({ type: action, payload: message });
  };


export const tokenProtection = (getState)=>{
    const {
        userLogin :{userInfo},

    } = getState();
    if(!userInfo?.token){
        return null
    }else{
        return userInfo?.token
    }
}