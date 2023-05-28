import { createStore } from 'redux';
import distanceReducer from './distanceReducer';

const store = createStore(distanceReducer);

export default store;