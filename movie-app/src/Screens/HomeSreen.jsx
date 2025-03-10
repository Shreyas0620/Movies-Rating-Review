import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import Banner from '../Components/Home/Banner';
import PopularMovies from '../Components/Home/PopularMovies';
// import TopRated from '../Components/Home/TopRated';
import Promos from '../Components/Home/Promos';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRandomMoviesAction,
  getTopRatedMovieAction,
  clearAllMoviesError,
  clearRandomMoviesError,
  clearTopRatedMovieError,
} from '../Redux/Actions/MoviesActions';
import toast from 'react-hot-toast';

function HomeScreen() {
  
  const dispatch = useDispatch();

  const { isLoading: randomLoading, isError: randomError, movies: randomMovies } = useSelector(
    (state) => state.getRandomMovies
  );
  const { isLoading: topLoading, isError: topError, movies: topMovies } = useSelector(
    (state) => state.getTopRatedMovie
  );
  // const { isLoading, isError, movies } = useSelector((state) => state.getAllMovies);
  const {  isError } = useSelector((state) => state.getAllMovies);

  useEffect(() => {
    // Dispatch actions to get random movies and top-rated movies
    dispatch(getRandomMoviesAction());
    dispatch(getTopRatedMovieAction());
  }, [dispatch]);

  // useEffect(() => {
  //   // Display error toast if any error occurs
  //   if (isError || randomError || topError) {
  //     toast.error('Something went wrong');

  //     // Clear errors after displaying the toast
  //     if (isError) {
  //       dispatch(clearAllMoviesError());
  //     }
  //     if (randomError) {
  //       dispatch(clearRandomMoviesError());
  //     }
  //     if (topError) {
  //       dispatch(clearTopRatedMovieError());
  //     }
  //   }
  // }, [isError, randomError, topError, dispatch]);

  useEffect(() => {
    if (isError || randomError || topError) {
      toast.error('Something went wrong');
  
      // Debugging
      console.log('Errors before clearing:', { isError, randomError, topError });
  
      // Clear errors after displaying the toast
      if (isError) {
        dispatch(clearAllMoviesError());
      }
      if (randomError) {
        dispatch(clearRandomMoviesError());
      }
      if (topError) {
        dispatch(clearTopRatedMovieError());
      }
  
    
    }
  }, [isError, randomError, topError, dispatch]);
  return (
    <Layout>
      <div className='container mx-auto min-h-screen px-2 mb-6'>
        <Banner movies={topMovies} isLoading={topLoading} />
        <PopularMovies movies={randomMovies} isLoading={randomLoading} />
        <Promos />
        {/* <TopRated movies={topMovies} isLoading={topLoading} /> */}
      </div>
    </Layout>
  );
}

export default HomeScreen;