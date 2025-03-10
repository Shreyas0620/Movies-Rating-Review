import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { useParams } from 'react-router-dom';
import MovieCasts from '../Components/Single/MovieCasts';
import MovieInfo from '../Components/Single/MovieInfo';
import MovieRates from '../Components/Single/MovieRates';
import Titles from '../Components/Titles';
import { BsCollectionFill } from 'react-icons/bs';
import Movie from "../Components/Movie";
import ShareMovieModal from '../Components/Modals/ShareModal';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieByIdAction } from '../Redux/Actions/MoviesActions';
import Loader from '../Components/Notifications/Loader';
import { RiMovie2Line } from 'react-icons/ri';

function SingleMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const sameClass = "w-full gap-6 flex-col min-h-screen";

  // Redux state
  const { isLoading, isError, movie } = useSelector((state) => state.getMovieById);
  const { movies } = useSelector((state) => state.getAllMovies);

  // Related movies
  const RelatedMovies = movies?.filter((m) => m.category === movie?.category && m._id !== movie?._id);

  // Fetch movie data on component mount or when ID changes
  useEffect(() => {
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  // Fallback for undefined movie
  if (!movie) {
    return (
      <div className={sameClass}>
        <Loader /> {/* Show a loader while the movie data is being fetched */}
      </div>
    );
  }

  return (
    <Layout>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className='flex items-center justify-center w-24 h-24 p-5 rounded-full bg-dry text-subMain text-4xl mb-4'>
            <RiMovie2Line />
          </div>
          <p className='text-border text-sm'>Something went wrong</p>
        </div>
      ) : (
        <>
          <ShareMovieModal modalOpen={modalOpen} setModalOpen={setModalOpen} movie={movie} />
          <MovieInfo movie={movie} setModalOpen={setModalOpen} />
          <div className='container mx-auto min-h-screen px-2 my-6'>
            <MovieCasts movie={movie} />
            {/* Rate */}
            <MovieRates movie={movie} />
            {/* Related Movies */}
            {RelatedMovies && RelatedMovies.length > 0 && (
              <div className='my-16'>
                <Titles title="Related Movies" Icon={BsCollectionFill} />
                <div className='grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6'>
                  {RelatedMovies.map((relatedMovie) => (
                    <Movie key={relatedMovie?._id} movie={relatedMovie} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
}

export default SingleMovie;