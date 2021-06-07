// Get Weather Data from Latitude and Longitude
import axios from "axios";
import {
  GET_CURRENT_WEATHER_DATA,
  SET_ALERT,
  SET_DARK_MODE,
  SET_ERRORS,
  SET_LOADING,
  SET_METRIC,
} from "./types";
import { MAPBOX_API, OPEN_WEATHER_API } from "../apiKeys";

const weatherURL = "https://api.openweathermap.org/data/2.5/onecall";
// const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast';
const mapBoxURL = "https://api.mapbox.com/geocoding/v5";

let openWeatherApiKeys = OPEN_WEATHER_API;
let mapBoxApiKeys = MAPBOX_API;

// if (process.env.NODE_ENV !== 'production') {
//     openWeatherApiKeys = process.env.REACT_APP_OPEN_WEATHER_API;
//     mapBoxApiKeys = process.env.REACT_APP_MAPBOX_API;
// } else {
//     openWeatherApiKeys = process.env.OPEN_WEATHER_API;
//     mapBoxApiKeys = process.env.MAPBOX_API;
// }

export const getWeatherFromLatLong = () => {
  return async (dispatch) => {
    try {
      let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      const success = async (pos) => {
        // let crd = pos.coords;
        let crd = { latitude: "-36.8500", longitude: "174.7833" };

        const weather_response = await axios.get(
          `${weatherURL}?lat=${crd.latitude}&lon=${crd.longitude}&units=metric&appid=${openWeatherApiKeys}`
        );
        const weather_data = await weather_response.data;

        const location_response = await axios.get(
          `${mapBoxURL}/mapbox.places/${crd.longitude},${crd.latitude}.json?types=place&proximity=-74.70850,40.78375&access_token=${mapBoxApiKeys}`
        );

        // const location_response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${crd.latitude}&longitude=${crd.longitude}&localityLanguage=en`);
        const location_data = await location_response.data;
        console.log(location_data);
        dispatch({
          type: GET_CURRENT_WEATHER_DATA,
          payload: {
            weather: weather_data,
            location: location_data.features[0],
          },
        });
      };

      const errors = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };

      if (navigator.geolocation) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state === "granted") {
              navigator.geolocation.getCurrentPosition(success);
            } else if (result.state === "prompt") {
              navigator.geolocation.getCurrentPosition(
                success,
                errors,
                options
              );
            } else if (result.state === "denied") {
              dispatch({
                type: SET_ALERT,
                payload:
                  "Please enable location service to enhance your browsing.",
              });
            }
            result.onchange = function () {
              console.log(result.state);
            };
          });
      } else {
        dispatch({
          type: SET_ALERT,
          payload: "Geo Location Service not available.",
        });
      }
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.statusText,
      });
    }
  };
};

export const getWeatherFromLocation = (location) => {
  return async (dispatch) => {
    try {
      setLoading();

      const latLong_response = await axios.get(
        `${mapBoxURL}/mapbox.places/${location.replace(
          " ",
          "%20"
        )}.json?country=NZ&access_token=${mapBoxApiKeys}`
      );
      const latlong_data = await latLong_response.data;

      const latlong = latlong_data.features[0].center;
      const [long, lat] = latlong;

      console.log(latlong);

      const weather_response = await axios.get(
        `${weatherURL}?lat=${lat}&lon=${long}&units=metric&appid=${openWeatherApiKeys}`
      );
      const weather_data = await weather_response.data;
      console.log(weather_data);

      const location_response = await axios.get(
        `${mapBoxURL}/mapbox.places/${long},${lat}.json?country=NZ&types=place&access_token=${mapBoxApiKeys}`
      );

      // const location_response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`);
      const location_data = await location_response.data;
      console.log({ ...location_data, city: location });
      dispatch({
        type: GET_CURRENT_WEATHER_DATA,
        payload: {
          weather: weather_data,
          location: location_data.features[0],
        },
      });

      // dispatch({
      //     type: GET_LOCATION_WEATHER_DATA,
      //     payload: {
      //         weather: weather_data,
      //         location: latlong_data,
      //     },
      // });
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
    }
  };
};

export const getHourlyData = () => {
  return async (dispatch) => {
    try {
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.statusText,
      });
    }
  };
};

export const setMetric = (metric) => {
  return async (dispatch) => {
    try {
      setLoading();

      dispatch({
        type: SET_METRIC,
        payload: metric,
      });
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.statusText,
      });
    }
  };
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

export const setDarkMode = (status) => {
  return {
    type: SET_DARK_MODE,
    payload: status,
  };
};
