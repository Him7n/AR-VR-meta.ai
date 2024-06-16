import React from 'react'
import FormNavbar from '../Component/FormNavbar';
import { useState } from 'react';
import UploadAssignment from './UploadAssignment';
import UploadMaterial from './UploadMaterial';
import UploadModel from './UploadModel';
const UploadClass = () => {
    const [activeForm, setActiveForm] = useState('form1');

    const renderActiveForm = () => {
        switch (activeForm) {
            case 'form1':
                return <UploadAssignment />;
            case 'form2':
                return <UploadMaterial />;
            case 'form3':
                return <UploadModel />;
            // Add cases for other forms
            default:
                return <UploadAssignment />;
        }
    };
    return (
        <>
            <div className="container mx-auto flex flex-col gap-3">
                <FormNavbar setActiveForm={setActiveForm} />
                {renderActiveForm()}
            </div>
        </>

    )

}

export default UploadClass