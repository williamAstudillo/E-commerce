import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'; // le estamos dando acceso al local storage del objeto window del browser
import storage from 'redux-persist/lib/storage'; // aqui le estoy diciendo a persist que quiero usar localStorage como default
//importo los reducers
import products from './reducer/reducerCrud';
import users from './reducer/users';
import cart from './reducer/CartReducer';
import auth from './reducer/authReducer';
import orders from './reducer/orders';

const persistConfig = {
  // creo la configuracion pasandole un objeto json con con los parametros que quiero
  key: 'root', //en que pubntio de nuestro objeto reducer queremos empezar a guardar la cosas?
  storage, //esto lo estoy trayendo de la libreria de persist
  whitelist: ['users','auth','cart'], // el reducer que quiero guardar se lo paso en la whitelist, lo demas no se lo pasó porque lo va a manejar la
};

const rootReducer = combineReducers({
  products,
  users,
  cart,
  auth,
  orders,
});

//exportamos una version modificada de nuestro root reducer ahora con capacidades de persistencia

export default persistReducer(persistConfig, rootReducer);
//export default rootReducer
