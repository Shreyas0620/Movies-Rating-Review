import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import Uploader from '../../Components/Uploader';
import { Input } from '../../Components/UsedInputs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Uncomment this line
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ProfileValidation } from '../../Components/Validation/UserValidation';
import { InlineError } from '../../Components/Notifications/Error';
import { Imagepreview } from '../../Components/Imagepreview';
import { deleteProfileAction, updateProfileAction } from '../../Redux/Actions/userActions';
import toast from 'react-hot-toast';
// import { USER_DELETE_PROFILE_RESET } from '../../Redux/Constants/userConstants';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Uncomment this line

  // Redux state
  const { userInfo } = useSelector((state) => state.userLogin);
  const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : '');
  const { isLoading, isError, isSuccess } = useSelector((state) => state.userUpdateProfile);
  const { isLoading: deleteLoading, isError: deleteError } = useSelector((state) => state.userDeleteProfile);

  // Update imageUrl when userInfo is available
  useEffect(() => {
    if (userInfo) {
      setImageUrl(userInfo.image || '');
    }
  }, [userInfo]);

  // Validate user
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation),
    defaultValues: {
      fullName: userInfo?.fullName || '',
      email: userInfo?.email || '',
    },
  });

  // Update Profile
  const onSubmit = (data) => {
    dispatch(updateProfileAction({ ...data, image: imageUrl }));
  };

  // Delete Profile
  const deleteProfile = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      dispatch(deleteProfileAction()).then(() => {
        // Navigate to login page after deletion
        navigate('/login');
      });
    }
  };

  // Set form values when userInfo is available
  useEffect(() => {
    if (userInfo) {
      setValue('fullName', userInfo.fullName);
      setValue('email', userInfo.email);
    }
    if (isSuccess) {
      dispatch({ type: 'USER_UPDATE_PROFILE_RESET' });
    }
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({ type: 'USER_UPDATE_PROFILE_RESET' });
      dispatch({ type: "USER_DELETE_PROFILE_RESET" });
    }
  }, [userInfo, setValue, isSuccess, isError, dispatch, deleteError]);

  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <div className="w-full grid lg:grid-cols-12 gap-6">
          <div className="col-span-10">
            <Uploader setImageUrl={setImageUrl} />
          </div>
          {/* Image preview */}
          <div className="col-span-2">
            <Imagepreview image={imageUrl} name={userInfo?.fullName || 'Your image'} />
          </div>
        </div>
        <div className="w-full">
          <Input
            label="FullName"
            placeholder="Enter your name"
            name="fullName"
            type="text"
            bg={true}
            register={register('fullName')}
          />
          {errors.fullName && <InlineError text={errors.fullName.message} />}
        </div>

        <div className="w-full">
          <Input
            label="Email"
            placeholder="123@example.com"
            type="email"
            name="email"
            bg={true}
            register={register('email')}
          />
          {errors.email && <InlineError text={errors.email.message} />}
        </div>

        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            onClick={deleteProfile}
            disabled={deleteLoading || isLoading}
            className="bg-subMain transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {deleteLoading ? 'Deleting...' : 'Delete Account'}
          </button>
          <button disabled={deleteLoading || isLoading} className="bg-main transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </SideBar>
  );
}

export default Profile;