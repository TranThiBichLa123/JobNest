"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import { FaMap } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';

const JobSearchBar = ({ onSearchChange, initialTitle = "", initialLocation = "" }: any) => {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const router = useRouter(); // ✔ DÙNG ĐÚNG cho App Router

    // If parent passes initial values (e.g., from query params), sync them into local state
    useEffect(() => {
        setTitle(initialTitle ?? "");
    }, [initialTitle]);

    useEffect(() => {
        setLocation(initialLocation ?? "");
    }, [initialLocation]);

    const handleSearch = () => {
        // Nếu PARENT truyền hàm → gọi hàm
        if (onSearchChange) {
            onSearchChange({ title, location });
            return;
        }

        // Nếu KHÔNG truyền → nghĩa là đang ở HOME → chuyển trang
        router.push(`/jobs?title=${title}&location=${location}`);
    };

    return (
        <div className="w-full mt-8">
            <div className="flex flex-col md:flex-row bg-white dark:bg-slate-800
                      border border-slate-200 dark:border-slate-700
                      shadow-md rounded-xl overflow-hidden">

                {/* Job Title */}
                <div className="flex items-center w-full md:w-1/2
                        px-4 py-3 sm:py-4
                        border-b md:border-b-0 md:border-r
                        border-slate-200 dark:border-slate-700">
                    <MdSearch className="text-slate-500 text-xl mr-2" />
                    {/* <input
                        type="text"
                        placeholder="Job title or company"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            emit(e.target.value, location);
                        }}
                        className="flex-1 h-10 bg-transparent outline-none
                       text-slate-900 dark:text-slate-100"
                    /> */}

                    <input type="text"
                        className="flex-1 h-10 bg-transparent outline-none
                       text-slate-900 dark:text-slate-100"
                        placeholder="Job title or company"

                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />



                </div>

                {/* Location */}
                <div className="flex items-center w-full md:w-1/2 px-4 py-3 sm:py-4">
                    <FaMap className="text-slate-500 text-xl mr-2" />
                    {/* <input
                        type="text"
                        placeholder="City or postcode"
                        value={location}
                        onChange={(e) => {
                            setLocation(e.target.value);
                            emit(title, e.target.value);
                        }}
                        className="flex-1 h-10 bg-transparent outline-none
                       text-slate-900 dark:text-slate-100"
                    /> */}




                    <input type="text"
                        className="flex-1 h-10 bg-transparent outline-none
                       text-slate-900 dark:text-slate-100"       placeholder="City or postcode"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                {/* Search Button */}
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-8 sm:py-6 py-3 cursor-pointer 
                               text-sm md:text-base w-full md:w-auto min-w-[120px] 
                               whitespace-nowrap hover:bg-blue-700 transition"
                >
                    Find Jobs

                </button>

            </div>
        </div>
    );
};

export default JobSearchBar;
