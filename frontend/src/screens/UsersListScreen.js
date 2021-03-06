import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listUsers, deleteUser} from '../actions/userAction'

const UsersListScreen = ({history}) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    useEffect(() =>{

        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            history.push('/login')
        }
        
    },[dispatch,history,userInfo, successDelete])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure')){
            dispatch(deleteUser(id))
        }
    }
    return (
        <>
           <h1>Users</h1> 
           {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:(
               <table className='table'>
                   <thead>
                       <tr>
                           <th>ID</th>
                           <th>NAME</th>
                           <th>EMAIL</th>
                           <th>Phone Number</th>
                           <th>ADMIN</th>
                           <th>SELLER</th>
                           <th></th>
                       </tr>
                   </thead>
                   <tbody>
                       {users.map(user=>(
                           <tr key={user._id}>
                               <td>{user._id}</td>
                               <td>{user.name}</td>
                               <td><a href={`mailto:${user.email}`} >{user.email}</a></td>
                               <td><a href={`tel:${user.phoneNumber}`} >{user.phoneNumber}</a></td>
                               <td>{user.isAdmin ? (<i className='fas fa-check' style ={{color: 'green'}}></i> ):
                                (    <i className='fas fa-times' style={{color: 'red'}}></i>
                               )}</td>
                               <td>{user.isSeller ? (<i className='fas fa-check' style ={{color: 'green'}}></i> ):
                                (    <i className='fas fa-times' style={{color: 'red'}}></i>
                               )}</td>
                               <td>
                                   <Link to={`/admin/user/${user._id}/edit`}>
                                   <button className='primaryBtn'><i className='fas fa-edit'></i></button>
                                   </Link>
                                   <button className = 'dangerBtn' onClick={()=> deleteHandler(user._id)}>
                                       <i className='fas fa-trash'></i>
                                   </button>
                               </td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           )}
        </>
    )
}

export default UsersListScreen
