import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import { Input, Message, Select } from '../../../Components/UsedInputs'
import Uploader from '../../../Components/Uploader'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { ImUpload } from 'react-icons/im'
import CastsModal from '../../../Components/Modals/CastsModal'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { movieValidation } from '../../../Components/Validation/MovieValidation'
import { getMovieByIdAction, removeCastAction, updateMovieAction } from '../../../Redux/Actions/MoviesActions'
import toast from 'react-hot-toast'
import { InlineError } from '../../../Components/Notifications/Error'
import { Imagepreview } from '../../../Components/Imagepreview'
import Loader from '../../../Components/Notifications/Loader'
import { RiMovie2Line } from 'react-icons/ri'


function EditMovie() {
    const sameClass ="w-full gap-6 flex-col min-h-screen"
  const [modalOpen, setModalOpen] = useState(false)
  const [cast, setCast] = useState(null)
  const [imageWithoutTitle, setImageWithoutTitle] = useState("")
  const [imageTitle, setImageTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  //Use Selector

  const { categories } = useSelector((state) => state.categoryGetAll)

  const { isLoading, isError, movie } = useSelector((state) => state.getMovieById);
  const {  isError:editError, isSuccess } = useSelector((state) => state.updateMovie);

  const { casts } = useSelector((state) => state.casts);

  // validate movie
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(movieValidation),
  });



  // On submit
  const onSubmit = (data) => {
    dispatch(updateMovieAction(movie?._id,
      {
        ...data,
        image:imageWithoutTitle,
        titleImage:imageTitle,
        video:videoUrl,
        casts:casts.length > 0 ?casts:movie?.casts,
      }
    ))
  
  };


  // delete cast handler

  const deleteCastHandler = (id) => {
    dispatch(removeCastAction(id))
    toast.success("Cast deleted Successfully")
  }




  useEffect(() => {
    if(movie?._id !== id){
        dispatch(getMovieByIdAction(id))
    }else{
        setValue("name",movie?.name)
        setValue("time",movie?.time)
        setValue("language",movie?.language)
        setValue("year",movie?.year)
        setValue("category",movie?.category)
        setValue("desc",movie?.desc)
        setImageWithoutTitle(movie?.image);
        setImageTitle(movie?.titleImage);
        setVideoUrl(movie?.video);
    }

    // if modal is false then reset cast

    if (modalOpen === false) {
      setCast()
    }

    //if its success then reset form and navigate to addMovie
    if (isSuccess) {
    
      dispatch({ type: "UPDATE_MOVIE_RESET" })
      navigate(`/edit/${id}`)
    }

    // if error then show
    if (editError) {
      toast.error("Something went wrong");
      dispatch({ type: "UPDATE_MOVIE_RESET" })
    }

  }, [dispatch,id,movie,modalOpen,setValue,isSuccess,editError,navigate])



  return (
    <>

      <SideBar>
        <CastsModal modalOpen={modalOpen} setModalOpen={setModalOpen} cast={cast} />
        {isLoading ? (
          <Loader />
    
      ) : isError ? (
        <div className={sameClass}>
          <div className='flex items-center justify-center w-24 h-24 p-5 rounded-full bg-dry text-subMain text-4xl mb-4'>
            <RiMovie2Line />
          </div>
          <p className='text-border text-sm'>Something went wrong</p>
        </div>):(

       
        <div className='flex flex-col gap-6'>
          <h2 className='text-xl font-bold'>Edit "{movie?.name}"</h2>
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
            <div className='w-full'>

            <button onClick={() => setModalOpen(true)} className='w-full py-4 bg-main border border-subMain border-dashed text-white rounded'>
              Add Cast
            </button>
            <span className='text-border text-sm'>
            If you add new casts, the previous ones will be deleted. Therefore, you should add all of them again.
            </span>
            </div>
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
            isLoading ? "Updating..." :<>
             <ImUpload /> Update Movie
            
            </>
          }


           
          </button>


        </div>   
        )}
      </SideBar>
    </>
  )
}

export default EditMovie
