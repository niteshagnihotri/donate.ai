import React, { useContext } from 'react';
import { FormContext } from '../../Context/FormContext';

const FormLeftWrapper = () => {

    const Handler = useContext(FormContext);

    return (
        <div className="w-1/2">
            <div className="flex flex-col space-y-2 mb-6">
                <label htmlFor="title">
                    Campaign Title
                </label>
                <input type="text" name='title' onChange={Handler.formHandler} className="w-full text-gray-900 bg-gray-300 px-3 py-2 rounded-lg placeholder:text-gray-600" placeholder="Campaign Title" />
            </div>
            <div className="flex flex-col space-y-2 mb-6">
                <label htmlFor="description">
                    Describe Your Need
                </label>
                <textarea type="text" name='description' onChange={Handler.formHandler} rows={6} className="w-full text-gray-900 bg-gray-300 px-3 py-2 rounded-lg placeholder:text-gray-600" placeholder="Describe Your Need" />
            </div>
        </div>
    )
}

export default FormLeftWrapper