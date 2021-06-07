import React from 'react';
import InformationPanel from "../components/InformationPanel";
import ExtraInformation from "../components/ExtraInformation";
import RightPanel from "../components/RightPanel";

const Today = () => {
    return (
        <div className="mx-auto max-w-8xl lg:px-10 md:px-8 px-4">
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-6 lg:gap-8">

                {/* Left column */}
                <div className="grid grid-cols-1 gap-4 lg:col-span-3">

                    {/* Current information panel */}
                    <InformationPanel/>

                    {/*  Extra Information panel  */}
                    <ExtraInformation/>
                </div>

                {/* Right column */}
                <div className="grid lg:col-span-3">

                    <RightPanel/>

                </div>
            </div>
        </div>
    );
};

export default Today;
