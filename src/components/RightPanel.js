import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Pulse from "react-reveal/Pulse";
import Fade from "react-reveal/Fade";

const RightPanel = ({ weather }) => {
  const morning_temp_celsius = Math.round(weather.hourlyData[8].temp);
  const morning_temp_fahrenheit =
    Math.round((morning_temp_celsius * 9) / 5) + 32;

  const morning_temp =
    weather.degreeType === "celsius"
      ? morning_temp_celsius + "º"
      : morning_temp_fahrenheit + "º";

  const afternoon_temp_celsius = Math.round(weather.hourlyData[14].temp);
  const afternoon_temp_fahrenheit =
    Math.round((afternoon_temp_celsius * 9) / 5) + 32;

  const afternoon_temp =
    weather.degreeType === "celsius"
      ? afternoon_temp_celsius + "º"
      : afternoon_temp_fahrenheit + "º";

  const evening_temp_celsius = Math.round(weather.hourlyData[18].temp);
  const evening_temp_fahrenheit =
    Math.round((evening_temp_celsius * 9) / 5) + 32;

  const evening_temp =
    weather.degreeType === "celsius"
      ? evening_temp_celsius + "º"
      : evening_temp_fahrenheit + "º";

  const night_temp_celsius = Math.round(weather.hourlyData[22].temp);
  const night_temp_fahrenheit = Math.round((night_temp_celsius * 9) / 5) + 32;

  const night_temp =
    weather.degreeType === "celsius"
      ? night_temp_celsius + "º"
      : night_temp_fahrenheit + "º";

  return (
    <div className="flex flex-col justify-center items-center">
      <Pulse forever>
        <div className="lg:block md:block lg:w-5/6 md:w-1/2 sm:hidden">
          {/*<img src={`${process.env.PUBLIC_URL}/assets/img/icons/${weather.currentData.weather[0].icon}.png`} alt="" className="w-3/4 absolute filter blur-md top-0"/>*/}
          <img
            src={`${process.env.PUBLIC_URL}/assets/img/icons/${weather.currentData.weather[0].icon}.png`}
            alt={`${weather.currentData.weather[0].main}`}
            title={`${weather.currentData.weather[0].main}`}
            className="lg:w-2/3 md:w-full sm:w-full mx-auto"
          />
        </div>
      </Pulse>

      {/*  Today's Forecast  */}
      <Fade bottom>
        <div className="rounded-lg overflow-hidden lg:w-full lg:pl-12 md:pl-4 sm:pl-0">
          <h2 className="sr-only" id="profile-overview-title">
            Extra Information
          </h2>
          <div className="lg:px-6 sm:pl-0 sm:pt-3">
            <div className="sm:mt-0 sm:pt-1 text-left">
              <p className="text-md font-semibold text-gray-600 dark:text-gray-200">
                Today’s Forecast for {weather.location.place_name}
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div className="pt-2">
                <div className="sm:mt-0 sm:pt-1 text-left">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-200">
                    Morning
                  </p>
                  <p className="text-xs font-medium text-gray-400">8:00 am</p>
                  <p className="mt-2 text-5xl font-semibold text-gray-600 dark:text-gray-200">
                    {morning_temp}
                  </p>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/img/icons/${weather.hourlyData[8].weather[0].icon}.png`}
                    alt={`${weather.hourlyData[8].weather[0].description}`}
                    title={`${weather.hourlyData[8].weather[0].description}`}
                    className="w-3/5"
                  />
                </div>
              </div>

              <div className="pt-2">
                <div className="sm:mt-0 sm:pt-1 text-left">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-200">
                    Afternoon
                  </p>
                  <p className="text-xs font-medium text-gray-400">2:00 pm</p>
                  <p className="mt-2 text-5xl font-semibold text-gray-600 dark:text-gray-200">
                    {afternoon_temp}
                  </p>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/img/icons/${weather.hourlyData[14].weather[0].icon}.png`}
                    alt={`${weather.hourlyData[14].weather[0].description}`}
                    title={`${weather.hourlyData[14].weather[0].description}`}
                    className="w-3/5"
                  />
                </div>
              </div>

              <div className="pt-2">
                <div className="sm:mt-0 sm:pt-1 text-left">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-200">
                    Evening
                  </p>
                  <p className="text-xs font-medium text-gray-400">6:00 pm</p>
                  <p className="mt-2 text-5xl font-semibold text-gray-600 dark:text-gray-200">
                    {evening_temp}
                  </p>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/img/icons/${weather.hourlyData[18].weather[0].icon}.png`}
                    alt={`${weather.hourlyData[18].weather[0].description}`}
                    title={`${weather.hourlyData[18].weather[0].description}`}
                    className="w-3/5"
                  />
                </div>
              </div>

              <div className="pt-2">
                <div className="sm:mt-0 sm:pt-1 text-left">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-200">
                    Night
                  </p>
                  <p className="text-xs font-medium text-gray-400">10:00 pm</p>
                  <p className="mt-2 text-5xl font-semibold text-gray-600 dark:text-gray-200">
                    {night_temp}
                  </p>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/img/icons/${weather.hourlyData[22].weather[0].icon}.png`}
                    alt={`${weather.hourlyData[22].weather[0].description}`}
                    title={`${weather.hourlyData[22].weather[0].description}`}
                    className="w-3/5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
};

RightPanel.propTypes = {
  weather: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  weather: state.weather,
});

export default connect(mapStateToProps, {})(RightPanel);
