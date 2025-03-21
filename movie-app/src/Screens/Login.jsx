import React from 'react';
import Layout from '../Layout/Layout';
import { Input } from '../Components/UsedInputs';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { LoginValidation } from '../Components/Validation/UserValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { InlineError } from '../Components/Notifications/Error';
import { loginAction } from '../Redux/Actions/userActions';
import { useEffect } from 'react';
import toast from 'react-hot-toast'

function Login() {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  const { isLoading, isError, userInfo, isSuccess } = useSelector((state) => state.userLogin);

  // Validate user
  const {
    register,
    handleSubmit,
    formState: { errors }, 
  } = useForm({
    resolver: yupResolver(LoginValidation),
  });

  //useEffect
  useEffect(()=>{

    if(userInfo?.isAdmin){
      navigate("/dashboard")

    }else if(userInfo){
      navigate("/profile")
    }

    if(isSuccess){
      toast.success(`Welcome back ${userInfo?.fullName}`)
    }
    if(isError){
      toast.error(isError);
      dispatch({type:"USER_LOGIN_RESET"})
    }
  },[userInfo,isSuccess,isError,navigate,dispatch])

  // On submit
  const onSubmit = (data) => {
    dispatch(loginAction(data))
  };

  return (
    <Layout>
      <div className='container mx-auto px-2 my-24 flex-colo'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border'
        >
          <img
            src='/images/SOUL_MOVIES_LOGO.png'
            alt='logo'
            className='w-full h-12 object-contain no-select'
            onMouseDown={(e) => e.preventDefault()}
          />
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
              label='Password'
              placeholder='*******'
              type='password'
              name='password'
              register={register('password')}
              bg={true}
            />
            {errors.password && <InlineError text={errors.password.message} />}
          </div>
          <button
            type='submit'
            className='bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full'
            disabled={isLoading}
          >
            {
              // if Loading
              isLoading ? (
                "Loading..."
              ):(<>
              <div className='flex flex-row items-center'>
              <p>Login</p>
              <FiLogIn className='ms-1' />
            </div>
              </>)
            }
            
          </button>
          <p className='text-center text-border'>
            Don't have an account?{' '}
            <Link to='/register' className='text-dryGray font-semibold ml-2'>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default Login;