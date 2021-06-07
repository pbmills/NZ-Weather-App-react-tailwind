import React from 'react';

const Spinner = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8 mx-auto"/>
        </div>
    );
};

export default Spinner;
