import React from 'react';

import { ChevronRightIcon as ChevronRight } from "@heroicons/react/solid";

const ChevronRightIcon = (props) => {

    const { onClick } = props;

    return (
        <button
            className="bg-white rounded-full p-1 focus:outline-none"
            onClick={onClick}
        >
            <ChevronRight className="w-5 h-5"/>
        </button>
    );
};

export default ChevronRightIcon;
