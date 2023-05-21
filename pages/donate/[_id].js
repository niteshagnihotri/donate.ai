import React, { useState } from 'react';
import { ethers } from 'ethers';
import CampaignFactory from '../../artifacts/contracts/Campaign.sol/CampaignFactory.json';
import Image from 'next/image';
import { ToastContainer, toast } from "react-toastify";
import { TailSpin } from 'react-loader-spinner';

const CampaignDetail = ({ CampaignData }) => {

    const [amountToDonate, setAmountToDonate] = useState('');
    const [request, setRequest] = useState(false);

    const DonateFunds = async () => {
        try {
            setRequest(true);
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const provider = new ethers.providers.Web3Provider(ethereum, "any");

            const Signer = provider.getSigner();

            const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
                CampaignFactory.abi,
                Signer
            );

            const transaction = await contract.donate(CampaignData._id, { value: ethers.utils.parseEther(amountToDonate), gasLimit: 3000000 });
            await transaction.wait();
            setRequest(false);
            toast.success("Amount Donated ! ");
            setAmountToDonate('');

        }
        catch (error) {
            console.log(error);
            setRequest(false);
            toast.error("Error While transaction ! ");
        }

    }

    return (
        <>
            <ToastContainer />
            <div className='w-fit bg-gray-800 mx-auto my-20 font-Poppins p-16 rounded-lg shadow-xl'>
                <div className='w-100 flex flex-row justify-evenly '>
                    <div className='w-2/5 space-y-4'>
                        <div>
                            <Image className='w-full h-48 shadow-lg' src={"https://ipfs.io/ipfs/" + CampaignData.imgURI} width={200} height={400} alt="campaign" />
                        </div>
                        <div>
                            <h1 className='text-gray-300 text-xl font-Algreya capitalize'>
                                <span className='font-semibold'>Description:</span> {CampaignData.description}
                            </h1>
                        </div>
                    </div>
                    <div className='space-y-4'>
                        <div className='w-full'>
                            <h1 className='capitalize'><span className='font-semibold capitalize'>Title :</span> {CampaignData.title}</h1>
                        </div>
                        <div className='w-full'>
                            <h1 className='capitalize '><span className='font-semibold'>Required Amount :</span> {CampaignData.requiredAmount}</h1>
                        </div>
                        <div className='w-full'>
                            <h1 className='capitalize '><span className='font-semibold'>Owner :</span> {CampaignData.owner.slice(0, 5).toUpperCase()}...{CampaignData.owner.slice(-5, -1).toUpperCase()}</h1>
                        </div>
                        <div className='w-full'>
                            <h1 className='capitalize '><span className='font-semibold'>Category :</span> {CampaignData.category}</h1>
                        </div>
                        <div className='flex flex-col w-fit text-left space-y-5'>
                            <input className='px-4 p-1 rounded-lg text-gray-800' value={amountToDonate} onChange={(e) => setAmountToDonate(e.target.value)} type="number" placeholder="Enter Amount To Donate" />
                            {
                                request ?
                                    <button className='border border-teal-50 w-fit px-5 py-1 rounded-lg shadow-xl'>
                                        <TailSpin color="#fff" height={20} />
                                    </button>
                                    :
                                    <button className='border border-teal-50 w-fit px-5 py-1 rounded-lg shadow-xl' onClick={DonateFunds}>Donate</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CampaignDetail;


export async function getStaticPaths() {

    const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
    );

    const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        CampaignFactory.abi,
        provider
    );

    const ids = [];
    const campaign_count = (await contract.campaign_count()).toNumber();
    for (let i = 1; i <= campaign_count; i++) {
        ids.push(i);
    }

    const paths = ids.map((_id) => {
        return {
            params: { _id: `${_id}` }
        }
    })

    return {
        paths,
        fallback: "blocking"
    }
}


export async function getStaticProps(context) {
    const { params } = context;
    const _id = params._id;

    const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
    );

    const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        CampaignFactory.abi,
        provider
    );

    const campaign = await contract.getCampaignDetailsById(_id);

    const CampaignData = {
        _id,
        title: campaign[0],
        requiredAmount: ethers.utils.formatEther(campaign[1]),
        category: campaign[2],
        description: campaign[3],
        imgURI: campaign[4],
        owner: campaign[5]
    }

    const res = await fetch('https://ipfs.io/ipfs/' + campaign[3]);
    CampaignData.description = await res.text();

    return {
        props: {
            CampaignData
        }
    }

}