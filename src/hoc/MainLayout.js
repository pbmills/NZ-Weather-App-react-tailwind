import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Navigation from "../assets/layouts/Navigation";
import SecondaryNav from "../assets/layouts/SecondaryNav";

import { getWeatherFromLatLong } from "../actions/weatherActions";
import Spinner from "../components/Spinner";

const MainLayout = ({ getWeatherFromLatLong, weather, children }) => {
  useEffect(() => {
    getWeatherFromLatLong();

    localStorage.getItem("darkMode") === "true"
      ? document.querySelector("body").classList.add("dark")
      : document.querySelector("body").classList.remove("dark");

    // eslint-disable-next-line
  }, []);

  if (weather.loading || weather.currentData?.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="bg-purple-50 dark:bg-dark h-screen">
      <Navigation />

      <SecondaryNav
        name={weather.location.place_name}
        country={weather.location.countryName}
        degreeType={weather.degreeType}
      />

      <main className="mt-4 pb-0 bg-purple-50 dark:bg-dark ">{children}</main>
    </div>
  );
};

MainLayout.propTypes = {
  weather: PropTypes.object.isRequired,
  getWeatherFromLatLong: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  weather: state.weather,
});

export default connect(mapStateToProps, { getWeatherFromLatLong })(MainLayout);
