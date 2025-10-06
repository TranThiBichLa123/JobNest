import React from 'react';
import { FaMap } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';

const JobSearchBar = () => {
    return (
        <div className="w-full mt-8">
            <div className="flex flex-col md:flex-row bg-white dark:bg-slate-800
                      border border-slate-200 dark:border-slate-700
                      shadow-md rounded-xl overflow-hidden">

                {/* What field */}
                <div className="flex items-center w-full md:w-1/2
                        px-4 py-3 sm:py-4
                        border-b md:border-b-0 md:border-r
                        border-slate-200 dark:border-slate-700">
                    <MdSearch className="text-slate-500 text-xl mr-2" />
                    <input
                        type="text"
                        placeholder="Job title or company"
                        className="flex-1 h-10 bg-transparent outline-none
                       text-slate-900 dark:text-slate-100
                       placeholder-slate-500 dark:placeholder-slate-400"
                    />
                </div>

                {/* Where field */}
                <div className="flex items-center w-full md:w-1/2 px-4 py-3 sm:py-4">
                    <FaMap className="text-slate-500 text-xl mr-2" />
                    <input
                        type="text"
                        placeholder="City or postcode"
                        className="flex-1 h-10 bg-transparent outline-none
                       text-slate-900 dark:text-slate-100
                       placeholder-slate-500 dark:placeholder-slate-400"
                    />
                </div>
                {/* find job button */}
                <button className='bg-blue-600 text-white ox-8 sm:py-6 py-3 cursor-pointer text-sm md:text-base w-full md:w-auto min-w-[120px] whitespace-nowrap hover:bg-blue-700 transition'>
                    Find Jobs
                </button>

            </div>
        </div>
    );
};

export default JobSearchBar;
