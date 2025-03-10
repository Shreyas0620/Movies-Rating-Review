import React from 'react'
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { DateFormat, shortUppercaseId } from './Notifications/Empty';



const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3 ";


//////****** Rows*******////////

const Rows = ({data, i, users , onEditFunction ,onDeleteFunction}) => {
  return (
    <tr>
      {/* { users } */}
      {users ? (
        <>
          <td className={`${Text}`}>
            <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
              <img
                src={`${data?.image ? data.image : "users.png"}`}
                className="h-full w-full object-cover"
                alt={data?.fullName}
              />
            </div>
          </td>
          <td className={`${Text}`}>{data?._id ? shortUppercaseId(data?._id) : "2R75T8"}</td>
          <td className={`${Text}`}>{DateFormat(data?.createAt)}</td>
          <td className={`${Text}`}>{data?.fullName}</td>
          <td className={`${Text}`}>{data?.email}</td>
          <td className={`${Text}`}>{data?.isAdmin ? "Admin":"User"}</td>
          <td className={`${Text} float-right flex-row gap-2`}>
            {
              !data?.isAdmin && <div className="flex items-center gap-2">
              <button onClick={()=>onDeleteFunction(data?._id)} className="bg-subMain text-white rounded flex-colo w-6 h-6">
                <MdDelete />
              </button>
            </div>
            }
            
          </td>
        </>
      ) : (
        // categories
        <>
          <td className={`${Text} font-bold`}> <td className={`${Text}`}>{data?._id ? shortUppercaseId(data?._id) : "2R75T8"}</td></td>
          <td className={`${Text}`}>{DateFormat(data?.createAt)}</td>
          <td className={`${Text}`}>{data.title}</td>
          <td className={`${Text} float-right flex-row gap-2`}>
            <div className="flex items-center gap-2">
              <button onClick={()=>onEditFunction(data)} className="border border-border bg-dry flex items-center gap-2 text-border rounded py-1 px-2">
                Edit <FaEdit className="text-green-400" />
              </button>
              <button onClick={()=>onDeleteFunction(data?._id)} className="bg-subMain text-white rounded flex-colo w-6 h-6">
                <MdDelete />
              </button>
            </div>
          </td>
        </>
      )}
    </tr>
  );
};


//////****** Table*******////////

function Table2({ data, users , onEditFunction,onDeleteFunction }) {

  return (
    <div className='overflow-x-auto w-full'>
      <div className='min-w-max'>
        <table className='w-full table-auto border border-border divide-y divide-border'>
          <thead >
            <tr className='bg-dryGray'>
              {users ? (
                <>
                  <th scope='col' className={`${Head}`}>
                    Image
                  </th>
                  <th scope='col' className={`${Head}`}>
                    Id
                  </th>
                  <th scope='col' className={`${Head}`}>
                    Date
                  </th>
                  <th scope='col' className={`${Head}`}>
                    Full Name
                  </th>
                  <th scope='col' className={`${Head}`}>
                    Email
                  </th>
                  <th scope='col' className={`${Head}`}>
                    Role
                  </th>
                </>
              ) : (
                <>
                  <th scope='col' className={`${Head}`}>
                    Id
                  </th>
                  <th scope='col' className={`${Head}`}>
                    Date
                  </th>
                  <th scope='col' className={`${Head}`}>
                    Name
                  </th>
                </>
              )}
              <th scope='col' className={`${Head} text-end`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-main divide-y divide-y-800'>
            {data.map((data, i,) => <Rows key={i} data={data} users={users} onEditFunction={onEditFunction} onDeleteFunction={onDeleteFunction}/>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table2;
