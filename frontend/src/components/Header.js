import React from 'react'
import {Link, Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../actions/userAction'
import SearchBox from './SearchBox'


const Header = () => {
    
    const dispatch = useDispatch()
    const userLogin= useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const logoutHandler = () =>{
        dispatch(logout())
    }

    const navbarToggle = () =>{
        const navbar = document.getElementById("navbar");
        const navbarToggle = navbar.querySelector(".navbar-toggle");

        function openMobileNavbar() {
        navbar.classList.add("opened");
        navbarToggle.setAttribute("aria-label", "Close navigation menu.");
        }

        function closeMobileNavbar() {
        navbar.classList.remove("opened");
        navbarToggle.setAttribute("aria-label", "Open navigation menu.");
        }

        
        if (navbar.classList.contains("opened")) {
            closeMobileNavbar();
        } else {
            openMobileNavbar();
        }
        
        const navbarLinksContainer = navbar.querySelector(".navbar-links");
        navbarLinksContainer.addEventListener("click", closeMobileNavbar);
    }

    return (
        <>

        <header id="navbar">
            <nav className="navbar-container ">
            <Link to="/" className="home-link">
                <div className="navbar-logo"></div>
                E-shop
            </Link>
            <button type="button" className="navbar-toggle" onClick={navbarToggle} aria-label="Open navigation menu">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <div className="navbar-menu">
                <ul className="navbar-links">
                    <li className='navbar-item'><Route render={({history})=><SearchBox history={history}/>}/></li>
                <li className="navbar-item"><Link className="navbar-link" to='/cart'><i className= 'fas fa-shopping-cart'> </i>Cart</Link></li>
                
                {userInfo && userInfo.isAdmin &&(
                <li className="navbar-item dropDown">
                    <Link to=''className='navbar-link'>Admin<i className="fas fa-angle-down"></i></Link> 
                        <div className="dropDown-content">
                            <Link  to="/admin/userlist">Users</Link>
                            <Link  to="/admin/productlist">Products</Link>
                            <Link  to="/admin/orderlist">Orders</Link>
                        </div>
                                          
                </li>
                 )}

                {userInfo && userInfo.isSeller &&(
                <li className="navbar-item dropDown">
                    <Link to=''className="navbar-link">Seller<i className="fas fa-angle-down"></i></Link>
                        <div className="dropDown-content">
                            <Link  to={`/seller/${userInfo._id}/productlist`}>Products</Link>
                            <Link  to={`/seller/${userInfo._id}/orderlist`}>Orders</Link>
                        </div>
                </li>
                )}

                {userInfo ? (
                <li className="navbar-item dropDown">
                    <Link to=''className=" navbar-link ">{userInfo.name}<i className="fas fa-angle-down"></i></Link>
                        <div className="dropDown-content">
                            <Link  to='/profile'><i className="fas fa-user-circle"></i>Profile</Link>
                            <Link  to='' onClick={logoutHandler}><i className="fas fa-sign-out-alt"></i>Logout</Link>
                        </div>
                    
                </li>
                ):
                <Link className="navbar-link" to='/login'><i className= 'fas fa-user'> </i>Sign In</Link> 
            }   
                </ul>
            </div>
            </nav>
        </header>
        
        </>
    )
    
}

export default Header
