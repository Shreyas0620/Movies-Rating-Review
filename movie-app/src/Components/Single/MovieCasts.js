import React from 'react';
import { FaUserFriends } from 'react-icons/fa';
import Titles from '../Titles';
import { Swiper, SwiperSlide } from 'swiper/react';

function MovieCasts({ movie }) {
  // Debugging logs


  if (!movie) {
    console.log("Movie not found"); // Debugging
    return <div>Movie Cast is not available right now, we are working on it</div>;
  }

  if (!movie.casts || movie.casts.length === 0) {
    // console.log("Casts array is empty or invalid"); // Debugging
    return <div>No casts available for this movie.</div>;
  }

  return (
    <div className='my-12'>
      <Titles title="Casts" Icon={FaUserFriends} />
      <div className='mt-10'>
        <Swiper
          spaceBetween={10}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          speed={1000}
          breakpoints={{
            0: { slidesPerView: 1 },
            400: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5, spaceBetween: 30 },
          }}
        >
          {movie.casts.map((cast) => (
            <SwiperSlide key={cast.id}>
              <div className='w-48 p-3 italic text-xs text-text rounded flex-colo bg-dry border border-gray-800'>
                <img
                  src={cast.image ? cast.image : "/images/casts/default.jpg"}
                  alt={cast.name}
                  className='w-full h-40 object-contain rounded mb-2'
                />
                <p className="text-center">{cast.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieCasts;