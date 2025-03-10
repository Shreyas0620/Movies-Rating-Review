import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import { Input } from '../Components/UsedInputs'
import { Link, useNavigate } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import { InlineError } from '../Components/Notifications/Error'
import toast from 'react-hot-toast'
import { registerAction } from '../Redux/Actions/userActions'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterValidation } from '../Components/Validation/UserValidation'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

function Register () {

  const dispatch = useDispatch(); // Will be used later for Redux actions
  const navigate = useNavigate(); // Will be used later for navigation

  // Redux state (unused for now, but will be used later)
  const { isLoading, isError, userInfo, isSuccess } = useSelector((state) => state.userRegister);

  // Validate user
  const {
    register,
    handleSubmit,
    formState: { errors }, // Corrected to `errors` instead of `error`
  } = useForm({
    resolver: yupResolver(RegisterValidation),
  });

  //useEffect
  useEffect(()=>{

    if(userInfo?.isAdmin){
      navigate("/dashboard")

    }else if(userInfo){
      navigate("/profile")
    }

    if(isSuccess){
      toast.success(`Welcome ${userInfo?.fullName}`)
      dispatch({type:"USER_REGISTER_RESET"})
    }
    if(isError){
      toast.error(isError);
      dispatch({type:"USER_REGISTER_RESET"})
    }
  },[userInfo,isSuccess,isError,navigate,dispatch])

  // On submit
  const onSubmit = (data) => {
    dispatch(registerAction(data))
  };

  return (
    <Layout>
      <div className='container mx-auto px-2 my-24 flex-colo'>
        <form  onSubmit={handleSubmit(onSubmit)} className='w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border'>
          <img
            src='/images/SOUL_MOVIES_LOGO.png'
            alt='logo'
            className='w-full h-12 object-contain no-select'
            onMouseDown={(e) => e.preventDefault()}
          />
          <div className='w-full'>
                      <Input
                        className='mb-2'
                        label="Full Name" placeholder="Enter your name" type='name' bg={true} name="fullName" register={register("fullName")}
                      />
                      {errors.fullName && <InlineError text={errors.fullName.message} />}
                    </div>
          
          
          <div className='w-full'>
                      <Input
                        className='mb-2'
                        label='Email'
                        placeholder='123@example.com'
                        name='email'
                        register={register('email')}
                        type='email'
                        bg={true}
                      />
                      {errors.email && <InlineError text={errors.email.message} />}
                    </div>

                    <div className='w-full'>
                      <Input
                        className='mb-2'
                        label="Password" placeholder="*******" type='password' bg={true} name="password"
                        register={register("password")}
                      />
                      {errors.password && <InlineError text={errors.password.message} />}
                    </div>

          <button 
          type="submit"
          disabled={isLoading} className='bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full'>
            <div className='flex flex-row items-center'>

               {
                            // if Loading
                            isLoading ? (
                              "Loading..."
                            ):(<>
                            <div className='flex flex-row items-center'>
                            <p>Sign up</p>
                            <FiLogIn className='ms-1' />
                          </div>
                            </>)
                          }
                          
            </div>
          </button>
          <p className='text-center text-border'>
            Already have an account? {" "}
            <Link to='/login' className='text-dryGray font-semibold ml-2'>LogIn</Link>
          </p>
        </form>
      </div>
    </Layout>
  )
}

export default Register;
