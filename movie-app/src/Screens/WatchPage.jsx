import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { useParams, Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { FaCloudDownloadAlt, FaHeart, FaPlay } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieByIdAction } from '../Redux/Actions/MoviesActions';
import { RiMovie2Line } from 'react-icons/ri';
import Loader from '../Components/Notifications/Loader';
import { IfMovieLiked, LikedMovie } from '../Context/Functionalities';

function WatchPage() {
  let { id } = useParams();
  const dispatch = useDispatch()
  const [play, setPlay] = useState(false);

  const sameClass="w-full gap-6 flex-col min-h-screen"

  // use Selector
  const { isLoading, isError, movie } = useSelector((state) => state.getMovieById);

  
  const {isLoading:likeLoading} = useSelector((state)=>state.userLikeMovie)
  const {userInfo} = useSelector((state)=>state.userLogin)

  // if liked function

  const isLiked=(movie) => IfMovieLiked(movie)

  useEffect(()=>{
    dispatch(getMovieByIdAction(id))
  },[dispatch,id])

  return (
    <Layout>
      <div className='container mx-auto bg-dry p-6 mb-12'>
      {
            !isError && 
            <div className='flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6'>
          <Link to={`/movie/${movie?._id}`} className='md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray'>
            <BiArrowBack /> {movie?.name}
          </Link>
          <div 
               onClick={()=>LikedMovie(movie,dispatch,userInfo)}
               disabled={isLiked(movie) || likeLoading}
          className='flex-btn sm:w-auto w-full gap-5'>
            <button className={`bg-white hover:text-subMain 
              ${
              isLiked(movie) ? "text-subMain":"text-white"
              }
              transitions bg-opacity-30  rounded px-4 py-3 text-sm`}>
              <FaHeart />
            </button>
            <button className='bg-subMain flex-rows hover:text-main transitions  text-white rounded px-8 font-medium py-3 text-sm'>
              <FaCloudDownloadAlt /> Download
            </button>
          </div>
        </div>


          }
        
        {/* { watch video } */}
        {play ? (
          <video controls autoPlay className='w-full h-full rounded'>
            <source src={movie?.video} type='video/mp4' title={movie?.name} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className='w-full h-full rounded-lg overflow-hidden relative'>
            {
              isLoading ? (
                <div className={sameClass}>
                  <Loader/>
                </div>
              ):
              isError ? (
                <div className={sameClass}>
                           <div className='flex items-center justify-center w-24 h-24 p-5 rounded-full bg-main text-subMain text-4xl mb-4'>
                             <RiMovie2Line />
                           </div>
                           <p className='text-border text-sm'>
                            {isError}
                           </p>
                         </div>
              ):(
            <>
            
            <div className='absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo'>
              <button onClick={() => setPlay(true)} className='bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl'>
                <FaPlay />
              </button>
            </div>
            <img
              src={movie?.image}
              alt={movie?.name}
              className='w-full h-full object-cover rounded-lg'
            />
            
            </>
              )
            }
            
          </div>
        )}
      </div>
    </Layout>
  );
}

export default WatchPage;
