import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Fade from "react-reveal/Fade";

import { ChevronDownIcon, GlobeIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";

import { setMetric } from "../../actions/weatherActions";
import { connect } from "react-redux";

const SecondaryNav = ({ weather, name, country, degreeType, setMetric }) => {
  const onClickHandler = () => {
    const metric = weather.degreeType === "celsius" ? "fahrenheit" : "celsius";
    setMetric(metric);
  };

  return (
    <div className="max-w-8xl mx-auto lg:px-10 lg:px-10 md:px-8 px-4 pt-2">
      <div className="sm:flex sm:justify-between sm:items-center items-center">
        <Fade left cascade>
          <div className="sm:w-0 sm:flex-1">
            <p className="text-xs text-gray-600 overflow-hidden overflow-ellipsis dark:text-gray-200">
              <span className="font-semibold">{name} </span>- Based on your
              search.
            </p>
          </div>
        </Fade>

        <div className="lg:mt-0 md:mt-0 mt-2 flex items-center justify-between sm:ml-6 sm:justify-start">
          <span className="inline-flex items-center lg:px-3 lg:py-0.5 text-sm font-medium sm:px-0">
            <GlobeIcon
              className="block h-6 w-6 dark:text-gray-200"
              aria-hidden="true"
            />
            <p className="ml-2 text-sm font-semibold text-gray-600 overflow-hidden overflow-ellipsis dark:text-gray-200">
              Metric: {degreeType === "celsius" ? "ºC, m/s" : "ºF, mph"}
            </p>
          </span>
          <Menu as="div" className="relative inline-block text-left">
            {({ open }) => (
              <>
                <div>
                  <Menu.Button className="-my-2 p-1 rounded-full bg-transparent flex items-center text-gray-600 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:text-gray-200">
                    <span className="sr-only">Open options</span>
                    <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    static
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black"
                  >
                    <div className="py-1">
                      <Menu.Item>
                        {weather.degreeType === "celsius" ? (
                          <button
                            onClick={onClickHandler}
                            className={
                              "flex justify-between px-4 py-2 text-sm dark:text-gray-200 hover:bg-transparent w-full outline-none"
                            }
                          >
                            <span>ºF, mph</span>
                          </button>
                        ) : (
                          <button
                            onClick={onClickHandler}
                            className={
                              "flex justify-between px-4 py-2 text-sm dark:text-gray-200 hover:bg-transparent w-full outline-none"
                            }
                          >
                            <span>ºC, m/s</span>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      </div>
    </div>
  );
};

SecondaryNav.defaultProps = {
  name: "Auckland",
  country: "New Zealand",
  degreeType: "celsius",
};

SecondaryNav.protoTypes = {
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  degreeType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  weather: state.weather,
});

export default connect(mapStateToProps, { setMetric })(SecondaryNav);
