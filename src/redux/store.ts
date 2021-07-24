import { applyMiddleware,  createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore } from "redux-persist";
// import { appReducer, IAppState } from './reducers/appReducer';
import { IWeatherIntialState } from './reducers/weatherReducer';
import persist from './rootReducer'
import { IAppState } from './reducers/appReducers';



export type AppStore = {
  app: IAppState;
  weather: IWeatherIntialState;
};

export const store = createStore(persist, applyMiddleware(logger,thunk));

export const persistor = persistStore(store);
