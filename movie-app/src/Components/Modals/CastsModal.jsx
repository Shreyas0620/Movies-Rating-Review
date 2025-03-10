import React, { useEffect, useState } from 'react'
import MainModal from './MainModal'
import { Input } from '../UsedInputs'
import Uploader from '../Uploader'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { addCastAction, updateCastAction } from '../../Redux/Actions/MoviesActions'
import toast from 'react-hot-toast'
import { InlineError } from '../Notifications/Error'
import { Imagepreview } from '../Imagepreview'

function CastsModal({ modalOpen, setModalOpen, cast }) {

    const dispatch = useDispatch()
    const [castImage, setCastImage] = useState("");
    const generateId = Math.floor(Math.random() * 100000000)

    const image = castImage ? castImage : cast?.image
    // validate movie
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }, // Corrected to `errors` instead of `error`
    } = useForm(
        yup.object().shape({
            name: yup.string().required("Cast Name is required")
        })
    )




    // On submit
    const onSubmit = (data) => {
        //if cast is not null then update cast
        if (cast) {
            dispatch(updateCastAction({
                ...data, image: image,
                id: cast.id,
            }))
            toast.success("Cast updated successfully")
        } else {
            //else create cast
            dispatch(addCastAction({
                ...data,
                image: image,
                id: generateId
            }))
            toast.success("Cast created successfully")
        }
        reset()
        setCastImage("")
        setModalOpen(false)

    };

    useEffect(() => {
        if (cast) {
            setValue("name", cast?.name)
        }
    }, [cast, setValue])

    return (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className='inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto  h-full bg-main text-white rounded-2xl'>
                <h2 className='text-3xl font-bold text-white'>{cast ? "Update Cast" : "Create Cast"}</h2>
                <form onSubmit={
                    handleSubmit(onSubmit)
                } className='flex flex-col gap-6 text-left mt-6 '>
                    <div className='w-full'>
                        <Input
                            className='mb-2'
                            label='Cast name'
                            placeholder='Enter Real name of Cast'
                            name='name'
                            register={register('name')}
                            type='text'
                            bg={true}
                        />
                        {errors.name && <InlineError text={errors.name.message} />}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='text-border font-semibold text-sm'>
                            Cast Image
                        </p>
                        <Uploader setImageUrl={setCastImage} />
                        <Imagepreview image={
                            image ? image : "/images/peterImage.jpg" 
                        }name="castImage" />
                    </div>

                    <button
                    type='submit'
                        onClick={() => setModalOpen(false)}
                        className='w-full flex-colo py-3 text-lg transitions hover:bg-transparent  border-2 border-subMain rounded bg-subMain text-white'>
                        {
                            cast ? "Update" : "Add"
                        }

                    </button>
                </form>
            </div>
        </MainModal>
    )
}

export default CastsModal