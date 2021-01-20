import { createSelector } from 'reselect'; //hay que importar reselect para poder trabajar con la libreria

const selectCart = (state) => state.cart; // me creo una variable que tiene una parte del estado, aqui state.cart es uno de los reducers que llegan a mi store
const selectAuth = (state) => state.auth; // me creo una variable que tiene una parte del estado, aqui state.cart es uno de los reducers que llegan a mi store

export const selectAuthUser = createSelector([selectAuth], (auth) => auth.user);

export const selectCartOrders = createSelector(
  [selectCart],
  (cart) => cart.orders
);

export const selectCartItems = createSelector(
  //creo un selector,
  [selectCart], //le paso el pedazo de estado que me guarde en la variable como primer parametro
  (cart) => cart.cartItems // y a partir de ese punto voy a una capa mas profunda, del reducer cart, quiero tener acceso a los cartItems,
); //que es mi array de items dentro del carrito

export const selectCartHidden = createSelector(
  //vuelvo y creo un selector
  [selectCart], //como primer argumento le paso la variable que cree al pincipio
  (cart) => cart.hidden // y luego le digo que seleccione la propiedad hidden del estado alamcenado en mi reducer state.cart
);
//------------PARA LLEVAR CUENTA DE ITEMS EN CARRITO-------------//
export const selectCartItemsCount = createSelector(
  //ahora creo un selector mas especifico
  [selectCartItems], //como primer parametro le paso el array de items que tengo en el carrito (cartItems)
  (
    cartItems // sobre ese array
  ) =>
    cartItems.reduce(
      //aplico una funcion reduce, que recibe 2 parametros
      (
        accumalatedQuantity,
        cartItem // la cantidad acumulada, que comienza en 0, y un item del carrito
      ) => accumalatedQuantity + cartItem.quantity, // en cada iteracion el reduce va a guardar la quantity de items en accumulatedQuantity
      0 // este es el valor inicial del reduce
    )
);
//------------PARA LLEVAR CUENTA DEL VALOR TOTAL DE LA ORDEN-----------//
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumalatedQuantity, cartItem) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);
