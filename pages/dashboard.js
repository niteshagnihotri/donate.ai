import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json';
import Card from '../components/Campaign/Card';
import { Bars } from "react-loader-spinner";

const Dashboard = () => {

    const [campaigns, setCampaigns] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const request = async () => {
            setLoading(true)
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const provider = new ethers.providers.Web3Provider(ethereum, "any");
            const Signer = provider.getSigner();
            const Address = await Signer.getAddress();

            const rpcprovider = new ethers.providers.JsonRpcProvider(
                process.env.NEXT_PUBLIC_RPC_URL
            );

            const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
                CampaignFactory.abi,
                rpcprovider
            );

            const campaign_count = (await contract.campaign_count()).toNumber();
            let verifiedCampaignIds = [];
            for (let i = 0; i <= campaign_count; i++) {
                const campaign_status = await contract.getCampaignStatusById(i);
                if (campaign_status) {
                    verifiedCampaignIds.push(i);
                }
            }

            let verifiedCampaigns = [];

            for (let i = 1; i < verifiedCampaignIds.length; i++) {
                const campaign = await contract.getCampaignDetailsById(verifiedCampaignIds[i]);
                if (Address === campaign[5]) {
                    let obj = {
                        _id: verifiedCampaignIds[i],
                        title: campaign[0],
                        requiredAmount: ethers.utils.formatEther(campaign[1]),
                        category: campaign[2],
                        description: campaign[3],
                        imgURI: campaign[4],
                        owner: campaign[5]
                    }
                    verifiedCampaigns.push(obj);
                }
            }
            setCampaigns(verifiedCampaigns)

            setLoading(false);
        }

        request();

    }, [])

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
                    <div className='w-9/12 flex justify-evenly mx-auto py-10'>
                        {
                            campaigns && campaigns.map((e) => {
                                return (
                                    <Card
                                        key={e._id}
                                        title={e.title}
                                        owner={e.owner}
                                        imgURI={e.imgURI}
                                        requiredAmount={e.requiredAmount}
                                        category={e.category}
                                        _id={e._id}
                                        buttonUrl="dashboard"
                                    />
                                )
                            })
                        }
                    </div>
            }
        </>
    )
}

export default Dashboard;
