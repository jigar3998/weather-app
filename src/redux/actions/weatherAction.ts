import { IWeatherData,  IWeatherAPIReponse } from './../../Types/types';
import { WeatherActionTypes } from './../actionTypes';

import axios from 'axios'
import { IOneCallResponse } from '../../Types/types';
import { useDispatch } from 'react-redux';
export const fetchWeatherStart = () => {
  return {
    type: WeatherActionTypes.FETCH_WEATHER_START
  }
}

export const fetchWeatherSuccess = (city:IWeatherData) => {
  console.log("In success", city)
  return {
    type: WeatherActionTypes.FETCH_WEATHER_SUCCESS,
    payload:  city 
  }
}

export function selectCityAction(name:string){
  return {payload:name,type:WeatherActionTypes.SELECT_CITY}
}
export const fetchWeatherFail = (error: string) => ({
  type: WeatherActionTypes.FETCH_WEATHER_ERROR,
  payload: error,
});

export const fetchGeoLocation =(lat:number , lon:number)=>
{
 return function(dispatch: any)
 {
  axios.get<IOneCallResponse>(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_APIKEY}`)
  .then(res => {
    let oneCallCity = {...res.data,name:'My Location'}
  
    dispatch(fetchWeatherSuccess(oneCallCity))
    dispatch(selectCityAction('My Location'))
   
  })
  .catch(error=>{
    dispatch(fetchWeatherFail(error.message));
  })
 
}}


export const fetchCity = (city: string ) => {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_APIKEY}`;
  return function (dispatch: any) {
    dispatch(fetchWeatherStart);

    axios
      .get<IWeatherAPIReponse>(url)
      .then((response) => {
        console.log(response)
        
       let  cityName = response.data.name;
        let {lat, lon}= response.data.coord
        
        axios.get<IOneCallResponse>(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_APIKEY}`)
        .then(res => {
         let oneCallCity = {...res.data,name:cityName}
         dispatch(fetchWeatherSuccess(oneCallCity))
         dispatch(selectCityAction(cityName))
        })
        .catch(error=>{
          dispatch(fetchWeatherFail(error.message));
        }

        
        )
     
      
})
      .catch(error => {
        dispatch(fetchWeatherFail(error.message));
      });
  };
}

