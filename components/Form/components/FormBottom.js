import React, { useState, useContext } from 'react';
import { ImUpload2 } from 'react-icons/im';
import { FaWpforms, FaCloudUploadAlt } from 'react-icons/fa';
import { FormContext } from '../../Context/FormContext';
import { create as IPFSHTTPCLIENT } from 'ipfs-http-client';
import { ToastContainer, toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const projectID = process.env.NEXT_PUBLIC_IPFS_API_KEY;
const projectSecret = process.env.NEXT_PUBLIC_IPFS_SECRET_KEY;
const auth = 'Basic ' + Buffer.from(projectID + ':' + projectSecret).toString('base64');

const client = IPFSHTTPCLIENT({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

const FormBottom = () => {

  const Handler = useContext(FormContext);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const uploadFiles = async (e) => {
    e.preventDefault();
    setUploadLoading(true);

    if (Handler.form.description !== "") {
      try {
        const added = await client.add(Handler.form.description);
        Handler.setDescriptionUrl(added.path)
      } catch (error) {
        toast.warn(`Error Uploading Story`)
        console.log(error);
      }
    }

    if (Handler.image !== "") {
      try {
        const added = await client.add(Handler.image);
        Handler.setImageUrl(added.path)
      } catch (error) {
        toast.warn(`Error Uploading Image`)
        console.log(error);
      }
    }

    setUploadLoading(false);
    setUploaded(true);
    Handler.setUploaded(true);
    toast.success("Files Uploaded Successfully");
  }

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col">
        {
          uploadLoading === true ?
            <button className='flex flex-row justify-center font-semibold items-center border-2 mb-6 p-1 rounded-lg bg-green-600 shadow-sm hover:border-green-300 transition-all'>
              <TailSpin color="#fff" height={20} />
            </button>
            : uploaded === false ?
              <button onClick={uploadFiles} className='flex flex-row justify-center font-semibold items-center border-2 mb-6 p-1 text-gray-900 rounded-lg bg-white shadow-sm hover:border-green-300 transition-all'>
                <ImUpload2 className='mx-2 text-xl text-green-600' /> Upload Files to IPFS
              </button>
              :
              <button className='disabled cursor-none flex flex-row justify-center font-semibold items-center border-0 text-gray-900 mb-6 p-1 rounded-lg bg-green-600 shadow-sm transition-all'>
                <FaCloudUploadAlt className='mx-2 text-xl white' /> Files Loaded Successfully
              </button>
        }
        {
          Handler.campaignLoading === true ?
            <button className='flex flex-row justify-center font-semibold items-center border-2 mb-6 p-1 rounded-lg bg-green-600 shadow-sm hover:border-green-300 transition-all'>
              <TailSpin color="#fff" height={20} />
            </button>
            :
              <button onClick={Handler.startCampaign} className='flex flex-row justify-center font-semibold items-center border-2 text-gray-900 mb-6 p-1 rounded-lg bg-white shadow-sm hover:border-green-300 transition-all'>
                <FaWpforms className='mx-2 text-xl text-green-600' /> Create Campaign
              </button>
        }
      </div>
    </>
  )
}

export default FormBottom;