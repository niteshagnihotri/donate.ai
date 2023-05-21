import React from 'react';
import { FaHands } from 'react-icons/fa';
import Link from 'next/link';

const HeaderLogo = () => {
  return (
    <Link href="/" passHref>
      <h1 className='text-2xl font-Poppins flex items-center space-x-2 font-bold text-emerald-400'>
      <span className='text-white'>do</span>Nate.ai<FaHands className='text-green-400 text-2xl' /> </h1>
    </Link>
  )
}

export default HeaderLogo