import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCartItems } from '../reducer/cartSelectors'
import { selectCartTotal } from '../reducer/cartSelectors'
import { selectAuthUser } from '../reducer/cartSelectors'
import { selectCartOrders } from '../reducer/cartSelectors'
import CheckoutItem from './CheckoutItem'
import { useHistory } from 'react-router-dom';
import { relateCartToUser } from '../actions/cartActions'
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button
} from "reactstrap";
import { userOrders } from '../actions/actionOrders'



import './Checkout.scss'

const CheckoutPage = ({ cartItems, total, user, relateCartToUser, userOrders }) => {
  const history = useHistory()
  console.log('USUARIO::', user)

  const handleSubmit = async user => {
    if (!user) {
      history.push('/login');
    } else {
      await relateCartToUser(user)
      userOrders(user)
      history.push('/myorders');

    }
  }
  return (
    <div className='checkoutComponentContainer'>
      <div className='blankSpace'></div>
      <div className='checkout-page'>
        <div className='checkout-header'>
          <div className='header-block'>
            <span>Product</span>
          </div>
          <div className='header-block'>
            <span>Name</span>
          </div>
          <div className='header-block'>
            <span>Quantity</span>
          </div>
          <div className='header-block'>
            <span>Price</span>
          </div>
          <div className='header-block'>
            <span>Subtotal</span>
          </div>
          <div className='header-block'>
            <span>Remove</span>
          </div>
        </div>
        <div className='checkoutRowContainer'>
          {cartItems.map((cartItem) => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
          ))}

        </div>
        <div className='totalTitle'>TOTAL: </div>
        <div className='totalValue'>${parseFloat(total).toFixed(2)}</div>
        <button id='createOrder' type='submit' onClick={() => handleSubmit(user)}>
          Checkout
      </button>

      </div>

    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  user: selectAuthUser,
  //orders: selectCartOrders
});

/* const mapStateToProps = ({cart: {cartItems}, auth: {user}}) => ({
  cartItems,
  user
}) */

const mapDispatchToProps = (dispatch) => {
  return {
    relateCartToUser: (user) => dispatch(relateCartToUser(user)),
    userOrders: (user) => dispatch(userOrders(user))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);