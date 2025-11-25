'use client'
import React from 'react'
import SelectionHeading from '../../Helper/SelectionHeading'
import { PiPaintBrushDuotone } from 'react-icons/pi'
import { IoMegaphoneOutline } from 'react-icons/io5'
import { GiTakeMyMoney } from 'react-icons/gi'
import { FaLaptopCode } from 'react-icons/fa'
import { LuRocket } from 'react-icons/lu'
import { RiCustomerService2Fill } from 'react-icons/ri'
import { MdOutlineMedicalServices } from 'react-icons/md'
import { LiaCarSideSolid } from 'react-icons/lia'
import CategoryCard from './CategoryCard'

const categoryData = [
  {
    id: 1,
    categoryName: "Accounting / Finance",
    openPosition: 2,
    icon: < GiTakeMyMoney className='w-10 h-10 text-blue-700 dark:text-white' />
  },
  {
    id: 2,
    categoryName: "Marketing",
    openPosition: 86,
    icon: < IoMegaphoneOutline className='w-10 h-10 text-blue-700 dark:text-white' />
  },
  {
    id: 3,
    categoryName: "Design",
    openPosition: 43,
    icon: < PiPaintBrushDuotone className='w-10 h-10 text-blue-700 dark:text-white' />
  },
  {
    id: 4,
    categoryName: "Development",
    openPosition: 12,
    icon: < FaLaptopCode className='w-10 h-10 text-blue-700 dark:text-white' />
  },
  {
    id: 5,
    categoryName: "Project Management",
    openPosition: 2,
    icon: < LuRocket className='w-10 h-10 text-blue-700 dark:text-white' />
  },
  {
    id: 6,
    categoryName: "Customer Service",
    openPosition: 2,
    icon: < RiCustomerService2Fill className='w-10 h-10 text-blue-700 dark:text-white' />
  },
  {
    id: 7,
    categoryName: "Health and Care",
    openPosition: 35,
    icon: < MdOutlineMedicalServices className='w-10 h-10 text-blue-700 dark:text-white' />
  },
  {
    id: 8,
    categoryName: "Automative Jobs",
    openPosition: 43,
    icon: < LiaCarSideSolid className='w-10 h-10 text-blue-700 dark:text-white' />
  },
]

const Category = () => {
  return (
    <div className='pt-16 pb-16'>
      <SelectionHeading heading='Popular Job Categories'
        subHeading='2020 jobs live - 293 added today.'
      />
      <div className='w-[80%] mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {categoryData.map((category, index )=>{
          return <div key={category.id} data-aos='faded-right' data-aos-anchor-placement='top-center'
         data-aos-delay={index*100}
         >
            <CategoryCard category={category}/>
          </div>
        })}
      </div>

    </div>

  )
}

export default Category