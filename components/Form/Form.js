import FormLeftWrapper from "./components/FormLeftWrapper";
import FormRightWrapper from "./components/FormRightWrapper";
import { FormContext } from "../Context/FormContext";
import { useState } from "react";
import { toast } from "react-toastify";
import CampaignFactory from '../../artifacts/contracts/Campaign.sol/CampaignFactory.json';
import { ethers } from "ethers";

const Form = () => {

    const [form, setForm] = useState({
        title: "",
        description: "",
        requiredAmount: "",
        category: "Health",
    });
    const [imageUrl, setImageUrl] = useState();
    const [descriptionUrl, setDescriptionUrl] = useState();
    const [image, setImage] = useState(null);
    const [uploaded, setUploaded] = useState(false);
    const [campaignLoading, setCampaignLoading] = useState(false);
    const [campaignUploded, setCampaignUploded] = useState(false);

    const ImageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const formHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const startCampaign = async (e) => {
        e.preventDefault();
        setCampaignLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        if (form.campaignTitle === "") {
            toast.warn("Title Field is Empty");
        }
        else if (form.story === "") {
            toast.warn("Story Field is Empty");
        }
        else if (form.requiredAmount === "") {
            toast.warn("Required Amount Field is Empty");
        }
        else if (uploaded === false) {
            toast.warn("Files Upload Required");
        }
        else {
            const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
                CampaignFactory.abi,
                signer
            );
            const requiredAmount = ethers.utils.parseEther(form.requiredAmount);
            const dr_addresses = process.env.NEXT_PUBLIC_DR_ADDRESS.split(", ");
            const index = Math.floor(Math.random() * ((dr_addresses.length - 1) - 0 + 1)) + 0;
            const dr_address = dr_addresses[index];
            const campaignData = await contract.createCampaign(
                form.title,
                requiredAmount,
                form.category,
                descriptionUrl,
                imageUrl,
                dr_address
            );

            await campaignData.wait();
            const campaignAddress = campaignData.to;

            toast.success("Campaign Created Successfully ! ");
            // console.log(" ============ CampaignAddress => ", campaignAddress)
            // console.log(" ============ campaignData => ", campaignData)
            setTimeout(()=>{
                window.location.reload();
            }, 5000)

            
        }
        setCampaignLoading(false);
    }


    return (
        <>
            <FormContext.Provider value={{
                formHandler, image, setImage, ImageHandler, imageUrl, setImageUrl, descriptionUrl, setDescriptionUrl,
                form, setForm, startCampaign, uploaded, setUploaded, campaignLoading, campaignUploded
            }}>
                <form className="w-10/12 mx-auto py-10 px-16 font-Poppins">
                    <h1 className="text-2xl mt-2 mb-10">Start Your Free Campaign</h1>
                    <div className="w-full flex flex-row justify-between space-x-12">
                        <FormLeftWrapper />
                        <FormRightWrapper />
                    </div>
                </form>
            </FormContext.Provider>
        </>
    )
}

export default Form;