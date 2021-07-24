import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import * as weathericons from "../../icons.json";
import dayjs from "dayjs";

const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

function WeatherCard(props: any) {
  const { index, cityname } = props;
  const { isDarkMode } = useSelector((store: AppStore) => store.app);
  return (
    <>
      {cityname ? (
        <div className="p-4 sm:w-1/2 lg:w-full">
          <div className="h-full border-2 border-gray-400 border-opacity-60 rounded-lg overflow:hidden">
            <div className="p-6 hover:bg-indigo-700 hover:text-white transistion duration-300 ease-in">
              <h1 className={isDarkMode? "text-2xl text-white font-semibold mb-3 text-center":"text-2xl font-semibold mb-3 text-center"}>
      
                {cityname}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default WeatherCard;
