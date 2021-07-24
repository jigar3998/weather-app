import React, { useEffect, useRef, useState } from "react";
import { AppStore } from "../../redux/store";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchCity,
  selectCityAction,
  fetchWeatherFail,
  fetchGeoLocation,
} from "../../redux/actions/weatherAction";

const Search = () => {
  const { OneCallCityData } = useSelector((store: AppStore) => store.weather);
  const { hourly, isDarkMode } = useSelector((store: AppStore) => store.app);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  //const [suggestion, setSuggestion] = useState<string[]>([])
  console.log(OneCallCityData);

  const onSearchInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    if ("geolocation" in navigator) {
      // eslint-disable-next-line no-lone-blocks
      {
        navigator.geolocation.getCurrentPosition(function (position) {
          console.log(position);
          if (ifCityExists("My Location")) {
            return dispatch(selectCityAction("My Location"));
          }
          dispatch(
            fetchGeoLocation(
              position.coords.latitude,
              position.coords.longitude
            )
          );
        });
      }
    } else {
      dispatch(
        fetchWeatherFail("Geolocation is not supported by this browser")
      );
    }
  }, []);
  const fetchData = () => {
    if (searchTerm.length === 0) return;
    if (ifCityExists(searchTerm)) {
      return dispatch(selectCityAction(searchTerm));
    }
    dispatch(fetchCity(searchTerm));
  };

  return (
    <div className="w-4/5 md:w-3/5 lg:w-2/5 m-auto">
      <div className="flex flex-row mx-2 p-2 justify-start border-b border-green-300 dark:border-white">
        {isDarkMode ? (
          <svg
            width="24"
            height="24"
            fill="none"
            className="mr-2 text-black-600 dark:text-white transition-colors duration-200"
            onClick={fetchData}
          >
            {" "}
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            fill="none"
            className="mr-2 text-green-600 dark:text-white transition-colors duration-200"
            onClick={fetchData}
          >
            {" "}
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        )}
        {isDarkMode ? (
          <input
            type="search"
            role="search"
            onChange={onSearchInputChanged}
            value={searchTerm}
            placeholder="Search for a location"
            className="w-48 md:w-96 mr-8 outline-none text-white bg-black "
          />
        ) : (
          <input
            type="search"
            role="search"
            onChange={onSearchInputChanged}
            value={searchTerm}
            placeholder="Search for a location"
            className="w-48 md:w-96 mr-8 outline-none "
          />
        )}

        {/* {suggestion?.slice(0, 10)?.map((s, i) => (
            <Suggestion
              key={i}
              label={s}
             
            />
          ))} */}
      </div>
    </div>
  );
  function ifCityExists(name: string) {
    let isExist = false;
    for (let index = 0; index < OneCallCityData.length; index++) {
      let element = OneCallCityData[index];
      if (element.name.toLowerCase() === name.toLowerCase()) {
        isExist = true;
        break;
      }
    }
    return isExist;
  }
};

export default Search;
