import React from 'react';
import Image from 'next/image';
import { BsPersonSquare } from "react-icons/bs";
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { SiHeadspace } from 'react-icons/si';
import Link from 'next/link';

const Card = (props) => {
    return (
        <div className="w-80 cursor-pointer shadow-lg shadow-gray-800 rounded-lg overflow-hidden hover:shadow-2xl my-5 font-RedHat">
            <Image className="w-full h-40 hover:opacity-90" width={300} height={200} src={"https://ipfs.io/ipfs/" + props.imgURI} alt="" />
            <div className='flex flex-col space-y-5 px-3 py-2 font-Roboto'>
                <div className="font-Poppins text-lg">
                    <h1 className='flex items-center'><SiHeadspace className='mr-2' /> {props.title}</h1>
                </div>
                <div className=' w-full flex justify-between'>
                    <h1 className='flex items-center font-semibold'><BsPersonSquare className='mr-2' /> Owner</h1>
                    <h1>{props.owner.slice(0, 6)}...{props.owner.slice(39)}</h1>
                </div>
                <div className=' w-full flex justify-between'>
                    <h1 className='flex items-center font-semibold'><HiOutlineCurrencyRupee className='mr-1 text-xl' /> Amount</h1>
                    <h1>{props.requiredAmount} Matic</h1>
                </div>
                <div className="space-x-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{props.category}</span>
                </div>
            </div>
            <Link passHref href={`/${props.buttonUrl}/` + props._id}>
                <button className='w-full text-center py-1 font-semibold bg-green-800 text-green-50 pb-2 cursor-pointer hover:text-green-100'>
                    View Campaign
                </button>
            </Link>
        </div>
    )
}

export default Card