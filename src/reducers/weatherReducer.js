import { GET_CURRENT_WEATHER_DATA, GET_LOCATION_WEATHER_DATA, SET_DARK_MODE, SET_LOADING, SET_METRIC } from "../actions/types";

const initialState = {
    loading: false,
    currentData: [],
    hourlyData: [],
    dailyData: [],
    location: [],
    dark: false,
    degreeType: 'celsius', // fahrenheit
};

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        // eslint-disable-next-line no-undef
        case GET_CURRENT_WEATHER_DATA:
            return {
                ...state,
                currentData: {...action.payload.weather.current,rain: action.payload.weather.rain?.['1h']},
                hourlyData: action.payload.weather.hourly,
                dailyData: action.payload.weather.daily,
                location: action.payload.location,
                loading: false,
            };
        case GET_LOCATION_WEATHER_DATA:
            return {
                ...state,
                currentData: action.payload.weather.current,
                hourlyData: action.payload.weather.hourly,
                dailyData: action.payload.weather.daily,
                location: action.payload.location,
                loading: false,
            };
        case SET_METRIC:
            return {
                ...state,
                degreeType: action.payload,
                loadings: false,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        case SET_DARK_MODE:
            return {
                ...state,
                dark: action.payload,
            }
        default:
            return state;
    }
};

export default weatherReducer;
