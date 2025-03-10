// import {react} from 'react'
import {useSelector} from 'react-redux'
import {Navigate, Outlet} from 'react-router-dom'

//Public protection
function ProtectedRouter(){
    const {userInfo} = useSelector((state)=> state.userLogin)
    return userInfo?.token?<Outlet/> :<Navigate to="/login"/>
}

function AdminProtectedRouter(){
    const {userInfo} = useSelector((state)=>state.userLogin)
    return userInfo?.token?(
        userInfo?.isAdmin?(
            <Outlet/>

        ):(
            <Navigate to="/*"/>

        )
    ):(
        <Navigate to="/login"/>
    )
}

export {ProtectedRouter,AdminProtectedRouter}