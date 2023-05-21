import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import {BsArrowUpRightCircleFill} from 'react-icons/bs';

const Home = () => {
  return (
    <div className="flex justify-between w-9/12 mx-auto space-x-16 py-24">
      <div className='w-1/2'>
        <Image className='max-w-full ' src={"/crowdfunding.png"} alt="hero-image" width={400} height={600} />
      </div>
      <div className='flex flex-col'>
        <h1 className='text-3xl flex-wrap font-bold pr-8 text-gray-300'>
          Need Funds to Pay For a Medical Emergency or Social Cause?
        </h1>
        <div className='flex flex-row justify-start space-x-14 py-12'>
          <div className="flex flex-col space-y-2">
            <h1 className='text-2xl text-emerald-400 font-RedHat'>0%</h1>
            <p className='uppercase font-semibold text-gray-300'>Platform Free</p>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className='text-2xl text-emerald-400 font-RedHat'>72 Lakh +</h1>
            <p className='uppercase font-semibold text-gray-300'>Donors</p>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className='text-2xl text-emerald-400 font-RedHat'>3.2 Lakh+</h1>
            <p className='uppercase font-semibold text-gray-300'>Fundraisers</p>
          </div>
        </div>
        <div className='space-y-6'>
            <h1 className='text-xl text-emerald-400'> donate.ai’s <span className='text-3xl'>0%</span> Platform fees ensures maximum funds for you</h1>
            <h1 className='w-fit p-2 bg-emerald-800 text-lg font-Ubuntu hover:bg-emerald-900 px-7 rounded-md shadow-lg'>
              <Link href={"/createcampaign"} className='flex flex-row items-center space-x-1'>
                Start a Fundraiser for <span className='uppercase mx-1'> Free </span> <BsArrowUpRightCircleFill/>
              </Link>
            </h1> 
        </div>
      </div>
    </div>
  )
}

export default Home;