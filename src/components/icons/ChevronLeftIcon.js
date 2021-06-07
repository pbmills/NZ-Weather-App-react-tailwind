import React from 'react';

import { ChevronLeftIcon as ChevronLeft } from "@heroicons/react/solid";

const ChevronLeftIcon = (props) => {

    const { onClick } = props;

    return (
        <button
            className="bg-white rounded-full p-1 focus:outline-none"
            onClick={onClick}
        >
            <ChevronLeft className="w-5 h-5" />
        </button>
    );
};

export default ChevronLeftIcon;
