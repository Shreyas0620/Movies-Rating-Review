import React from 'react'
import {BsFillGridFill} from 'react-icons/bs'
import {FaListAlt , FaHeart,FaUsers} from 'react-icons/fa';
import {RiMovie2Fill,RiLockPasswordLine, RiLogoutCircleLine} from 'react-icons/ri';
import {HiViewGrid} from 'react-icons/hi';
import {FiSettings} from 'react-icons/fi';
import { NavLink  } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import {useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { logoutAction } from '../../Redux/Actions/userActions';
import toast from 'react-hot-toast';


function SideBar({children}) {

    const dispatch = useDispatch(); // Will be used later for Redux actions
    const navigate = useNavigate()
    const  {userInfo} = useSelector(
        (state)=>state.userLogin
    );
    
    //logout function 
     const logoutHandler = ()=>{
        dispatch(logoutAction());
        toast.success("Logout is successfully")
        navigate("/login")
     }


    const SideLinks =
    userInfo?.isAdmin ?
    [
        {
            name:"Dashboard",
            link:"/dashboard",
            icon:BsFillGridFill
        },
        {
            name:"Movies List",
            link:"/movieslist",
            icon:FaListAlt
        },
        {
            name:"Add Movie",
            link:"/addmovie",
            icon:RiMovie2Fill
        },
        {
            name:"Categories",
            link:"/categories",
            icon:HiViewGrid
        },
        {
            name:"Users",
            link:"/users",
            icon:FaUsers
        },
        {
            name:"Update Profile",
            link:"/profile",
            icon:FiSettings
        },
        {
            name:"Favourites Movies",
            link:"/favorites",
            icon:FaHeart
        },
        {
            name:"Change Password",
            link:"/password",
            icon:RiLockPasswordLine
        },
    ]: userInfo?[
        {
            name:"Update Profile",
            link:"/profile",
            icon:FiSettings
        },
        {
            name:"Favourites Movies",
            link:"/favorites",
            icon:FaHeart
        },
        {
            name:"Change Password",
            link:"/password",
            icon:RiLockPasswordLine
        },
    ]:[]

     const active ="bg-dryGray text-subMain"
     const hover = "hover:text-white hover:bg-main"
     const inActive = "rounded font-medium text-sm transitions flex gap-3 items-center p-4"
    const Hover =({isActive})=>
        isActive ? `${active} ${inActive}` : ` ${inActive}  ${hover}`;
    

  return (
   <Layout>
    <div className='min-h-screen container mx-auto px-2'>
        <div className='xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6'>
            <div className='col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5'>
                {
                    // Sidebar Links

                    SideLinks.map((link,index)=>(
                        <NavLink to ={link.link} key={index} className={Hover}>
                            <link.icon/> <p>{link.name}</p>
                        </NavLink>
                    ))
                }
                <button onClick={logoutHandler} className={`${inActive} ${hover} w-full`}>
                    <RiLogoutCircleLine/> Log out
                </button>
            </div>
            <div data-aos="fade-up"
            dat-aos-duration="1000"
            dat-aos-delay="10"
            dat-aos-offset="100"
            
            className='col-span-6 rounded-md bg-dry border border-gray-800 p-6'>{children}</div>
        </div>
    </div>
   </Layout>
  )
}

export default SideBar