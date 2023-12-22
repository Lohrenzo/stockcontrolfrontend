import React, { useState } from 'react';
import { TEInput, TERipple } from "tw-elements-react";

import { jwtDecode } from 'jwt-decode';

//Icons
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

// Axios
import axios from '../../apiCall/axios'

// React Router Dom
import { Link, useNavigate } from 'react-router-dom';

import { useCookies } from 'react-cookie';

// URLs
const Login_URL = "api/users/authenticate";
// const Product_URL = "api/products";
// const Category_URL = "api/categories";

const Login = ({fetchCategories, fetchProducts}) => {
    const [cookies, setCookie, removeCookie] = useCookies(["username", "authToken", "userId", "role"]);
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [type, setType] = useState('password');
    const [loginDetails, setLoginDetails] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    // const fetchProducts = async () => {
    //     try {
    //       const response = await axios.get(Product_URL);
    //       console.log(JSON.stringify(response?.data));
    //       setProducts(response?.data || []);
    //       console.log("Fetched Products");
    //     } catch (error) {
    //       console.error('Error fetching products:', error);
    //       setProducts([]);
    //     }
    // };
    
    // const fetchCategories = async () => {
    //     try {
    //       const response = await axios.get(Category_URL);
    //       console.log(JSON.stringify(response?.data));
    //       setCategories(response?.data || []);
    //       console.log("Fetched Categories");
    //     } catch (error) {
    //       console.error('Error fetching categories:', error);
    //     }
    // };
    
    // Username Change Function
    function handleUsernameChange(e) {
        setLoginDetails({
            ...loginDetails, // Copy the old fields
            username: e.target.value // But override this one
        });
    }

    // Password Change Function
    function handlePasswordChange(e) {
        setLoginDetails({
            ...loginDetails, // Copy the old fields
            password: e.target.value // But override this one
        });
    }

    const loginRequest = async () => {
        try {
            const response = await axios.post(Login_URL, loginDetails);
            
            if (response.status === 200) {
                const authToken = response.headers.authorization.substring(7);
                console.log('authToken:', authToken);

                try {
                    const decodedToken = jwtDecode(authToken);
                    navigate("/");
                    
                    // Convert the expiration time to milliseconds
                    const expires = new Date(decodedToken.exp * 1000);

                    // Set cookies with the correct expiration time
                    setCookie('authToken', authToken, { path: '/', expires });
                    setCookie('username', response.data.username, { path: '/', expires });
                    setCookie('userId', response?.data.userId, { path: '/', expires });
                    setCookie('role', response?.data.role, { path: '/', expires });

                    fetchCategories();
                    fetchProducts();
                }
                catch (tokenError) {
                    console.error('Error decoding token:', tokenError);
                }

            }
        } catch (error) {
            console.error('Error logging in: ', error);
        }
    };
    
    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            await loginRequest();
        } catch {
            console.log("Login Error");
        }
        window.location.reload();
    };

    const handleShowPassword = () => {
        setType(type === 'password' ? 'text' : 'password');
    }
    
    return (
        <section className="bg-gray-50 dark:bg-gray-900 h-screen flex items-center justify-center">
                <div className="rounded-lg p-6 xl:w-[35%] lg:w-[40%] md:w-[60%] sm:w-[70%] w-[80%] shadow-lg dark:border dark:bg-gray-800 dark:border-gray-700">
                        <h1 className="text-xl mb-10 text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <TEInput
                                type="text"
                                label="Username"
                                className="mb-4 h-[35px]"
                                onChange={handleUsernameChange}
                                required
                            ></TEInput>
                                    
                            <div className='grid grid-cols-1 w-full h-[35px] relative'>
                                {/* <!--Password input--> */}
                                <TEInput
                                    type={type}
                                    label="Password"
                                    className="mb-4 w-full h-[35px]"
                                    onChange={handlePasswordChange}
                                    required
                                ></TEInput>
                                <span className="flex justify-center items-center absolute cursor-pointer pr-1 right-0 inset-y-0 text-[1.6rem] text-gray-500 dark:text-gray-300" onClick={handleShowPassword}>
                                    {type === "password" ? <IoMdEye /> : <IoMdEyeOff />}
                                </span>
                            </div><br />
                            {/* <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <Link to="" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                            </div> */}
                            <TERipple rippleColor='success' className="w-full h-fit max-h-fit">
                                <button type='submit' disabled={loginDetails.username.length === 0 || loginDetails.password.length === 0} onClick={handleLogin} className="block w-full rounded disabled:opacity-50 bg-primary px-6 pb-2 pt-2.5 text-xs text-center font-medium uppercase leading-normal text-white hover:text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                    Sign in
                                </button>
                            </TERipple>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                </div>
        </section>
    )
}

export default Login;