import React, { useEffect, useState } from 'react'

import { TEInput, TERipple } from "tw-elements-react";

import { jwtDecode } from 'jwt-decode';

// Axios
import axios from '../../apiCall/axios';

// React Router Dom
import { Link, useNavigate } from 'react-router-dom';

import { useCookies } from 'react-cookie';

//Icons
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

// URLs
const CustomerSignUp_URL = "api/users/customer/signup";
const Login_URL = "api/users/authenticate";

const SignUpCustomer = ({fetchCategories, fetchProducts}) => {
    const [cookies, setCookie, removeCookie] = useCookies(["username", "authToken", "userId", "role"]);
    const navigate = useNavigate();
    const [type, setType] = useState('password');
    const [type2, setType2] = useState('password');

    const handleShowPassword = () => {
        setType(type === 'password' ? 'text' : 'password');
    }

    const handleShowPassword2 = () => {
        setType2(type2 === 'password' ? 'text' : 'password');
    }

    const [signUpDetails, setSignUpDetails] = useState({
        email: "",
        username: "",
        businessName: "",
        phoneNumber: "",
        password: "",
        role: "CUSTOMER",
        // address: {
        //     addressLine1: "",
        //     addressLine2: "",
        //     city: "",
        //     county: "",
        //     postCode: "",
        //     country: ""
        // }
    });

    const [address, setAddress] = useState({
        addressLine1: "",
        addressLine2: "",
        city: "",
        county: "",
        postCode: "",
        country: ""
    })

    // Email Change Function
    function handleEmailChange(e) {
        setSignUpDetails({
            ...signUpDetails, // Copy the old fields
            email: e.target.value // But override this one
        });
    }

    // Username Change Function
    function handleUsernameChange(e) {
        setSignUpDetails({
            ...signUpDetails, // Copy the old fields
            username: e.target.value // But override this one
        });
    }

    // Username Change Function
    function handleBusinessNameChange(e) {
        setSignUpDetails({
            ...signUpDetails, // Copy the old fields
            businessName: e.target.value // But override this one
        });
    }

    // Phone Number Change Function
    function handlePhoneNumberChange(e) {
        setSignUpDetails({
            ...signUpDetails, // Copy the old fields
            phoneNumber: e.target.value // But override this one
        });
    }

    // Password Change Function
    function handlePasswordChange(e) {
        setSignUpDetails({
            ...signUpDetails, // Copy the old fields
            password: e.target.value // But override this one
        });
    }

    // Address Line 1 Change Function
    function handleAddressLine1Change(e) {
        setAddress({
            ...address, // Copy the old fields
            addressLine1: e.target.value // But override this one
        });
    }

    // Address Line 2 Change Function
    function handleAddressLine2Change(e) {
        setAddress({
            ...address, // Copy the old fields
            addressLine2: e.target.value // But override this one
        });
    }


    // City Change Function
    function handleCityChange(e) {
        setAddress({
            ...address, // Copy the old fields
            city: e.target.value // But override this one
        });
    }

    // County Change Function
    function handleCountyChange(e) {
        setAddress({
            ...address, // Copy the old fields
            county: e.target.value // But override this one
        });
    }

    // Post Code Change Function
    function handlePostCodeChange(e) {
        setAddress({
            ...address, // Copy the old fields
            postCode: e.target.value // But override this one
        });
    }

    // Country Change Function
    function handleCountryChange(e) {
        setAddress({
            ...address, // Copy the old fields
            country: e.target.value // But override this one
        });
    }

    useEffect(() => {
        signUpDetails.address = address;
    }, [address])

    useEffect(() => {
        console.log(signUpDetails);
    }, [signUpDetails])
    
    const signUpRequest = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                CustomerSignUp_URL, 
                signUpDetails
            );

            if (response.status === 200) {
                const loginResponse = await axios.post(Login_URL, {
                    username: signUpDetails.username,
                    password: signUpDetails.password
                });

                if (loginResponse.status === 200) {
                    const authToken = loginResponse.headers.authorization.substring(7);
                    console.log('authToken:', authToken);

                    try {
                        const decodedToken = jwtDecode(authToken);

                        // Convert the expiration time to milliseconds
                        const expires = new Date(decodedToken.exp * 1000);

                        // Set cookies with the correct expiration time
                        setCookie('authToken', authToken, { path: '/', expires });
                        setCookie('username', loginResponse.data.username, { path: '/', expires });
                        setCookie('userId', loginResponse?.data.userId, { path: '/', expires });
                        setCookie('role', loginResponse?.data.role, { path: '/', expires });

                        fetchCategories();
                        fetchProducts();
                        // navigate("/");

                        // Refresh the page
                        // location.reload();
                        location.refresh("/");
                    }
                    catch (tokenError) {
                        console.error('Error decoding token:', tokenError);
                    }
                } 
                else {
                    console.log("Error Logging In: ", loginResponse.statusText);
                }  
            }
        } 
        catch (error) {
            console.error("Error: ", error);
        }
    }

    const isFormValid = () => {
        const {
            username,
            email,
            phoneNumber,
            password,
            businessName,
            address: { addressLine1, city, county, postCode, country }
        } = signUpDetails;

        return (
            username &&
            email &&
            phoneNumber &&
            password &&
            businessName &&
            addressLine1 &&
            city &&
            county &&
            postCode &&
            country
        );
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 w-[100vw] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center mt-20 py-8 mx-auto w-[100vw] border-4">
                {/* <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    Sign Up
                </div> */}
                <div className="lg:w-[50%] md:w-[60%] w-[80%] bg-white rounded-lg shadow dark:border xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Register With Us
                        </h1>
                        <form className="space-y-4 md:space-y-6 text-black" onSubmit={signUpRequest}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-slate-500 text-[0.8rem] font-medium">Email: <span className='text-[red] text-[1.2rem]'>*</span></label>
                                <input onChange={handleEmailChange} type="email" name="email" id="email" className="mb-4 w-full p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200" required />
                            </div>

                            <div>
                                <label htmlFor="username" className="block mb-2 text-slate-500 text-[0.8rem] font-medium">Username: <span className='text-[red] text-[1.2rem]'>*</span></label>
                                <input onChange={handleUsernameChange} type="text" name="username" id="username" className="mb-4 w-full p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200" required />
                            </div>

                            <div>
                                <label htmlFor="businessName" className="block mb-2 text-slate-500 text-[0.8rem] font-medium">Business Name: <span className='text-[red] text-[1.2rem]'>*</span></label>
                                <input onChange={handleBusinessNameChange} type="text" name="businessName" id="businessName" className="mb-4 w-full p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200" required />
                            </div>

                            <div>
                                <label htmlFor="phoneNumber" className="block mb-2 text-slate-500 text-[0.8rem] font-medium">Phone Number: <span className='text-[red] text-[1.2rem]'>*</span></label>
                                <input onChange={handlePhoneNumberChange} type="number" name="phoneNumber" id="phoneNumber" className="mb-4 w-full p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200" required />
                            </div>

                            <div className=''>
                                <label htmlFor="password" className="block mb-2 text-slate-500 text-[0.8rem] font-medium">Password: <span className='text-[red] text-[1.2rem]'>*</span></label>
                                <div className="relative mb-4">
                                    <input onChange={handlePasswordChange} type={type} name="password" id="password" placeholder="••••••••" className="w-full p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200" required />
                                    <span className="flex justify-center items-center cursor-pointer pr-1 absolute right-0 inset-y-0 text-[1.6rem] text-gray-500 dark:text-gray-300" title={type === "password" ? "Show Password" : "Hide Password"} onClick={handleShowPassword}>
                                        {type === "password" ? <IoMdEye /> : <IoMdEyeOff />}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password2" className="block mb-2 text-slate-500 text-[0.8rem] font-medium">Confirm Password: <span className='text-[red] text-[1.2rem]'>*</span></label>
                                <div className="relative mb-4">
                                    {/* <input type={type} name="password" id="password" placeholder="••••••••" className="w-full p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200" required /> */}
                                    <input type={type2} name="password2" id="password2" placeholder="••••••••" className="w-full p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200" required />
                                    <span className="flex justify-center items-center cursor-pointer pr-1 absolute right-0 inset-y-0 text-[1.6rem] text-gray-500 dark:text-gray-300" title={type2 === "password" ? "Show Password" : "Hide Password"} onClick={handleShowPassword2}>
                                        {type2 === "password" ? <IoMdEye /> : <IoMdEyeOff />}
                                    </span>
                                </div>
                            </div>

                            <hr className='p-[0.7px] mb-2 border-none bg-slate-300 rounded-md' />

                            <div>
                                <label className='block mb-2 text-slate-500 text-[0.8rem] font-medium' htmlFor="addressLine1">Address Line 1: <span className='text-[red] text-[1.2rem]'>*</span></label>
                                <input onChange={handleAddressLine1Change} className='mb-4 w-full p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200' type="text" id='addressLine1' required/>
                            </div>

                            <div>
                                <label className='block mb-2 text-slate-500 text-[0.8rem] font-medium' htmlFor="addressLine2">Address Line 2:</label>
                                <input onChange={handleAddressLine2Change} className='mb-4 w-full p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200' type="text" id='addressLine2' />
                            </div>

                            <div>
                                <label className='block mb-2 text-slate-500 text-[0.8rem] font-medium' htmlFor="city">City/Town: <span className='text-[red] text-[1.2rem]'>*</span></label>
                                <input onChange={handleCityChange} className='mb-4 w-full p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200' type="text" id='city' required/>
                            </div>

                            <div>
                                <label className='block mb-2 text-slate-500 text-[0.8rem] font-medium' htmlFor="county">County/State: <span className='text-[red] text-[1.2rem]'>*</span></label>
                                <input onChange={handleCountyChange} className='mb-4 w-full p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200' type="text" id='county' required/>
                            </div>

                            <div>
                                <label className='block mb-2 text-slate-500 text-[0.8rem] font-medium' htmlFor="postCode">Post Code: <span className='text-[red] text-[1.2rem]'>*</span></label>
                                <input onChange={handlePostCodeChange} className='mb-4 w-full p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200' type="text" id='postCode' required/>
                            </div>

                            <div>
                                <label className='block mb-2 text-slate-500 text-[0.8rem] font-medium' htmlFor="country">Country: <span className='text-[red] text-[1.2rem]'>*</span></label>
                                <input onChange={handleCountryChange} className='mb-5 w-full p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200' type="text" id='country' required/>
                            </div>

                            <TERipple rippleColor='success' className="w-full h-fit max-h-fit">
                                <button disabled={
                                    signUpDetails.username.length == 0 ||
                                    signUpDetails.email.length == 0 || 
                                    signUpDetails.phoneNumber.length == 0 || 
                                    signUpDetails.password.length == 0 || 
                                    signUpDetails.businessName.length == 0 || 
                                    signUpDetails.address.addressLine1.length == 0 || 
                                    signUpDetails.address.city.length == 0 || 
                                    signUpDetails.address.county.length == 0 || 
                                    signUpDetails.address.postCode.length == 0 || 
                                    signUpDetails.address.country.length == 0 ? 
                                    true : false
                                } type='submit' onClick={signUpRequest} className="block w-full rounded disabled:opacity-50 bg-primary px-6 pb-2 pt-2.5 text-xs text-center font-medium uppercase leading-normal text-white hover:text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                    Sign up
                                </button>
                            </TERipple>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUpCustomer;