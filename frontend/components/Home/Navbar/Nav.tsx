'use client'
import React, { useEffect, useState } from 'react'
import { LuNetwork } from 'react-icons/lu'
import Link from 'next/link'
import { NavLinks } from '../../../constant/constant'
import { HiBars3BottomRight } from 'react-icons/hi2'
import ThemeToggler from '../../Helper/ThemeToggler'



type Props = {
    openNav: () => void
}



const Nav = ({ openNav }: Props) => {
    const [navBg, setNavBg] = useState(false);
    const [isClient, setIsClient] = useState(false);
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
                    <div className='flex items-center space-x-4'>
                        {/* Login/register button */}
                        <button className='px-8 py-2.5 text-xs sm:text-sm rounded-lg cursor-pointer bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-900
                     hover:bg-gray-300 transition-all duration-300'>
                            Login / Register
                        </button>
                        {/* Job post button */}
                        <button className='px-8 py-2.5 text-sm text-white hidden sm:block cursor-pointer rounded-lg bg-cyan-700 hover:bg-cyan-900 transition-all duration-300'>
                            Job Post
                        </button>
                        {/* Theme Toggler */}
                        <ThemeToggler />
                        {/* Burger menu */}
                        <HiBars3BottomRight
                            onClick={openNav}
                            className='w-8 h-8 cursor-pointer text-black dark:text-white lg:hidden'
                        />
                    </div>)}



            </div>
        </div>
    )
}

export default Nav