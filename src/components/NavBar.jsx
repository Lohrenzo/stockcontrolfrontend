import React, { useEffect, useState } from 'react'

// Reacr Router Dom
import { Link, useLocation } from 'react-router-dom';

// React-cookie
import { useCookies } from "react-cookie";

// Icons
import { MdSearch } from "react-icons/md";

const NavBar = ({setAddNewPopUp, handleSearchChange, searchKeyword, getCookie, userIdCookie, setUserIdCookie, usernameCookie, setUsernameCookie, roleCookie, setRoleCookie, setAuthTokenCookie}) => {
    const [cookies, removeCookie] = useCookies(["username", "userId", "authToken", "role"]);
    const location = useLocation();

    // const [usernameCookie, setUsernameCookie] = useState(null);
    // const [roleCookie, setRoleCookie] = useState(null);
    // const [authTokenCookie, setAuthTokenCookie] = useState(null);

    const handleLogout = () => {
        removeCookie("username");
        removeCookie("role");
        removeCookie("authToken");
        removeCookie("userId");

        setUsernameCookie(null);
        setRoleCookie(null);
        setAuthTokenCookie(null);
        setUserIdCookie(null);

        window.location.reload();
    }

    // useEffect(() => {
    //     setUsernameCookie(getCookie("username"));
    //     setRoleCookie(getCookie("role"));
    //     setAuthTokenCookie(getCookie("authToken"));
    // }, [])

    return (
        <nav className='fixed top-0 w-[100vw] z-20 px-4 py-7 text-white shadow shadow-black/50 dark:bg-[#1A3661] bg-[#285192]'>
            <div className="flex justify-between items-center gap-x-9">
                <Link className='text-white hover:text-slate-300 transition-all duration-200' to="/">
                    Lo'Renzo
                </Link>

                {location.pathname === '/' && ( // Render search input only on the homepage
                    <div className='relative flex items-center justify-center w-[50%]'>
                        <input
                            onChange={handleSearchChange}
                            value={searchKeyword}
                            className='px-2 bg-gray-50 placeholder-gray-600 text-gray-900 sm:text-sm rounded-lg focus:bg-[#d5d5d5ad] outline-none focus:outline-none w-full transition-all duration-100 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:bg-[#2b2e32ad] dark:focus:outline-none h-[35px]'
                            placeholder='Search By Description'
                        />
                        <MdSearch className='absolute right-2 opacity-70 text-[1.6rem] text-gray-500 dark:text-gray-300' />
                    </div>
                )}
                {/* <div className='relative flex items-center justify-center w-[50%]'>
                    <input onChange={handleSearchChange} value={searchKeyword} className='px-2 bg-gray-50 placeholder-gray-600 text-gray-900 sm:text-sm rounded-lg focus:bg-[#d5d5d5ad] outline-none focus:outline-none w-full transition-all duration-100 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:bg-[#2b2e32ad] dark:focus:outline-none h-[35px]' placeholder='Search By Description' />
                    <MdSearch className='absolute right-2 opacity-70 text-[1.6rem] text-gray-500 dark:text-gray-300' />
                </div> */}

                {/* {usernameCookie !== (null || "undefined") && <Link className='text-white hover:text-slate-300 transition-all duration-200' to={`/profile/${userIdCookie}`}><p>{usernameCookie !== (null || "undefined") && `Hello ${usernameCookie}`}</p></Link>} */}
                {!usernameCookie ? "" : <Link className='text-white hover:text-slate-300 transition-all duration-200' to={`/profile/${userIdCookie}`}><p>{usernameCookie !== (null || "undefined") && `Hello ${usernameCookie}`}</p></Link>}

                <div className="flex gap-3">
                    {/* {roleCookie == (null || "undefined") ? */}
                    {!roleCookie|| roleCookie == (null || "undefined") ?
                        <Link to="/login" className='text-white hover:text-white'>
                            <button title='Login' className='capitalize dark:text-white dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-1 dark:focus:outline-none dark:focus:ring-primary-300 font-medium text-center bg-[#081220] hover:bg-[#1b2637] focus:ring-[#081220]'>
                                Login
                            </button>
                        </Link> :
                        <button onClick={handleLogout} title='Logout' className='capitalize dark:text-white dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-1 dark:focus:outline-none dark:focus:ring-primary-300 font-medium text-center bg-[#081220] hover:bg-[#1b2637] focus:ring-[#081220]'>
                            Logout
                        </button>
                    }
                    {roleCookie === "ADMIN" && 
                        <button title='Add A New Product' className='capitalize text-white bg-primary-600 hover:bg-primary-700 focus:ring-1 focus:outline-none focus:ring-primary-300 font-medium text-center hover:text-[#081220] hover:border-[#081220] dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800' onClick={() => setAddNewPopUp(true)}>Add New Product</button>
                    }
                </div>
            </div>
        </nav>
    )
}

export default NavBar;