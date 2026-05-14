import React from 'react';
import SanitizingServicesDetails from './SanitizingServicesDetails';
import SanitizingFaq from './SanitizingFaq';

const SanitizingMain: React.FC = () => {
    return (
        <>
            <SanitizingServicesDetails />
            <SanitizingFaq />
        </>
    );
};

export default SanitizingMain;