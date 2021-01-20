import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import './CartDropDown.scss'
import CustomButton from './CustomButton'
import CartItem from './CartItem'
import { withRouter } from 'react-router-dom' // vamos a envolver connect con esto
import { toggleCartHidden } from '../actions/cartActions'
import { createStructuredSelector } from 'reselect'
import { selectCartItems } from '../reducer/cartSelectors'

const CartDropDown = ({ cartItems, history, dispatch }) => {
    return (
        <div className='cart-dropdown'>
            <p className='cartPreview'>CART PREVIEW</p>
            <div className='cart-items'>
                {cartItems.length ? (
                    cartItems.map(cartItem => (
                        <CartItem key={cartItem.id} item={cartItem} />
                    ))
                ) : (
                        <span className='empty-message'>Your cart is empty :(</span>
                    )}
            </div>
            <button className='goToCheckOut' onClick={() => {
                history.push('/checkout')
                dispatch(toggleCartHidden())
            }}> CheckOut </button>
        </div>
    )
}

//cart representa como le puse al reducer del cart en el combine reducer del store, 
//cartItems es el array de productos que se ecuentran en el estado del carrito
// CON RESELECT 
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems //ahora puedo acceder cartItems como props en el componente
})

/*SIN RESELECT PURE REDUX 
const mapStateToProps = (state}) => ({ 
    cartItems: state.cart.cartItems
}) */

export default withRouter(connect(mapStateToProps)(CartDropDown)) //de esta manera el componente tiene acceso a propiedades como history
//cuando no le paso mapDispatchToprops como segundo parametro a connect me pasa el dispatch como prop en mi componente
