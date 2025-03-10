import Axios from "./Axios"


///////////////////////PUBLIC APIS /////////////////////
// register new user API call 

const registerService = async (user)=>{
const {data} = await Axios.post("/users",user);
if(data){
    localStorage.setItem("userInfo",JSON.stringify(data))
}
return data;
}

//Logout user API Call
const logoutService =()=>{
    localStorage.removeItem("userInfo")
    return null;
}

//login user API Call
const loginService = async(user)=>{
    const {data} = await Axios.post("/users/login",user);
    if(data){
        localStorage.setItem("userInfo",JSON.stringify(data))

    }
    return data
    
}

//////////////////// PRIVATE APIS ////////////////////

// update profile  API Call 

const updateProfileService = async (user,token)=>{
    const {data} = await Axios.put("/users",user,{
      headers:{
        Authorization:`Bearer ${token}`,
      }  
    });
    if(data){
        localStorage.setItem("userInfo",JSON.stringify(data))

    }
    return data
}

// delete profile  API CALL


const deleteProfileService = async (token, userId) => {
    try {
      const { data } = await Axios.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        localStorage.removeItem("userInfo");
      }
      return data;
    } catch (error) {
      console.error("Error deleting profile:", error.response?.data || error.message);
      throw error;
    }
  };


  // change password API call 

  const changePasswordService = async (passwords,token)=>{
    const {data} = await Axios.put("/users/password",passwords,{
      headers:{
        Authorization:`Bearer ${token}`

      }
    })
    return data
  }

  // get all favorite movies 
  const getFavoriteMovies = async (token)=>{
    const {data} = await Axios.get("/users/favorites",{
      headers:{
        Authorization:`Bearer ${token}`,
      }
    })
    return data;
  }

  //delete all favorite movie
  const deleteFavoriteMovies = async (token)=>{
    const {data} = await Axios.delete("/users/favorites",{
      headers:{
        Authorization:`Bearer ${token}`, 
      }
    })
    return data;
    
  }


  // like movie API Call
  const likeMovieService = async(movieId,token) =>{
    const {data} = await Axios.post(`/users/favorites`,movieId,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return data;
  }


  ////////////////   ADMIN APIS ////////////////////////



  // admin get all users
  const getAllUsersServices = async (token)=>{
    const {data} = await Axios.get("users/",{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return data;
  }

  // admin delete user
  const deleteUserService = async (id,token)=>{
    const {data} = await Axios.delete(`/users/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return data;
  }


export {loginService,logoutService,registerService , updateProfileService,deleteProfileService,changePasswordService,getFavoriteMovies,deleteFavoriteMovies,getAllUsersServices ,deleteUserService,likeMovieService}