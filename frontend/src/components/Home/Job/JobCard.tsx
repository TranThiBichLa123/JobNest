'use client'
import Image from 'next/image';
import React from 'react'
import { BiBriefcase, BiMoney } from 'react-icons/bi';
import { BsBookmark } from 'react-icons/bs';
import { GrLocation } from 'react-icons/gr';

type Props = {
    job: {
        id: number | string;
        companyLogo?: string;
        companyName?: string;
        title: string;
        location: string;
        type?: string;
        isUrgent?: boolean;
        minSalary?: number;
        maxSalary?: number;
        experience?: string;
        experienceLevel?: string;
        postedAt?: string;
    }
}

// Format salary to display (e.g., 80000 -> $80k)
const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return null;
    const formatNum = (num: number) => {
        if (num >= 1000) return `$${(num / 1000).toFixed(0)}k`;
        return `$${num}`;
    };
    if (min && max) return `${formatNum(min)} - ${formatNum(max)}`;
    if (min) return `From ${formatNum(min)}`;
    if (max) return `Up to ${formatNum(max)}`;
    return null;
};

// Format job type (e.g., "fulltime" -> "Full Time")
const formatJobType = (type?: string) => {
    if (!type) return null;
    const typeMap: { [key: string]: string } = {
        'fulltime': 'Full Time',
        'parttime': 'Part Time',
        'remote': 'Remote',
        'contract': 'Contract',
        'freelance': 'Freelance',
        'internship': 'Internship',
    };
    return typeMap[type.toLowerCase()] || type;
};

const JobCard = ({ job }: Props) => {
    const salaryRange = formatSalary(job.minSalary, job.maxSalary);
    const jobType = formatJobType(job.type);

    return (
        <div className='border-[1.5px] border-gray-300 dark:border-gray-700 p-6 rounded-lg relative hover:shadow-lg transition-shadow duration-200 h-full'>
            {/* Bookmark icon */}
            <div className='w-7 h-7 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800 flex items-center transition-all
            duration-200 justify-center rounded-full flex-col absolute top-4 right-4'>
                <BsBookmark className='w-3 h-3 dark:text-gray-300' />
            </div>
            
            {/* Company and Title */}
            <div className='flex items-center space-x-4'>
                <Image 
                    src={job.companyLogo || '/images/default-company.png'} 
                    alt={job.companyName || job.title} 
                    width={50} 
                    height={50}
                    className='rounded-lg object-cover'
                />
                <div className='flex-1'>
                    <h1 className='text-base font-semibold dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer line-clamp-1'>
                        {job.title}
                    </h1>
                    <div className='flex items-center space-x-1 mt-1 text-gray-500 dark:text-gray-400'>
                        <BiBriefcase className='w-4 h-4' />
                        <p className='text-sm line-clamp-1'>{job.companyName || 'Company'}</p>
                    </div>
                </div>
            </div>

            {/* Location and Salary */}
            <div className='flex items-center justify-between mt-4'>
                <div className='flex items-center space-x-1 text-gray-600 dark:text-gray-400'>
                    <GrLocation className='w-4 h-4 flex-shrink-0' />
                    <p className='text-sm line-clamp-1'>{job.location}</p>
                </div>
                {salaryRange && (
                    <div className='flex items-center space-x-1 text-green-600 dark:text-green-400 font-medium'>
                        <BiMoney className='w-5 h-5 flex-shrink-0' />
                        <p className='text-sm whitespace-nowrap'>{salaryRange}</p>
                    </div>
                )}
            </div>

            {/* Job Type and Urgency - Only 2 badges */}
            <div className='flex items-center gap-2 mt-4'>
                {jobType && (
                    <div className='px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-xs text-blue-700 dark:text-blue-300 font-medium'>
                        {jobType}
                    </div>
                )}
                {job.isUrgent && (
                    <div className='px-3 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'>
                        Urgent
                    </div>
                )}
            </div>
        </div>
    )
}

export default JobCard