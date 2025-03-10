import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { likeMovieAction } from '../Redux/Actions/userActions'

// check if movie is added to favorite 

const IfMovieLiked = (movie)=>{
    const {likedMovies} = useSelector((state)=>state.userGetFavoriteMovies)
    return likedMovies?.find(likedMovies=>likedMovies?._id===movie?._id)

}

//like movie function

const LikedMovie = (movie,dispatch,userInfo) =>{
    return !userInfo ? toast.error("Please Login to add to favorites")
    :dispatch(likeMovieAction({
        movieId:movie._id,
    }))
}


export {IfMovieLiked,LikedMovie}