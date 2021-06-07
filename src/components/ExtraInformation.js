import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import Fade from "react-reveal/Fade";

import { DownloadIcon, UploadIcon } from "@heroicons/react/solid";

import sunUpAndDown from "../assets/img/sun-up-n-down.png";
import wind from "../assets/img/extras/wind.svg";
import windLight from "../assets/img/extras/wind-light.svg";
import humidity from "../assets/img/extras/humidity.svg";
import humidityLight from "../assets/img/extras/humidity-light.svg";
import dew_point from "../assets/img/extras/dew_point.svg";
import dew_pointLight from "../assets/img/extras/dew_point-light.svg";
import pressure from "../assets/img/extras/pressure.svg";
import pressureLight from "../assets/img/extras/pressure-light.svg";
import uv_index from "../assets/img/extras/uv_index.svg";
import uv_indexLight from "../assets/img/extras/uv_index-light.svg";
import visibility from "../assets/img/extras/visibility.svg";
import visibilityLight from "../assets/img/extras/visibility-light.svg";

const ExtraInformation = ({ weather }) => {
  // const min_temperature_celsius = Math.floor(weather.currentData.main.temp_min);
  // const max_temperature_celsius = Math.floor(weather.currentData.main.temp_max);
  // const min_temperature_fahrenheit = Math.round(min_temperature_celsius * 9/5) + 32;
  // const max_temperature_fahrenheit = Math.round(max_temperature_celsius * 9/5) + 32;
  //
  // const min_temperature = weather.degreeType === 'celsius' ? min_temperature_celsius + 'º' : min_temperature_fahrenheit + 'º';
  // const max_temperature = weather.degreeType === 'celsius' ? max_temperature_celsius + 'ºC' : max_temperature_fahrenheit + 'ºF';

  const humidity_percentage = weather.currentData.humidity + "%";

  const wind_speed_mps = weather.currentData.wind_speed.toFixed();
  const wind_speed_mph = (wind_speed_mps / 0.44704).toFixed();

  const wind_speed =
    weather.degreeType === "celsius"
      ? wind_speed_mps + "m/s"
      : wind_speed_mph + "mph";

  const dew_point_celsius = weather.currentData.dew_point;
  const dew_point_fahrenheit = Math.round((dew_point_celsius * 9) / 5) + 32;

  const dew_point_value =
    weather.degreeType === "celsius"
      ? dew_point_celsius + "ºC"
      : dew_point_fahrenheit + "ºF";

  const pressure_value = weather.currentData.pressure + "hPa";

  const uv_index_value = weather.currentData.uvi;

  const visibility_value = weather.currentData.visibility + "m";

  const sunrise = new Date(weather.currentData.sunrise * 1000);
  const sunset = new Date(weather.currentData.sunset * 1000);

  const feels_like_celsius = weather.currentData.feels_like.toFixed();
  const feels_like_fahrenheit = ((dew_point_celsius * 9) / 5 + 32).toFixed();

  const feels_like_value =
    weather.degreeType === "celsius"
      ? feels_like_celsius + "ºC"
      : feels_like_fahrenheit + "ºF";

  const extraInfo = [
    {
      icon: weather.dark === false ? wind : windLight,
      title: "Wind",
      value: wind_speed,
    },
    {
      icon: weather.dark === false ? humidity : humidityLight,
      title: "Humidity",
      value: humidity_percentage,
    },
    {
      icon: weather.dark === false ? dew_point : dew_pointLight,
      title: "Dew Point",
      value: dew_point_value,
    },
    {
      icon: weather.dark === false ? pressure : pressureLight,
      title: "Pressure",
      value: pressure_value,
    },
    {
      icon: weather.dark === false ? uv_index : uv_indexLight,
      title: "UV Index",
      value: uv_index_value,
    },
    {
      icon: weather.dark === false ? visibility : visibilityLight,
      title: "Visibility",
      value: visibility_value,
    },
  ];

  return (
    <section aria-labelledby="profile-overview-title">
      <div className="rounded-lg overflow-hidden">
        <h2 className="sr-only" id="profile-overview-title">
          Extra Information
        </h2>

        <Fade left>
          <div className="">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="mt-0 lg:text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-semibold text-gray-600 mt-0 dark:text-gray-200">
                  Weather today in {weather.location.city},{" "}
                  {weather.location.countryName}
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="sm:flex sm:items-center sm:justify-between lg:pt-2 md:pt-2 sm:pt-4">
                <div className="sm:flex sm:space-x-5">
                  <div className="sm:mt-0 sm:pt-1 text-left">
                    <p className="mt-0 text-5xl font-semibold text-gray-600 dark:text-gray-200">
                      {feels_like_value}
                    </p>
                    <p className="text-md font-medium text-gray-400 mt-2">
                      Feels like
                    </p>
                  </div>
                </div>
              </div>

              <div className="sm:flex sm:items-center sm:justify-between lg:pt-1 md:pt-2 sm:pt-4 justify-end">
                <div className="sm:flex sm:space-x-5">
                  <div className="lg:mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left flex flex-col items-center">
                    <img src={sunUpAndDown} alt="" className="w-24" />
                    <p className="text-sm font-medium text-gray-400 mt-2 text-right inline-flex items-center">
                      <UploadIcon className="w-5 h-5 text-yellow-400 mr-3" />
                      <Moment format={"hh:mm a"}>{sunrise}</Moment>
                      <DownloadIcon className="w-5 h-5 text-yellow-400 mx-3" />
                      <Moment format={"hh:mm a"}>{sunset}</Moment>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <ul className="grid grid-cols-2 gap-4">
                {extraInfo.map((item, index) => (
                  <li
                    className={
                      index !== extraInfo.length - 1 &&
                      index !== extraInfo.length - 2
                        ? "py-1 border-b-2 border-gray-300"
                        : "py-1 "
                    }
                    key={item.icon}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={item.icon}
                          alt=""
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate dark:text-gray-200">
                          {item.title}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900 truncate dark:text-gray-200">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
};

ExtraInformation.protoTypes = {
  weather: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  weather: state.weather,
});

export default connect(mapStateToProps, {})(ExtraInformation);
