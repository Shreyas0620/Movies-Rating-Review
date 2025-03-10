import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import Loader from '../Notifications/Loader';
import { RiMovie2Line } from 'react-icons/ri';
import FlexMovieItems from '../FlexMovieItems';
import { useDispatch, useSelector } from 'react-redux';
import { IfMovieLiked, LikedMovie } from '../../Context/Functionalities';

const Swipper = ({ sameClass, movies }) => {

  const {isLoading} = useSelector((state)=>state.userLikeMovie)
  const dispatch = useDispatch()
  const {userInfo} = useSelector((state)=>state.userLogin)

  // if liked function

  const isLiked = (movie)=>{
    return IfMovieLiked(movie)
  }

  const swiperRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideNext(); // Automatically slide to the next slide
      }
    }, 3000); // Change slides every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Swiper
      ref={swiperRef}
      direction='vertical'
      slidesPerView={1}
      loop={true} // Enable infinite looping
      speed={1000}
      className={sameClass}
    >
      {movies.slice(0, 6).map((movie, index) => (
        <SwiperSlide key={index} className='relative rounded overflow-hidden'>
          <div className='w-full h-full flex items-center justify-center'>
            <img
              src={movie?.image ? movie?.image : '/images/movies'}
              alt={movie?.name}
              className='w-full h-full object-cover rounded' // Use object-cover to fill the container
              style={{ objectPosition: 'center' }} // Ensure the image is centered
            />
          </div>
          <div className='absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4'>
            <h1 className='xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold text-white'>
              {movie?.name}
            </h1>
            <div className='flex gap-5 items-center text-dryGray'>
              <FlexMovieItems movie={movie} />
            </div>
            <div className='flex gap-5 items-center'>
              <Link
                to={`/movie/${movie?._id}`}
                className='bg-subMain hover:text-main transition text-white px-8 py-3 rounded font-medium sm:text-sm text-xs'
              >
                Watch Now
              </Link>
              <button
              onClick={()=>LikedMovie(movie,dispatch,userInfo)}
              disabled={isLiked(movie)|| isLoading}

              className={`bg-white
              ${isLiked(movie)?"text-subMain" :"text-white" }
              hover:text-main transition  px-4 py-3 rounded text-sm bg-opacity-30`}>
                <FaHeart />
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};


function Banner({ movies, isLoading }) {
   // console.log('Banner Movies:', movies); // Debugging
   const sameClass = 'w-full flex-col xl:h-96 bg-dry lg:h-64 h-48';
 
   return (
     <div className='relative w-full'>
       {isLoading ? (
         <div className={sameClass}>
           <Loader />
         </div>
       ) : movies?.length > 0 ? (
         <Swipper sameClass={sameClass} movies={movies} />
       ) : (
         <div className={sameClass}>
           <div className='flex items-center justify-center w-24 h-24 p-5 rounded-full bg-dry text-subMain text-4xl mb-4'>
             <RiMovie2Line />
           </div>
           <p className='text-border text-sm'>
             It Seems Like we don't have any movie
           </p>
         </div>
       )}
     </div>
   );
 }

export default Banner;