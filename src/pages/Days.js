import React from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
import Moment from "react-moment";

import Pulse from "react-reveal/Pulse";
import Fade from "react-reveal/Fade";

const Days = ({ weather }) => {
  console.log(weather);

  const celsiusReading = Math.round(weather.currentData.temp);
  const fahrenheitReading = Math.round((celsiusReading * 9) / 5) + 32;

  const currentReading =
    weather.degreeType === "celsius" ? celsiusReading : fahrenheitReading;

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
    <div className="max-w-8xl mx-auto lg:px-10 md:px-8 px-4">
      {/*  Top Row  */}
      <div className="grid grid-cols-3 gap-4">
        <Fade left cascade>
          <div className="flex flex-col justify-center text-black dark:text-gray-200">
            <p className="text-9xl font-semibold">{currentReading}º</p>
            <p className="text-3xl font-semibold pt-2 capitalize">
              {weather.currentData.weather[0].description}
            </p>
            <p className="text-2xl font-medium pt-2">
              {weather.location.place_name} Weather
            </p>
          </div>
        </Fade>

        <Pulse forever>
          <div className="flex flex-col justify-center items-center">
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/icons/11d.png`}
              alt=""
              className="mx-auto w-5/6"
            />
          </div>
        </Pulse>

        <div className="flex flex-col justify-center items-center">
          <Fade bottom cascade>
            <ul className="w-full lg:pl-8">
              {extraInfo.map((items, index) => (
                <li className={"py-1 border-b-2 border-gray-300"} key={index}>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={items.icon}
                        alt=""
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 truncate dark:text-gray-200">
                        {items.title}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 truncate dark:text-gray-200">
                        {items.value}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
      </div>

      {/*    Bottom Slider Row    */}
      <Slider
        dots={true}
        infinite={false}
        speed={500}
        slidesToShow={8}
        slidesToScroll={6}
        className="pb-8 pt-10"
      >
        {weather.dailyData.slice(1).map((item, index) => (
          <div className="text-left" key={index}>
            <Moment
              className="text-sm font-semibold text-gray-600 dark:text-gray-200"
              format="dddd"
              unix
            >
              {item.dt}
            </Moment>
            <p className="mt-2 text-5xl font-semibold text-gray-600 dark:text-gray-200">
              {weather.degreeType === "celsius"
                ? Math.round(item.temp.day)
                : Math.round((item.temp.day * 9) / 5) + 32}
              º
            </p>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-200">
              Feels like{" "}
              {weather.degreeType === "celsius"
                ? Math.round(item.feels_like.day)
                : Math.round((item.feels_like.day * 9) / 5) + 32}
              º
            </p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/icons/${item.weather[0].icon}-half.png`}
              alt={`${weather.hourlyData[8].weather[0].description}`}
              title={`${weather.hourlyData[8].weather[0].description}`}
              className="w-3/5 mt-2"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
const mapStateToProps = (state) => ({
  weather: state.weather,
});

export default connect(mapStateToProps, {})(Days);
