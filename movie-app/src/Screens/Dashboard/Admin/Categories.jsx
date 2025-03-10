import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import {  HiPlusCircle } from 'react-icons/hi'
import Table2 from '../../../Components/Table2'
import CategoryModal from '../../../Components/Modals/CategoryModal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategoryAction } from '../../../Redux/Actions/CategoriesActions'
import Loader from '../../../Components/Notifications/Loader'
import { Empty } from '../../../Components/Notifications/Empty'
import toast from 'react-hot-toast'

function Categories() {
  const [modalOpen,setModalOpen] = useState(false);
  const [category,setCategory] = useState();
  const dispatch = useDispatch()

  //all categories
  const{categories,isLoading} = useSelector(state=>state.categoryGetAll);

  //delete categories
  const{isSuccess,isError} = useSelector(state=>state.categoryDelete);
  const adminDeleteCategory = (id)=>{
    if(window.confirm("Are you sure want to delete this category")){
   dispatch(deleteCategoryAction(id))
    }
  }




  const onEditFunction =(id)=>{
    setCategory(id);
    setModalOpen(!modalOpen);
  };

  useEffect(()=>{
    if(isError){
      toast.error(isError)
      dispatch({type:"DELETE_CATEGORY_RESET"})
    }
    if(isSuccess){
      dispatch({type:"DELETE_CATEGORY_SUCCESS"})
    }

    if(modalOpen === false){
      setCategory();
    }
  },[modalOpen,dispatch,isError,isSuccess])

  return (
    <SideBar>
      <CategoryModal modalOpen={modalOpen} setModalOpen={setModalOpen} category={category}/>
    <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
        <h2 className='text-xl font-bold'>Categories</h2>
        <button
        onClick={()=>setModalOpen(true)}
         className='bg-subMain flex flex-row gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded'>
          <HiPlusCircle className='mt-1'/> Create
        </button>
        </div>

        {isLoading ? (
          <Loader />
        ) : categories?.length > 0 ? (
        <Table2 data ={categories} users={false} onEditFunction={onEditFunction} onDeleteFunction={adminDeleteCategory} />
         
        ) : (
          <Empty message="No Categories Created"/>
        )}




    </div>
</SideBar>
  )
}

export default Categories