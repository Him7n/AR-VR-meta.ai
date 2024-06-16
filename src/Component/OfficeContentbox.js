import React from 'react'
import FormNavbar from './FormNavbar';
import AssignmentBox from './AssignmentBox';
import { useState } from 'react';
import Switchpanel from './Switchpanel';
import MaterialBox from './MaterialBox';
import OfficeSwitchpanel from './OfficeSwitchpanel';
const OfficeContentbox = () => {
    const [activeForm, setActiveForm] = useState('form1');
    const renderActiveForm = () => {
        switch (activeForm) {
            case 'form1':
                return <MaterialBox />;
            case 'form2':
                return <MaterialBox />;
            case 'form3':
                return <MaterialBox />
            // Add cases for other forms
            default:
                return null
        }
    };
    return (<>
        <OfficeSwitchpanel setActiveForm={setActiveForm} />
        {renderActiveForm()}
    </>
    )
}

export default OfficeContentbox