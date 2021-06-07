import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";

const InformationPanel = ({ weather }) => {
  const celsiusReading = Math.round(weather.currentData.temp);
  const fahrenheitReading = Math.round((celsiusReading * 9) / 5) + 32;

  console.log(weather, "currentData");

  return (
    <section aria-labelledby="profile-overview-title">
      <div className="rounded-lg overflow-hidden">
        <h2 className="sr-only" id="profile-overview-title">
          Weather Overview
        </h2>
        <div className="bg-purple-50 dark:bg-dark py-3">
          <div className="border-b-2 border-gray-200 pb-2">
            <div className="sm:flex sm:space-x-5">
              <Fade left cascade>
                <div className="mt-4 text-left sm:mt-0 sm:pt-1">
                  <p className="text-lg font-semibold text-gray-600 dark:text-gray-200">
                    {weather.location.place_name} Weather
                  </p>
                  <p className="text-sm font-medium text-gray-400 mt-2">
                    As of <Moment unix>{weather.currentData.dt}</Moment>
                  </p>
                  <p className="mt-2 text-4xl font-semibold text-yellow-400">
                    {weather.degreeType === "celsius"
                      ? celsiusReading
                      : fahrenheitReading}
                    º
                  </p>
                </div>
              </Fade>
            </div>
          </div>
          <div className="sm:flex sm:items-center sm:justify-between mt-2">
            <div className="sm:flex sm:space-x-5">
              <div className="mt-4 sm:mt-0 sm:pt-1 text-left">
                <p className="text-md font-semibold text-gray-600 capitalize dark:text-gray-200">
                  {weather.currentData.weather[0].description}
                </p>

                {weather.currentData.rain && (
                  <p className="text-sm font-medium text-gray-400">
                    {weather.currentData.rain * 100}% chance of rain throughout
                    2 am
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

InformationPanel.propTypes = {
  weather: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  weather: state.weather,
});

export default connect(mapStateToProps, {})(InformationPanel);
