import React, { useEffect, useState } from 'react';

import { TERipple } from "tw-elements-react";

// Icons
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdEditSquare } from "react-icons/md";

// Axios
import axios from '../../apiCall/axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const {userId} = useParams();
    const [userDetail, setUserDetail] = useState({});
    const [profileEdit, setProfileEdit] = useState(false);

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`api/users/details/${userId}`);
            console.log(JSON.stringify(response?.data));
            setUserDetail(response?.data || {});
            console.log("Fetched User Details");
        } catch (error) {
            console.error('Error fetching user details:', error);
            setUserDetail({});
        }
    };

    useEffect(() => {
        fetchUserDetails();
        console.log(userDetail);
    }, [])

    return (
        <main className="profile-bg pt-[8.6rem] pb-7">
            {profileEdit ? 
            <div className='mx-auto shadow-[#000000c5] shadow-md p-5 rounded-lg bg-white text-black lg:w-[50%] md:w-[60%] w-[80%]'>
                <div className=" mx-5 flex flex-row justify-center items-center gap-x-5 mb-5">
                    <h2 className='text-3xl font-extrabold'>Edit {userDetail.username}'s Profile</h2>
                </div>
                <form className='grid grid-cols-1'>

                    {userDetail.role === "ADMIN" &&
                        <div className="grid grid-cols-2 gap-x-2 gap-y-4 mb-4">
                            <div>
                                <label className='text-slate-500 text-[0.7rem]' htmlFor="firstName">First Name:</label>
                                <input className='w-full p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200' value={userDetail.firstName} type="text" id='firstName' />
                            </div>

                            <div>
                                <label className='text-slate-500 text-[0.7rem]' htmlFor="lastName">Last Name:</label>
                                <input className='w-full p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200' value={userDetail.lastName} type="text" id='lastName' />
                            </div>
                        </div>
                    }

                    {userDetail.role === "CUSTOMER" && 
                        <>
                            <label className='text-slate-500 text-[0.7rem]' htmlFor="businessName">Business Name:</label>
                            <input className='mb-4 p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200' value={userDetail.businessName} type="text" id='businessName' />
                        </>
                    }

                    <label className='text-slate-500 text-[0.7rem]' htmlFor="lastName">Email:</label>
                    <input className='mb-4 p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200' value={userDetail.email} type="text" id='lastName' />

                    <div className="grid grid-cols-2 gap-x-2 gap-y-4 mb-4">
                        <div>
                            <label className='text-slate-500 text-[0.7rem]' htmlFor="username">Username:</label>
                            <input className='w-full p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200' value={userDetail.username} type="text" id='username' />
                        </div>

                        <div>
                            <label className='text-slate-500 text-[0.7rem]' htmlFor="phoneNumber">Phone Number:</label>
                            <input className='w-full p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200' value={userDetail.phoneNumber} type="number" id='phoneNumber' />
                        </div>
                    </div>

                    {userDetail.address && (
                        <>
                            <hr className='p-[0.7px] mb-2 border-none bg-slate-300 rounded-md' />

                            <label className='text-slate-500 text-[0.7rem]' htmlFor="addressLine1">Address Line 1:</label>
                            <input className='mb-4 p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200' value={userDetail.address.addressLine1} type="text" id='addressLine1' />

                            <label className='text-slate-500 text-[0.7rem]' htmlFor="addressLine2">Address Line 2:</label>
                            <input className='mb-4 p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200' value={userDetail.address.addressLine2} type="text" id='addressLine2' />

                            <label className='text-slate-500 text-[0.7rem]' htmlFor="city">City/Town:</label>
                            <input className='mb-4 p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200' value={userDetail.address.city} type="text" id='city' />

                            <label className='text-slate-500 text-[0.7rem]' htmlFor="county">County:</label>
                            <input className='mb-4 p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200' value={userDetail.address.county} type="text" id='county' />

                            <label className='text-slate-500 text-[0.7rem]' htmlFor="postCode">Post Code:</label>
                            <input className='mb-4 p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200' value={userDetail.address.postCode} type="text" id='postCode' />

                            <label className='text-slate-500 text-[0.7rem]' htmlFor="country">Country:</label>
                            <input className='mb-5 p-2 rounded-sm border-b-2 border-[#8f8f8f] focus:border-[#000000] outline-none transition-all duration-250 dark:bg-slate-700 focus:dark:bg-slate-500 bg-slate-100 focus:bg-slate-200' value={userDetail.address.country} type="text" id='country' />
                        </>
                    )}

                    <TERipple rippleColor='info' className="w-full mb-1 cursor-pointer h-fit max-h-fit">
                        <a onClick={() => setProfileEdit(false)} className="block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs text-center font-medium uppercase leading-normal text-white hover:text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            Save Changes
                        </a>
                    </TERipple>

                </form>
            </div> :

            <div className='mx-auto shadow-[#000000c5] shadow-md p-5 rounded-lg bg-white text-black lg:w-[50%] md:w-[60%] w-[80%]'>
                <div className=" mx-5 flex flex-row justify-center items-center gap-x-5 mb-5">
                    <h2 className='text-3xl font-extrabold'>{userDetail.username}'s Profile</h2>
                    <p onClick={() => setProfileEdit(true)} title='Edit Profile' className="flex flex-row justify-center items-center gap-x-1 text-white transition-all duration-200 cursor-pointer p-2 bg-slate-400 hover:bg-slate-600 rounded-md">
                        Edit 
                        <MdEditSquare />
                    </p>
                </div>

                <div className='grid grid-cols-1'>

                    {userDetail.role === "ADMIN" && 
                        <div className="grid grid-cols-2 gap-x-2 gap-y-4 mb-4">
                            <div>
                                <p className='text-slate-500 text-[0.7rem]'>First Name:</p>
                                <p className='text-slate-600 w-full p-2 border-b-2 border-[#1A3661]' id='firstName'>{userDetail.firstName}</p>
                            </div>

                            <div>
                                <p className='text-slate-500 text-[0.7rem]'>Last Name:</p>
                                <p className='text-slate-600 w-full p-2 border-b-2 border-[#1A3661]' id='lastName'>{userDetail.lastName}</p>
                            </div>
                        </div>
                    }

                    {userDetail.role === "CUSTOMER" && 
                        <>
                            <p className='text-slate-500 text-[0.7rem]'>Business Name:</p>
                            <p className='text-slate-600 mb-4 p-2 border-b-2 border-[#1A3661]' id='businessName'>{userDetail.businessName}</p>

                        </>
                    }

                    <p className='text-slate-500 text-[0.7rem]'>Email:</p>
                    <p className='text-slate-600 mb-4 p-2 border-b-2 border-[#1A3661]' id='lastName'>{userDetail.email}</p>

                    <div className="grid grid-cols-2 gap-x-2 gap-y-4 mb-4">
                        <div>
                            <p className='text-slate-500 text-[0.7rem]'>Username:</p>
                            <p className='text-slate-600 w-full p-2 border-b-2 border-[#1A3661]' id='username'>{userDetail.username}</p>
                        </div>

                        <div>
                            <p className='text-slate-500 text-[0.7rem]'>Phone Number:</p>
                            <p className='text-slate-600 w-full p-2 border-b-2 border-[#1A3661]' id='phoneNumber'>{userDetail.phoneNumber}</p>
                        </div>
                    </div>

                    {userDetail.address && (
                        <>
                            <hr className='p-[1px] mb-2 border-none bg-slate-400' />

                            <p className='text-slate-500 text-[0.7rem]'>Address Line 1:</p>
                            <p className='text-slate-600 mb-4 p-2 border-b-2 border-[#1A3661]' id='addressLine1'>{userDetail.address.addressLine1}</p>

                            {userDetail.address.addressLine2 !== null &&
                                <>
                                    <p className='text-slate-500 text-[0.7rem]'>Address Line 2:</p>
                                    <p className='text-slate-600 mb-4 p-2 border-b-2 border-[#1A3661]' id='addressLine2'>{userDetail.address.addressLine2}</p>
                                </>
                            }

                            <p className='text-slate-500 text-[0.7rem]'>City/Town:</p>
                            <p className='text-slate-600 mb-4 p-2 border-b-2 border-[#1A3661]' id='city'>{userDetail.address.city}</p>

                            <div className="grid grid-cols-2 gap-x-2 gap-y-4 mb-4">
                                <div>
                                    <p className='text-slate-500 text-[0.7rem]'>County:</p>
                                    <p className='text-slate-600 w-full p-2 border-b-2 border-[#1A3661]' id='county'>{userDetail.address.county}</p>
                                </div>
                                <div>
                                    <p className='text-slate-500 text-[0.7rem]'>Post Code:</p>
                                    <p className='text-slate-600 w-full p-2 border-b-2 border-[#1A3661] uppercase' id='postCode'>{userDetail.address.postCode}</p>
                                </div>
                            </div>

                            <p className='text-slate-500 text-[0.7rem]'>Country:</p>
                            <p className='text-slate-600 mb-4 p-2 border-b-2 border-[#1A3661]' id='country'>{userDetail.address.country}</p>
                        </>
                    )}

                </div>
            </div>
        }
        </main>
    )
}

export default Profile;