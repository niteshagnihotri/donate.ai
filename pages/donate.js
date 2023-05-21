import React from 'react';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json';
import Card from '../components/Campaign/Card';

const Donate = ({ VerifiedAllCampaigns }) => {

    return (
        <>
            {
                VerifiedAllCampaigns && VerifiedAllCampaigns.length !== 0 ?
                    <div className='w-9/12 flex justify-evenly mx-auto py-10'>
                        {
                            VerifiedAllCampaigns && VerifiedAllCampaigns.map((e) => {
                                return (
                                    <Card
                                        key={e._id}
                                        title={e.title}
                                        owner={e.owner}
                                        imgURI={e.imgURI}
                                        requiredAmount={e.requiredAmount}
                                        category={e.category}
                                        _id={e._id}
                                        buttonUrl="donate"
                                    />
                                )
                            })
                        }
                    </div>
                    :
                    <h1 className='text-center py-16 font-Manrope text-xl'>No Verified Campaigns</h1>
            }


        </>
    )
}

export default Donate;


export async function getStaticProps() {
    const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
    );

    const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        CampaignFactory.abi,
        provider
    );

    const campaign_count = (await contract.campaign_count()).toNumber();
    let verifiedCampaignIds = [];
    for (let i = 1; i <= campaign_count; i++) {
        const campaign_status = await contract.getCampaignStatusById(i);
        if (campaign_status) {
            verifiedCampaignIds.push(i);
        }
    }

    let VerifiedAllCampaigns = [];

    for (let i = 0; i < verifiedCampaignIds.length; i++) {
        const campaign = await contract.getCampaignDetailsById(verifiedCampaignIds[i]);

        let obj = {
            _id: verifiedCampaignIds[i],
            title: campaign[0],
            requiredAmount: ethers.utils.formatEther(campaign[1]),
            category: campaign[2],
            description: campaign[3],
            imgURI: campaign[4],
            owner: campaign[5]
        }

        VerifiedAllCampaigns.push(obj);
    }

    return {
        props: {
            VerifiedAllCampaigns
        }
    }
}