import React from 'react';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import Link from 'next/link';

const HeaderRight = () => {
  return (
    <Link href="/donate" passHref>
    <button className='flex flex-row tracking-wide text-md font-Manrope items-center hover:border-emerald-700 hover:bg-emerald-900 transition-all px-3 py-[0.37rem] shadow-md shadow-emerald-900 text-green-100 '>
        Contribute <RiMoneyDollarCircleLine className='ml-1 rotate-45 text-2xl text-green-600' /> 
    </button>
    </Link>
  )
}
export default HeaderRight

// bg-gradient-to-tr from-emerald-900 via-green-700 to-green-700