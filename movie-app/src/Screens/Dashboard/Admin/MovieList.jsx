import React, { useEffect } from 'react'
import SideBar from '../SideBar'
import Table from '../../../Components/Table'
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllMoviesAction, deleteMovieAction, getAllMoviesAction } from '../../../Redux/Actions/MoviesActions'
import toast from 'react-hot-toast';
import Loader from '../../../Components/Notifications/Loader';
import { Empty } from '../../../Components/Notifications/Empty';
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb';

function MovieList() {
  const dispatch = useDispatch()

  //all movies 
  const { isLoading, isError, movies, pages, page } = useSelector((state) => state.getAllMovies);

  //delete movie 
  const { isLoading: deleteLoading, isError: deleteError } = useSelector((state) => state.deleteMovie);

  //delete all movies 
  const { isLoading: allDeleteLoading, isError: allDeleteError } = useSelector((state) => state.deleteAllMovies);


  //delete movie handler
  const deleteMovieHandler = (id) => {
    //  console.log("Deleting movie with ID:", id)
    window.confirm("Are you sure want to delete this movie?") &&
      dispatch(deleteMovieAction(id))
   
  }

  // delete  all movies handler
  const deleteAllMoviesHandler = () => {
    window.confirm("Are you sure want to delete all the movies?") &&
      dispatch(deleteAllMoviesAction())
  }

  useEffect(() => {
    if (isError || deleteError || allDeleteError) {
      toast.error(isError || deleteError || allDeleteError)
    }
    dispatch(getAllMoviesAction({}))
  }, [dispatch, isError, deleteError, allDeleteError])


  //pagination next and prev pages 
  const nextPage = () => {
    dispatch(getAllMoviesAction({
      pageNumber: page + 1
    }))
  }
  const prevPage = () => {
    dispatch(getAllMoviesAction({
      pageNumber: page - 1
    }))
  }

  return (
    <SideBar>
      <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
          <h2 className='text-xl font-bold'>Movies List</h2>
          {
            movies?.length > 0 &&
            <button
              disabled={allDeleteLoading}
              onClick={deleteAllMoviesHandler}
              className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded'>
              {
                allDeleteLoading ? "Deleting..." : "Delete All"
              }
            </button>

          }
        </div>
        {isLoading || deleteLoading ? (
          <Loader />
        ) : movies.length > 0 ? (
          <>
            <Table data={movies} admin={true} onDeleteHandler={deleteMovieHandler} />
            <div className='w-full flex justify-center gap-6  my-5'>
              <button onClick={prevPage} disabled={page === 1} className='text-white py-2 px-2 rounded font-semibold border-2 border-subMain hover:bg-subMain'>
                <TbPlayerTrackPrev className='text-xl' />
              </button>
              <button onClick={nextPage} disabled={page === pages} className='text-white py-2 px-2 rounded font-semibold border-2 border-subMain hover:bg-subMain'>
                <TbPlayerTrackNext className='text-xl' />
              </button>
            </div>
          </>
        ) : (
          <Empty message="You have no Movies" />
        )}




      </div>
    </SideBar>
  )
}

export default MovieList