import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const HeaderNav = () => {
  const router = useRouter();
  return (
    <div className="flex space-x-8 font-Poppins">
      <Link href="/createcampaign" passHref>
          <h1 className={`text-md cursor-pointer hover:text-gray-300 ${router.pathname == "/createcampaign" ? "text-gray-200" : "text-gray-400"} hover:bg-gray-800 hover:rounded-xl py-2 px-3 rounded-sm transition-all`}>Start a Free Campaign</h1> 
      </Link>
      <Link href="/working" passHref>
        <h1 className={`${router.pathname == "/working" ? "text-gray-200" : "text-gray-400"} text-md cursor-pointer hover:text-gray-300 hover:bg-gray-800 hover:rounded-xl py-2 px-3 rounded-sm transition-all`}>How It Works</h1> 
        </Link>
      <Link href="/dashboard" passHref>
        <h1 className={`text-md cursor-pointer hover:text-gray-300 ${router.pathname == "/dashboard" ? "text-gray-200" : "text-gray-400"} hover:bg-gray-800 hover:rounded-xl py-2 px-3 rounded-sm transition-all`}>Dashboard</h1>
      </Link>
    </div>
  )
}

export default HeaderNav