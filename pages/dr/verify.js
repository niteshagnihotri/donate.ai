import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CampaignFactory from '../../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import { toast } from "react-toastify";
import Image from "next/image";
import { Bars } from "react-loader-spinner";

const Verify = () => {

    const [campaigns, setCampaigns] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const Request = async () => {
            setLoading(true);
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const provider = new ethers.providers.Web3Provider(ethereum, "any");

            const Rpcprovider = new ethers.providers.JsonRpcProvider(
                process.env.NEXT_PUBLIC_RPC_URL
            );

            const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
                CampaignFactory.abi,
                Rpcprovider
            );

            const Signer = provider.getSigner();
            const dr_Address = await Signer.getAddress();
            const campaignLengthByDr = await contract.getCampaignLengthByDr(dr_Address);
            let campaign_ids = [];
            for (let i = 0; i < campaignLengthByDr.toNumber(); i++) {
                campaign_ids[i] = (await contract.getCampaignIdByDr(dr_Address, i)).toNumber();
            }

            let AllCampaigns = [];

            for (let i = 0; i < campaign_ids.length; i++) {
                const campaign = await contract.getCampaignDetailsById(campaign_ids[i]);
                console.log(campaign)
                if (campaign[0] !== "") {
                    let obj = {
                        _id: campaign_ids[i],
                        title: campaign[0],
                        requiredAmount: ethers.utils.formatEther(campaign[1]),
                        category: campaign[2],
                        description: campaign[3],
                        imgURI: campaign[4],
                        owner: campaign[5]
                    }
                    AllCampaigns.push(obj);

                }
            }
            console.log(" ============= AllCampaigns ============= ", AllCampaigns)
            if (AllCampaigns.length === 0) {
                console.log(" campaign length is 0")
                setCampaigns();
            }
            else {
                console.log(" campaign length is greater than 0")
                setCampaigns(AllCampaigns);
            }
            setLoading(false);
        }

        Request();

    }, [])

    const verifyCampaign = async (campaign_Id) => {
        setLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            CampaignFactory.abi,
            signer
        );

        const campaignResponse = await contract.verifyCampaign(campaign_Id);
        await campaignResponse.wait();
        const campaignVerifiedAddress = campaignResponse.to;
        console.log(" ========== campaign verified ==========", campaignVerifiedAddress);
        
        setLoading(false);

        toast.success("Campaign Verified Successfully ! ");
        setTimeout(() => {
            window.location.reload();
        }, 5000)
    }

    return (
        <>
            {
                loading ?
                    <div className='bg-gray-900 w-100 h-[80vh] flex justify-center items-center'>
                        <Bars
                            height="40"
                            width="40"
                            color="#4fa94d"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div> :

                    campaigns && campaigns.length !== 0 ?
                        <div className='w-9/12 flex justify-evenly mx-auto py-10'>
                            {
                                campaigns && campaigns.map((e) => {
                                    return (
                                        <div key={e._id} className="w-80 cursor-pointer shadow-lg shadow-gray-800 rounded-lg overflow-hidden hover:shadow-2xl my-5 font-RedHat">
                                            <Image className="w-full h-40 hover:opacity-90" width={300} height={200} src={"https://ipfs.io/ipfs/" + e.imgURI} alt="" />
                                            <div className='flex flex-col space-y-2 px-3 py-2'>
                                                <div className=" font-bold text-xl">
                                                    <h1>{e.title}</h1>
                                                </div>
                                                <div className=' w-full flex justify-between'>
                                                    <h1>Owner</h1>
                                                    <h1>{e.owner.slice(0, 6)}...{e.owner.slice(39)}</h1>
                                                </div>
                                                <div className=' w-full flex justify-between'>
                                                    <h1>Amount</h1>
                                                    <h1>{e.requiredAmount} Matic</h1>
                                                </div>
                                                <div className="">
                                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{e.category}</span>
                                                </div>
                                            </div>
                                            <div className='w-full text-center py-1 font-semibold bg-green-800 text-green-50 pb-2 cursor-pointer'>
                                                <button onClick={() => verifyCampaign(e._id)} className='hover:text-green-100'>Verify Campaign</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        <h1 className='text-center py-10 text-2xl'>No Campaign Found</h1>
            }

        </>
    )
}

export default Verify
