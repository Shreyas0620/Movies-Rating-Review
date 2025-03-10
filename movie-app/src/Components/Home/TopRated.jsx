import React, { useState } from 'react';
import Titles from './../Titles';
import { BsBookmarkStarFill, BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules'; // Import required modules
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import { TopRate } from '../../Data/TopRated'; // Ensure TopRate is correctly imported
import Rating from '../Stars';
import Loader from '../Notifications/Loader';
import { Empty } from '../Notifications/Empty';

const SwiperTop = ({ prevEl, nextEl, movies }) => {





  return (


    <Swiper
      modules={[Navigation, Autoplay]} // Add required modules
      navigation={{ nextEl, prevEl }} // Navigation buttons
      slidesPerView={4} // Number of slides per view
      spaceBetween={40} // Space between slides
      autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay configuration
      speed={1000} // Transition speed
      loop={true} // Enable infinite loop
      breakpoints={{
        // Responsive breakpoints
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
    >
      {movies?.map((movie, index) => (
        <SwiperSlide key={index}>
          <div className='p-4 h-rate hovered border-border bg-dry rounded-lg overflow-hidden'>
            {/* Use movie.titleImage for dynamic image paths */}
            <img
              className='w-full h-full object-cover rounded-lg'
              src={movie?.titleImage ? `images/movies/${movie.titleimage}` : "images/movies"} // Dynamic image source
              alt={movie?.name}
              onError={(e) => {
                e.target.src = '/images/default.jpg'; // Fallback image if the image fails to load
              }}
            />
            <div className='px-4 gap-6 hoveres text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0'>
              <button className='w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white'>
                <FaHeart />
              </button>
              <Link className='font-semibold text-xl trancuted line-clamp-2' to={`/movie/${movie?._id}`}>
                {movie?.name}
              </Link>
              <div className='flex gap-2 text-star'>
                {/* Convert movie.rate to a number for the Rating component */}
                <Rating value={parseFloat(movie?.rate)} />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

  )


}

function TopRated({ movies, isLoading }) {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const classNames = "hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white";


  return (
    <div className='my-16'>
      <Titles title='Top Rated' Icon={BsBookmarkStarFill}>
        <div className='mt-10'>
          {
            isLoading ? <Loader /> :
              movies?.length > 0 ?
                <SwiperTop nextEl={nextEl} prevEl={prevEl} movies={movies} />
                :
                <Empty message="It Seem's like we don't have any top rated movie" />
          }
          <div className='w-full px-1 flex-rows gap-6 pt-12'>
            <button className={classNames} ref={(node) => setPrevEl(node)}>
              <BsCaretLeftFill />
            </button>
            <button className={classNames} ref={(node) => setNextEl(node)}>
              <BsCaretRightFill />
            </button>
          </div>
        </div>
      </Titles>
    </div>
  );
}

export default TopRated;