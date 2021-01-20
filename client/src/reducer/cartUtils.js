  
export const addItemToCart = (cartItems, cartItemToAdd) => {//recibe el array de items del estado(state.cartItems) 
  // y un item para añadir action.payload
    const existingCartItem = cartItems.find(//busco en mi array de productos
      cartItem => cartItem.id === cartItemToAdd.id// un item con id igual al id del item que quiero añadir
    );
  
    if (existingCartItem) { //si el item ya existe
      return cartItems.map(cartItem => // voy y lo busco en mi array
        cartItem.id === cartItemToAdd.id // en el item que coincide con el id que le pase
          ? { ...cartItem,  //guardo todas las propiedades que ya traia el item
            quantity: cartItem.quantity + 1, // a parte le creo y le añado +1 en la propiedad quantity
            stock: cartItem.stock - 1 //disminuyo en 1 tambien el stock del producto a añadir
           }
          : cartItem
      );
    }
  
    return [...cartItems, { 
      ...cartItemToAdd, 
      quantity: 1, 
      stock: cartItemToAdd.stock-1 
    }];
  };

  export const removeItemFromCart = (cartItems, cartItemToRemove ) => {
    const existingCartItem = cartItems.find(
      cartItem => cartItem.id === cartItemToRemove.id
    )

    if(existingCartItem.quantity === 1) {
      return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map(
      cartItem =>
      cartItem.id === cartItemToRemove.id ?
      {...cartItem, quantity: cartItem.quantity - 1}
      : cartItem
    )
  }

