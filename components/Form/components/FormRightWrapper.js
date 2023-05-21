import React, { useContext } from 'react';
import { FormContext } from '../../Context/FormContext';
import FormBottom from './FormBottom';

const FormRightWrapper = () => {

    const Handler = useContext(FormContext);

    return (
        <div className="w-1/2">
            <div className="w-full flex flex-row justify-between space-x-10">
                <div className="w-2/5 flex flex-col space-y-2 mb-6 ">
                    <label htmlFor="Required Amount">
                        Required Amount
                    </label>
                    <input type='number' name="requiredAmount" onChange={Handler.formHandler} className="w-full text-gray-800 border-2 px-2 py-1 rounded-lg placeholder:text-gray-600" placeholder="Required Amount" />
                </div>
                <div className="w-1/2 flex flex-col space-y-2 mb-6 ">
                    <label htmlFor="Choose Category">
                        Choose Category
                    </label>
                    <select data-te-select-init defaultValue="Health" name='category' onChange={Handler.formHandler}  className="w-full border-2 px-2 py-[7px] rounded-lg text-gray-600 selection:p-10" placeholder="Choose Category">
                        <option value="Education">Education</option>
                        <option value="Health">Health</option>
                        <option value="Animal">Animal</option>
                        <option value="Animal">Other</option>
                    </select>
                    
                </div>
            </div>
            <div className="flex flex-col space-y-2 mb-6">
                <label htmlFor="Image">
                    Upload Image
                </label>
                <input onChange={Handler.ImageHandler} type={'file'} accept="image/*" className="w-full file:hover:bg-green-50 file:cursor-pointer file:bg-green-100 file:mr-2 file:border-0 file:p-1 file:px-3 file:rounded-xl" placeholder="Image" />
            </div>
            <FormBottom />
        </div>
    )
}

export default FormRightWrapper