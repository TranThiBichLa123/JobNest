'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { LuNetwork } from 'react-icons/lu'
import Link from 'next/link'
import { NavLinks } from '../../../../constant/constant'
import { HiBars3BottomRight } from 'react-icons/hi2'
import { FiBell } from 'react-icons/fi'
import ThemeToggler from '../../Helper/ThemeToggler'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { MdAccountCircle } from "react-icons/md";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useCallback, useRef } from "react";
import { useNotificationSocket } from '@/hooks/useNotificationSocket';
import { useRouter, usePathname } from "next/navigation";
import RegisterModal from "@/components/Auth/RegisterModal";
import ForgotPasswordModal from "@/components/Auth/ForgotPasswordModal";
import LoginModal from "@/components/Auth/LoginModal";
import GoogleRegisterButton from "@/components/Auth/GoogleRegisterButton";
import { useAuthModal } from "@/context/AuthModalContext";
import UserMenuDropdown from "./UserMenuDropdown";

// Helper function to generate avatar URL from email using UI Avatars
function getAvatarUrl(avatarUrl: string | undefined, email: string | undefined, username: string | undefined): string {
    console.log('Avatar URL from user object:', avatarUrl);
    console.log('Email:', email);
    console.log('Username:', username);
    
    // If user has uploaded avatar (including Google avatar), use it
    if (avatarUrl && avatarUrl.trim() !== '') {
        console.log('Using provided avatar URL:', avatarUrl);
        // If it's a relative path (starts with /uploads), prepend backend server URL
        if (avatarUrl.startsWith('/uploads')) {
            return `http://localhost:8080${avatarUrl}`;
        }
        // Otherwise return as-is (for Google avatars or full URLs)
        return avatarUrl;
    }
    
    // Generate avatar from username or email
    const name = username || (email ? email.split('@')[0] : 'User');
    const avatarApiUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0e7490&color=fff&size=128&bold=true`;
    
    console.log('Generated fallback avatar URL:', avatarApiUrl);
    
    return avatarApiUrl;
}


type Props = {
    openNav: () => void
}



const Nav = ({ openNav }: Props) => {
    const [navBg, setNavBg] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [showPopupSmall, setShowPopup] = useState(false);
    const [showPopupLarge, setShowPopupLarge] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [showToast, setShowToast] = useState(false);
    const toastTimeout = useRef<NodeJS.Timeout | null>(null);
    
    const { showLoginModal, showRegisterModal, openLoginModal, openRegisterModal, closeLoginModal, closeRegisterModal } = useAuthModal();

    const router = useRouter();
    const pathname = usePathname();

    // 🔥 LẤY USER TỪ AUTH CONTEXT
    const auth = useContext(AuthContext);
    const user = auth?.user;   // user = currentUser



    // Notification handler
    const handleNotification = useCallback((msg: any) => {
        setNotifications((prev) => [{
            message: typeof msg === 'string' ? msg : (msg.message || JSON.stringify(msg)),
            timestamp: new Date().toISOString(),
        }, ...prev]);
        setShowToast(true);
        if (toastTimeout.current) clearTimeout(toastTimeout.current);
        toastTimeout.current = setTimeout(() => setShowToast(false), 4000);
    }, []);

    // Always call the hook at the top level
    useNotificationSocket(user?.id ? user.id.toString() : '', handleNotification);

    useEffect(() => {
        // Cleanup toast timeout on unmount
        return () => {
            if (toastTimeout.current) clearTimeout(toastTimeout.current);
        };
    }, []);

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

                    <Link href="/" className='flex items-center space-x-2'>
                        <div className='w-10 h-10 bg-cyan-800  rounded-full flex items-center justify-center flex-col'>
                            <LuNetwork className='w-5 h-5 text-white ' />
                        </div>
                        <h1 className='text-xl hidden sm:block md:text-2xl text-cyan-800 dark:text-white font-bold'>
                            JobNest
                        </h1>
                    </Link>

                    {/* NAVLINKS */}
                    <div className='hidden lg:flex items-center space-x-10'>
                        {NavLinks.map((link) => {
                            const isActive = pathname === link.url;
                            return <Link 
                                key={link.id} 
                                href={link.url} 
                                className={`text-base hover:text-cyan-700 dark:hover:text-cyan-200 font-medium transition-all duration-200 ${
                                    isActive ? 'text-cyan-800 dark:text-white' : ''
                                }`}
                            >
                                <p>{link.label}</p>
                            </Link>
                        })}
                    </div>
                </div>
                {/* Button */}
                {isClient && (
                    <div className="flex items-center space-x-4 relative">



                        {/* Job post button */}
                        <button className="px-8 py-2.5 text-sm text-white hidden sm:block cursor-pointer rounded-lg bg-cyan-700 hover:bg-cyan-900 transition-all duration-300">
                            Job Post
                        </button>

                        {/* Notification Bell */}

                        <button
                            className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-900 transition-all duration-300 mx-1"
                            aria-label="Notifications"
                            onClick={() => setShowPopupLarge((prev) => !prev)}
                        >
                            <FiBell className="w-7 h-7 text-cyan-700 dark:text-white" />
                            {/* Notification dot (unread) */}
                            {notifications.length > 0 && (
                                <span className="absolute top-1 right-1 block w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-800 animate-pulse"></span>
                            )}
                        </button>

                        {/* Notification Popup */}
                        {showPopupLarge && notifications.length > 0 && (
                            <div className="absolute right-0 top-12 z-[20000] w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="p-4 border-b border-gray-100 dark:border-gray-700 font-semibold text-cyan-700 dark:text-cyan-200">Notifications</div>
                                <ul className="max-h-72 overflow-y-auto">
                                    {notifications.map((n, idx) => (
                                        <li key={idx} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 text-sm text-gray-700 dark:text-gray-200">
                                            {n.message}
                                            <div className="text-xs text-gray-400 mt-1">{new Date(n.timestamp).toLocaleTimeString()}</div>
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full py-2 text-xs text-gray-500 hover:text-cyan-700 dark:hover:text-cyan-200" onClick={() => setNotifications([])}>Clear all</button>
                            </div>
                        )}

                        {/* Toast Notification */}
                        {showToast && notifications.length > 0 && (
                            <div className="fixed bottom-8 right-8 z-[30000] bg-cyan-700 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up">
                                <span className="font-semibold">Notification:</span> {notifications[0].message}
                            </div>
                        )}
                        
                        {/* User Avatar with Dropdown or Login Icon */}
                        {user ? (
                            <UserMenuDropdown 
                                avatarUrl={getAvatarUrl(user.avatarUrl, user.email, user.username)}
                                username={user.username}
                            />
                        ) : (
                            <button
                                onClick={() => setShowPopup(true)}
                                className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-900 transition-all duration-300"
                            >
                                <MdAccountCircle className="w-7 h-7 text-cyan-700 dark:text-white" />
                            </button>
                        )}


                        {/* Theme toggler */}
                        <ThemeToggler />

                        {/* Burger menu */}
                        <HiBars3BottomRight
                            onClick={openNav}
                            className="w-8 h-8 cursor-pointer text-black dark:text-white lg:hidden"
                        />

                        {/* ---- POPUP đầu tiên ---- */}
                        {showPopupSmall && (
                            <div
                                className="absolute top-full right-0 mt-2 z-[20000]">
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[350px]"
                                >
                                    <h2 className="text-lg font-semibold mb-4 text-center">Job seeker login</h2>

                                    <div className="mb-4">
                                        <GoogleRegisterButton 
                                            role="CANDIDATE"
                                            fullWidth={true}
                                            onSuccess={(data) => {
                                                setShowPopup(false);
                                                // User is now logged in, state will persist
                                            }}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <button
                                            onClick={() => {
                                                setShowPopup(false);
                                                openLoginModal();
                                            }}
                                            className="w-full border py-2 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <span>Login</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowPopup(false);
                                                openRegisterModal();
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
                <LoginModal
                    show={showLoginModal}
                    onClose={closeLoginModal}
                    onOpenForgot={() => {
                        closeLoginModal();
                        setShowForgotPassword(true);
                    }}
                    onOpenRegister={() => {
                        closeLoginModal();
                        openRegisterModal();
                    }}
                />
                {/* POPUP FORGOT PASSWORD */}
                <ForgotPasswordModal
                    show={showForgotPassword}
                    onClose={() => setShowForgotPassword(false)}
                />




                {/* POPUP REGISTER */}
                {showRegisterModal && (
                    <RegisterModal
                        onClose={closeRegisterModal}
                        onOpenLogin={() => {
                            closeRegisterModal();
                            openLoginModal();
                        }}
                    />
                )}



            </div>
        </div>
    )
}

export default Nav