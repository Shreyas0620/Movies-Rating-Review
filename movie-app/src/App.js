import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Aos from 'aos'; // Import Aos
import 'aos/dist/aos.css'; // Import Aos CSS
import HomeSreen from './Screens/HomeSreen';
import AboutUs from './Screens/AboutUs';
import Login from './Screens/Login';
import NotFound from './Screens/NotFound';
import ContactUs from './Screens/ContactUs';
import MoviesPage from './Screens/Movies';
import SingleMovie from './Screens/SingleMovie';
import WatchPage from './Screens/WatchPage';
import Register from './Screens/Register';
import Profile from './Screens/Dashboard/Profile';
import Password from './Screens/Dashboard/Password';
import FavoritiesMovies from './Screens/Dashboard/FavoritiesMovies';
import MovieList from './Screens/Dashboard/Admin/MovieList';
import Dashboard from './Screens/Dashboard/Admin/Dashboard';
import Categories from './Screens/Dashboard/Admin/Categories';
import Users from './Screens/Dashboard/Admin/Users';
import AddMovie from './Screens/Dashboard/Admin/AddMovie';
import ToastContainer from './Components/Notifications/ToastConatiner';
import { AdminProtectedRouter, ProtectedRouter } from './ProtectedRouter';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesAction } from './Redux/Actions/CategoriesActions';
import { getAllMoviesAction } from './Redux/Actions/MoviesActions';
import { getFavoriteMoviesAction } from './Redux/Actions/userActions';
import toast from 'react-hot-toast';
import EditMovie from './Screens/Dashboard/Admin/EditMovie';

function ScrollToTopOnMount() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const dispatch = useDispatch(); // Initialize dispatch here
  const {userInfo} = useSelector((state)=>state.userLogin)
  const {isError,isSuccess} = useSelector((state)=>state.userLikeMovie)
  const {isError:catError} = useSelector((state)=>state.categoryGetAll)


  useEffect(() => {
    Aos.init(); // Initialize Aos
    dispatch(getAllCategoriesAction()); // Dispatch the action here
    dispatch(getAllMoviesAction({}))
    if(userInfo){
      dispatch(getFavoriteMoviesAction())
    }
    if(isError || catError){
    toast.error(isError || catError)
    dispatch({type:"LIKE_MOVIE_RESET"})
    }
    if(isSuccess){
      dispatch({type:"LIKE_MOVIE_RESET"})
    }
  }, [dispatch,userInfo,isError,catError,isSuccess]);

  return (
    <>
      <ToastContainer /> {/* Use the fixed ToastContainer */}
      <ScrollToTopOnMount />
      <Routes>
        {/* {************ PUBLIC ROUTERS ************} */}
        <Route path='/' element={<HomeSreen />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/movies' element={<MoviesPage />} />
        <Route path='/movies/:search' element={<MoviesPage />} />
        <Route path='/movie/:id' element={<SingleMovie />} />
        <Route path='/watch/:id' element={<WatchPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />

        {/* {************ PRIVATE PUBLIC ROUTERS ************} */}
        <Route element={<ProtectedRouter />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/password' element={<Password />} />
          <Route path='/favorites' element={<FavoritiesMovies />} />
        </Route>

        {/* {************ ADMIN ROUTERS ************} */}
        <Route element={<AdminProtectedRouter />}>
          <Route path='/movieslist' element={<MovieList />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/users' element={<Users />} />
          <Route path='/addmovie' element={<AddMovie />} />
          <Route path='/edit/:id' element={<EditMovie />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;