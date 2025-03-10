import React, { useEffect } from 'react'
import SideBar from '../SideBar'
import { FaRegListAlt, FaUser } from 'react-icons/fa'
import { HiViewGridAdd } from 'react-icons/hi'
import Table from '../../../Components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersAction } from '../../../Redux/Actions/userActions'
import { deleteMovieAction, getAllMoviesAction } from '../../../Redux/Actions/MoviesActions'
import { getAllCategoriesAction } from '../../../Redux/Actions/CategoriesActions'
import toast from 'react-hot-toast'
import { Empty } from '../../../Components/Notifications/Empty'
import Loader from '../../../Components/Notifications/Loader'

function Dashboard() {

    const dispatch = useDispatch()
      
      const { isLoading: catLoading, isError: catError, categories} = useSelector(
        (state) => state.categoryGetAll
      );
      const { isLoading: userLoading, isError: userError,users } = useSelector(
        (state) => state.adminGetAllUsers
      );
      // const { isLoading, isError, movies } = useSelector((state) => state.getAllMovies);
      const {  isLoading, isError,movies,totalMovies } = useSelector((state) => state.getAllMovies);

        const { isLoading: deleteLoading, isError: deleteError } = useSelector((state) => state.deleteMovie);


        //delete movie handler
          const deleteMovieHandler = (id) => {
            //  console.log("Deleting movie with ID:", id)
            window.confirm("Are you sure want to delete this movie?") &&
              dispatch(deleteMovieAction(id))
           
          }
        
    
      useEffect(() => {
        // get all users
        dispatch(getAllUsersAction());
        //get all movies
        dispatch(getAllMoviesAction({ category: "action" }))
        //get all categories
          dispatch(getAllCategoriesAction())

          if(isError ||catError || userError ||deleteError ){
            toast.error("Something went wrong")
          }
          
      }, [dispatch ,isError ,catError ,userError,deleteError]);
    
    
    
   // dashboard data 
    const DashboardData = [
        {
            bg:"bg-orange-600",
            icon:FaRegListAlt,
            title:"Total Movies",
            total:isLoading ? "Loading...":totalMovies || 0,
        },
        {
            bg:"bg-blue-700",
            icon:HiViewGridAdd,
            title:"Total Categories",
            total:catLoading ? "Loading...": categories?.length || 0,
        },
        {
            bg:"bg-green-600",
            icon:FaUser,
            title:"Total Users",
            total: userLoading ? "Loading...":users?.length || 0,
        },
    ]
  return (
    <SideBar>
        <h2 className='text-xl font-bold'>Dashboard</h2>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
            {
                DashboardData.map((data,index)=>(
                    <div key={data} className='p-4 bg-main border-border grid grid-cols-4 gap-2'>
                        <div className={`col-span-1 rounded-full h-11 w-11 flex-colo ${data.bg}`}>
                            <data.icon/>
                        </div>
                        <div className='col-span-3 mt-1'>
                            <h2>{data.title}</h2>
                            <p className='mt-2 font-bold'>{data.total}</p>
                        </div>
                    </div>
                ))
            }
        </div>
        <h3 className='text-md font-medium my-6 text-border'>Recent Movies</h3>
        {isLoading || deleteLoading ? (
                  <Loader />
                ) : movies.length > 0 ? (
                  <Table data={movies?.slice(0,5)} admin={true} onDeleteHandler={deleteMovieHandler} />
                ) : (
                  <Empty message="Loading Please wait...,else refresh again"/>
                )}
    </SideBar>
  )
}

export default Dashboard