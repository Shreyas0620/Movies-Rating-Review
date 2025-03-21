import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import { Input, Message, Select } from '../../../Components/UsedInputs'
import Uploader from '../../../Components/Uploader'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { ImUpload } from 'react-icons/im'
import CastsModal from '../../../Components/Modals/CastsModal'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { movieValidation } from '../../../Components/Validation/MovieValidation'
import { createMovieAction, removeCastAction } from '../../../Redux/Actions/MoviesActions'
import toast from 'react-hot-toast'
import { InlineError } from '../../../Components/Notifications/Error'
import { Imagepreview } from '../../../Components/Imagepreview'


function AddMovie() {
  const [modalOpen, setModalOpen] = useState(false)
  const [cast, setCast] = useState(null)
  const [imageWithoutTitle, setImageWithoutTitle] = useState("")
  const [imageTitle, setImageTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Use Selector

  const { categories } = useSelector((state) => state.categoryGetAll)

  const { isLoading, isError, isSuccess } = useSelector((state) => state.createMovie);

  const { casts } = useSelector((state) => state.casts);

  // validate movie
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, // Corrected to `errors` instead of `error`
  } = useForm({
    resolver: yupResolver(movieValidation),
  });



  // On submit
  const onSubmit = (data) => {
    dispatch(createMovieAction(
      {
        ...data,
        image:imageWithoutTitle,
        titleImage:imageTitle,
        video:videoUrl,
        casts,
      }
    ))
  
  };


  // delete cast handler

  const deleteCastHandler = (id) => {
    dispatch(removeCastAction(id))
    toast.success("Cast deleted Successfully")
  }




  useEffect(() => {

    // if modal is false then reset cast

    if (modalOpen === false) {
      setCast()
    }

    //if its success then reset form and navigate to addMovie
    if (isSuccess) {
      reset({
        name: "",
        time: 0,
        language: "",
        year: 0,
        category: "",
        desc: "",
      })

      setImageTitle("");
      setImageWithoutTitle("")
      setVideoUrl("")
      dispatch({ type: "CREATE_MOVIE_RESET" })
      navigate("/addMovie")
    }

    // if error then show
    if (isError) {
      toast.error("Something went wrong");
      dispatch({ type: "CREATE_MOVIE_RESET" })
    }

  }, [modalOpen, isSuccess, isError, dispatch, reset, navigate])



  return (
    <>

      <SideBar>
        <CastsModal modalOpen={modalOpen} setModalOpen={setModalOpen} cast={cast} />
        <div className='flex flex-col gap-6'>
          <h2 className='text-xl font-bold'>Create Movie</h2>
          <div className='w-full grid md:grid-cols-2 gap-6'>
            <div className='w-full'>
              <Input
                label="Movie Title" placeholder="Add movie title" type='text' bg={true}
                name="name"
                register={register("name")}
              />
              {errors.name && <InlineError text={errors.name.message} />}
            </div>

            <div className='w-full'>
              <Input label="Hours" placeholder="Duration of movie" type='number' bg={true} name="time" register={register("time")} />
              {errors.time && <InlineError text={errors.time.message} />}
            </div>

          </div>

          <div className='w-full grid md:grid-cols-2 gap-6'>
            <div className='w-full'>
              <Input label="language" placeholder="Add language" type='text' bg={true}
                name="language" register={register("language")} />
              {errors.language && <InlineError text={errors.language.message} />}
            </div>
            <div className='w-full'>
              <Input label="year of release" placeholder="Add year" type='number' bg={true}
                name="year"
                register={register("year")} />
              {errors.year && <InlineError text={errors.year.message} />}
            </div>
          </div>

          {/* images */}
          <div className='w-full grid md:grid-cols-2 gap-6'>
            {/* image without title */}
            <div className='flex flex-col gap-2'>
              <p className='text-border font-semibold text-sm'>
                Image Without title
              </p>
              <Uploader setImageUrl={setImageWithoutTitle} />
              <Imagepreview image={imageWithoutTitle} name="imageWithoutTitle"/>
            </div>
            {/* image with title  */}
            <div className='flex flex-col gap-2'>
              <p className='text-border font-semibold text-sm'>
                Image With title
              </p>
              <Uploader setImageUrl={setImageTitle} />
              <Imagepreview image={imageTitle} name="imageTitle"/>
            </div>
          </div>

          {/* description */}
          <div className='w-full'>
          <Message label="Movie Description" placeholder="Write Description of movie" name="desc"
          register={{...register("desc")}}
          />
          {errors.desc && <InlineError text={errors.desc.message}/>}
          </div>

          {/* category */}
          <div className='text-sm w-full'>
            <Select label="Movie Category" options={
              categories?.length > 0 ? categories:[]  } 
              name="category"
              register={{...register("category")}}
              />
           { errors.category && <InlineError text={errors.category.message}/>}
          </div>


<div className='flex flex-col gap-2 w-full '>
    <label className='text-border font-semibold text-sm'>Movie Video</label>
    <div className={`w-full grid ${videoUrl && "md:grid-cols-2"} gap-6 `}>
        {videoUrl && (
            <div className='w-full bg-main text-sm text-subMain py-4 border border-border rounded flex-col'>
                <p className='text-center'>Video Uploaded</p>
            </div>
        )}
        <Uploader setImageUrl={setVideoUrl} type="video" />
    </div>
</div>

          {/* casts of movie */}
          <div className='w-full grid lg:grid-cols-2 gap-6 items-start'>
            <button onClick={() => setModalOpen(true)} className='w-full py-4 bg-main border border-subMain border-dashed text-white rounded'>
              Add Cast
            </button>
            <div className='grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4'>
              {casts?.length > 0 && casts?.map((user) => (
                <div key={user.id} className='p-2 italic text-xs text-text rounded flex-colo bg-main border border-border'>

                  <img src={`${user?.image ? user.image : "/images/peterImage.jpg"}`} alt={user.name} className='w-full h-24 object-cover rounded mb-2' />
                  <p>{user.name}</p>
                  <div className='flex mt-2 w-full gap-2  justify-center'>
                    <button 
                    onClick={()=>deleteCastHandler(user?.id)}
                    className='w-6 h-6 flex-colo bg-dry border border-border text-subMain rounded'>
                      <MdDelete />
                    </button>

                    <button
                      onClick={() => {
                        setCast(user)
                        setModalOpen(true)
                      }}
                      className='w-6 h-6 flex-colo bg-dry border border-border text-green-600 rounded'>
                      <FaEdit />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* submit  */}


          <button 
          
          disabled={isLoading}
          onClick={
            handleSubmit(onSubmit)
          } className='bg-subMain w-full flex items-center justify-center gap-2 transitions hover:bg-dry border border-subMain text-white py-2 px-4 rounded text-sm'>
          {
            isLoading ? "Please wait..." :<>
             <ImUpload /> Add Movie
            
            </>
          }


           
          </button>


        </div>
      </SideBar>
    </>
  )
}

export default AddMovie
