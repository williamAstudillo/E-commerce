import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist'; //le permite a nuestro browser usar el storage dependiendo de la config que le demos
import logger from 'redux-logger';
import rootReducer from './rootReducer';

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [logger, thunk];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store); //creamos una version de nuestra store que es persistente

export default { store, persistor };
