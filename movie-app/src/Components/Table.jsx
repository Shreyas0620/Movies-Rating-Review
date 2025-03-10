import React from 'react'
import { FaCloudDownloadAlt, FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GoEye } from 'react-icons/go'


const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3 ";


//////****** Rows*******////////

const Rows = (movie, i,onDeleteHandler, admin) => {
    return (
        <tr key={i}>
            <td className={`${Text}`}>
                <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>
                    <img src={movie?.image?movie?.image:"/images"} className='h-full w-full object-cover' alt={movie?.name} />
                </div>
            </td>
            <td className={`${Text} truncate`}>
                {movie.name}
            </td>
            <td className={`${Text}`}>
                {movie.category}
            </td>
            <td className={`${Text}`}>
                {movie.language}
            </td>
            <td className={`${Text}`}>
                {movie.year}
            </td>
            <td className={`${Text}`}>
                {movie.time}hr
            </td>
            <td className={`${Text} flex items-center gap-2`}>

                {
                    admin  ? (
                        <>
                            <Link to={`/edit/${movie?._id}`}
                            className='border border-border bg-dry flex items-center gap-2 text-border rounded py-1  px-2'>
                                Edit <FaEdit className='text-green-400' />
                            </Link>
                            <button 
                            onClick={()=>onDeleteHandler(movie?._id)}
                            className='bg-subMain text-white rounded flex-colo w-6 h-6'>
                                <MdDelete />
                            </button>

                        </>
                    ) :
                        (
                            <>
                                <button className='border border-border bg-dry flex items-center gap-2 text-border rounded py-1  px-2'>
                                    Download <FaCloudDownloadAlt className='text-green-400' />
                                </button>
                                <Link to={`/movies/${movie?._id}`} className='bg-subMain text-white rounded flex-colo w-6 h-6'>
                                    <GoEye />
                                </Link>
                            </>

                        )
                }


            </td>
        </tr>
    )

}


//////****** Table*******////////

function Table({ data, onDeleteHandler, admin  }) {

    return (
        <div className='overflow-x-auto w-full'>
            <div className='min-w-max'>
                <table className='w-full table-auto border border-border divide-y divide-border'>
                    <thead >
                        <tr className='bg-dryGray'>
                            <th scope='col' className={`${Head}`}>
                                Image
                            </th>
                            <th scope='col' className={`${Head}`}>
                                Name
                            </th>
                            <th scope='col' className={`${Head}`}>
                                Category
                            </th>
                            <th scope='col' className={`${Head}`}>
                                Language
                            </th>
                            <th scope='col' className={`${Head}`}>
                                Years
                            </th>
                            <th scope='col' className={`${Head} `}>
                                Hours
                            </th>
                            <th scope='col' className={`${Head} text-end`}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-main divide-y divide-y-800'>
                        {
                            data.map((movie, i,) => Rows(movie, i, onDeleteHandler, admin))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table
