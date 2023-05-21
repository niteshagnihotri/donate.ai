import React from 'react'

const Working = () => {
    return (
        <div className="w-9/12  my-10 px-10 py-5 mx-auto">
            <div className="w-full">
                <h1 className='font-Manrope tracking-wide text-xl'>
                    Here&apos; a simplified outline of how such a system could work:
                </h1>
                <div>
                    <ol className="list-disc space-y-5 px-5 py-2 font-Work">
                        <li>
                            Campaign Creation: Users create crowdfunding campaigns, providing relevant details about their medical condition, treatment, and fundraising goals. They may also opt to remain anonymous or use pseudonyms.
                        </li>
                        <li>
                            Verification Process: The campaign creator can choose to submit their medical records or relevant documentation to a pool of anonymous doctors who are willing to participate. These doctors would have been pre-registered and verified on the blockchain network.
                        </li>
                        <li>
                            Anonymous Doctor Verification: The pool of anonymous doctors reviews the submitted medical records and documentation to validate the authenticity and legitimacy of the campaign. They can provide their assessment and approval by digitally signing the verification using their private keys. The verification could include confirming the medical condition, the required treatment, and the estimated cost.
                        </li>
                        <li>
                            Smart Contract Execution: Once the anonymous doctors have verified a campaign, their signatures and the campaign details are recorded on the blockchain through a smart contract. This contract contains the rules and conditions of the campaign, such as the fundraising goal, deadline, and the wallet address to receive the funds.
                        </li>
                        <li>
                            Fundraising and Transparency: Individuals can now contribute funds to the campaign using cryptocurrency. The blockchain ensures transparency by recording all transactions, making them accessible to the public. Donors can see the verified medical campaign details and the endorsements of the anonymous doctors, increasing trust and confidence in the fundraising effort.
                        </li>
                        <li>
                            Completion and Distribution: If the campaign reaches its fundraising goal within the set timeframe, the smart contract automatically triggers the distribution of funds to the designated wallet address. The campaign creator can then access the funds to pursue their medical treatment.
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default Working