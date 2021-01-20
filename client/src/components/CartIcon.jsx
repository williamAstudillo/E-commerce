import React from 'react'
import { connect } from 'react-redux'
import { toggleCartHidden } from '../actions/cartActions'
import { ReactComponent as Shoppingcon } from '../assets/shopping-bag.svg'
import { selectCartItemsCount } from '../reducer/cartSelectors'
import './CartIcon.scss'


const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className={itemCount > 0 ? 'activeCart' : 'cart-icon'} onClick={toggleCartHidden}>
        <Shoppingcon className='shopping-icon' />
        <span className='item-count'>{itemCount}</span>
    </div>
)
// CON_SELECTOR
//evitamos que el cart item se renderice cuando estados que no tienen nada que ver con el cart se actualizen
const mapStateToProps = (state) => ({//pasamos todo el estado del reducer al selector
    itemCount: selectCartItemsCount(state)
})

/*SIN_SELECTOR 
const mapStateToProps =({ cart: { cartItems }}) => ({
    itemCount: cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
    0
    )
}) */


const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartIcon)
