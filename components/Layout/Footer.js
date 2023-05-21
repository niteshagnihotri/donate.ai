import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    
    <div className="fixed inset-x-0 bottom-0">
      <Link href={"https://niteshagnihotri.netlify.app/"} passHref>
        <h1 className='text-center pb-4 font-Manrope tracking-widest text-emerald-500'>Built by Nitesh Agnihotri</h1>
      </Link>
    </div>
  )
}

export default Footer