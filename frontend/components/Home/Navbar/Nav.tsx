'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { LuNetwork } from 'react-icons/lu'
import Link from 'next/link'
import { NavLinks } from '../../../constant/constant'
import { HiBars3BottomRight } from 'react-icons/hi2'
import ThemeToggler from '../../Helper/ThemeToggler'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";



type Props = {
    openNav: () => void
}



const Nav = ({ openNav }: Props) => {
    const [navBg, setNavBg] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [showPopupSmall, setShowPopup] = useState(false);
    const [showPopupLarge, setShowPopupLarge] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPopupRegister, setShowPopupRegister] = useState(false);


    useEffect(() => {
        setIsClient(true);
        const handler = () => {
            if (window.scrollY >= 90) setNavBg(true);
            if (window.scrollY < 90) setNavBg(false);
        }
        window.addEventListener('scroll', handler)
        return () => window.removeEventListener('scroll', handler)
    }, [])

    return (
        <div
            className={`fixed top-0 left-0 w-full h-[12vh] z-[10000]
              transition-colors duration-200
              ${navBg
                    ? 'bg-white dark:bg-[#0f2137] shadow-md' // khi cuộn: trắng (light), xanh đậm (dark)
                    : 'bg-transparent dark:bg-transparent'   // chưa cuộn: trong suốt
                }`}
        >

            <div className='flex items-center h-full justify-between w-[92%] mx-auto'>

                <div className='flex items-center sm:space-x-20'>
                    {/* LOGO */}

                    <div className='flex items-center space-x-2'>
                        <div className='w-10 h-10 bg-cyan-800  rounded-full flex items-center justify-center flex-col'>
                            <LuNetwork className='w-5 h-5 text-white ' />
                        </div>
                        <h1 className='text-xl hidden sm:block md:text-2xl text-cyan-800 dark:text-white font-bold'>
                            JobNest
                        </h1>
                    </div>

                    {/* NAVLINKS */}
                    <div className='hidden lg:flex items-center space-x-10'>
                        {NavLinks.map((link) => {
                            return <Link key={link.id} href={link.url} className="text-base hover:text-cyan-700 dark:hovertext-cyan-200 font-medium transition-all duration-200">
                                <p> {link.label}</p>
                            </Link>
                        })}
                    </div>
                </div>
                {/* Button */}
                {isClient && (
                    <div className="flex items-center space-x-4 relative">
                        {/* Login/register button */}
                        <button
                            onClick={() => setShowPopup(true)}
                            className="px-8 py-2.5 text-xs sm:text-sm rounded-lg cursor-pointer bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-900
            hover:bg-gray-300 transition-all duration-300"
                        >
                            Login / Register
                        </button>

                        {/* Job post button */}
                        <button className="px-8 py-2.5 text-sm text-white hidden sm:block cursor-pointer rounded-lg bg-cyan-700 hover:bg-cyan-900 transition-all duration-300">
                            Job Post
                        </button>

                        {/* Theme toggler */}
                        <ThemeToggler />

                        {/* Burger menu */}
                        <HiBars3BottomRight
                            onClick={openNav}
                            className="w-8 h-8 cursor-pointer text-black dark:text-white lg:hidden"
                        />

                        {/* ---- POPUP ---- */}
                        {showPopupSmall && (
                            <div 
                            className="absolute top-full right-0 mt-2 z-[20000]">
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[350px]"
                                >
                                    <h2 className="text-lg font-semibold mb-4 text-center">Job seeker login</h2>

                                    <div className="flex justify-between mb-4">
                                        <button className="border px-3 py-2 flex-1 mx-1 rounded flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <Image
                                                src="/images/gg.png"
                                                alt="Google"
                                                width={20}
                                                height={20}
                                            />
                                            <span>Google</span>
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        <button
                                            onClick={() => {
                                                setShowPopupLarge(true);
                                            }}
                                            className="w-full border py-2 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <span>Login</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowPopup(false);        // tắt popup nhỏ
                                                setShowPopupLarge(false);    // tắt popup login lớn (nếu đang mở)
                                                setShowPopupRegister(true); // mở popup đăng ký
                                            }}
                                            className="w-full border py-2 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <span>Create new account</span>
                                        </button>

                                    </div>

                                    {/* Close button */}
                                    <button
                                        onClick={() => setShowPopup(false)}
                                        className="absolute top-2 right-3 text-gray-500 hover:text-black dark:hover:text-white"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        )}





                    </div>
                )}

                {/* POPUP LOGIN */}
                {showPopupLarge && (
                    <div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-[30000]"
                        onClick={() => setShowPopupLarge(false)}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-gray-800 w-[600px] max-w-[95%] rounded-xl shadow-xl p-8 relative"
                        >
                            {/* Close */}
                            <button
                                onClick={() => setShowPopupLarge(false)}
                                className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-black"
                            >
                                ✕
                            </button>

                            <h2 className="text-2xl font-semibold mb-6">Login to continue</h2>

                            {/* Google */}
                            <div className="mb-6 gap-3">
                                <button className="w-full border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 ">
                                    <Image src="/images/gg.png" width={22} height={22} alt="Google" />
                                    <span>with Google account</span>
                                </button>

                            </div>

                            <div className="text-center text-gray-500 my-3">or login by email</div>

                            {/* Form of email and password input*/}
                            <div className="space-y-5">
                                <div>
                                    <label className="font-medium">Email <span className="text-red-500">*</span></label>
                                    <input
                                        type="email"
                                        className="w-full border rounded-lg px-4 py-2 mt-1 outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="font-medium">Password <span className="text-red-500">*</span></label>

                                    <div className="relative mt-1">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="w-full border rounded-lg px-4 py-2 outline-none focus:border-blue-500 pr-10"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? (
                                                <EyeSlashIcon className="w-5 h-5" />
                                            ) : (
                                                <EyeIcon className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>

                                    <div className="text-right mt-1 text-blue-600 text-sm cursor-pointer">
                                        Forgot password?
                                    </div>
                                </div>
                            </div>


                            {/* Buttons */}
                            <div className="mt-8 flex justify-end gap-3">
                                <button
                                    onClick={() => setShowPopupLarge(false)}
                                    className="px-6 py-2 border rounded-lg hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button className="px-6 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800">
                                    Login
                                </button>
                            </div>

                            <div className="mt-6 text-center text-sm">
                                Don't have an account yet?
                                <span
                                    className="text-blue-600 cursor-pointer ml-1"
                                    onClick={() => {
                                        setShowPopupLarge(false);     // tắt popup Login
                                        setShowPopupRegister(true);   // bật popup Register
                                    }}
                                >
                                    Register
                                </span>
                            </div>

                        </div>
                    </div>
                )}

                {/* POPUP REGISTER */}
                {showPopupRegister && (
                    <div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-[30000]"
                        onClick={() => setShowPopupRegister(false)}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-gray-800 w-[650px] max-w-[95%] rounded-xl shadow-xl p-10 relative"
                        >
                            {/* Close */}
                            <button
                                onClick={() => setShowPopupRegister(false)}
                                className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-black"
                            >
                                ✕
                            </button>

                            <h2 className="text-3xl font-semibold mb-8 text-center">Register as a member!</h2>

                            {/* Google Login */}
                            <div className="grid gap-4 mb-8">

                                <button className="w-full border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <Image src="/images/gg.png" width={22} height={22} alt="Google" />
                                    <span>with Google account</span>
                                </button>
                            </div>

                            {/* Form */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="font-medium">Name</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded-lg px-4 py-2 mt-1 outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="font-medium">Surname</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded-lg px-4 py-2 mt-1 outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="mb-4">
                                <label className="font-medium">Phone number</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <select className="border rounded-lg px-3 py-2">
                                        <option value="84">+84</option>
                                    </select>
                                    <input
                                        type="text"
                                        className="flex-1 border rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label className="font-medium">Email</label>
                                <input
                                    type="email"
                                    placeholder="Use a real email for authentication."
                                    className="w-full border rounded-lg px-4 py-2 mt-1 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label className="font-medium">Password</label>
                                <div className="relative mt-1">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="6 to 50 characters, 1 uppercase letter, 1 number."
                                        className="w-full border rounded-lg px-4 py-2 outline-none focus:border-blue-500 pr-12"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="w-5 h-5" />
                                        ) : (
                                            <EyeIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="flex items-start gap-2 mb-6">
                                <input type="checkbox" className="mt-1" />
                                <p className="text-sm">
                                    I accept with{" "}
                                    <span className="text-blue-600 cursor-pointer">Usage agreement</span>
                                    {" "}và{" "}
                                    <span className="text-blue-600 cursor-pointer">Security regulations </span>
                                    {" "}of JobNest.
                                </p>
                            </div>

                            {/* Submit */}
                            <button className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600">
                                Register
                            </button>

                            {/* Login link */}
                            <div className="mt-6 text-center text-sm">
                                You are a member of JobNest?
                                <span
                                    className="text-blue-600 cursor-pointer ml-1"
                                    onClick={() => {
                                        setShowPopupRegister(false);
                                        setShowPopupLarge(true);
                                    }}
                                >
                                    Login
                                </span>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Nav