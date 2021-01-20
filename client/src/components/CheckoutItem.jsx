import React, { useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { clearItemFromCart, addItem, removeItem } from '../actions/cartActions'
import './CheckoutItem.scss'
import { filterProduct } from '../actions/actions'
import publicIP from 'react-native-public-ip';


const CheckoutItem = ({ cartItem, clearItemFromCart, addItem, removeItem}) => { 
    const [ip, setIp]=useState(null)

    useEffect(() => {
		if(!ip){
		publicIP().then(ipaddress => {
            setIp(ipaddress);
          })
          .catch(error => {
            console.log(error);
        
          });
        }
        }, [ip]) 

    const { name, images, price, quantity } = cartItem
    return (
        <div className='checkout-item' >
            <div className='image-container'>
                <img src={images} alt='item' />
            </div>      
            
            <div className='name'>
            <span >{name}</span>     
            </div>
            
            <div className='quantity'>
            {console.log("ip", ip)}
            <span >
                 <span className='arrow' onClick={() => removeItem({product: cartItem, ip: ip})}>&#10094;</span> 
                <span className='value'>{quantity}</span> 
                <span className='arrow' onClick={() => addItem({product: cartItem, ip: ip})}>&#10095;</span>
            </span>     
            </div>
            
            <div className='price'>
            <span >{parseFloat(price).toFixed(2)}</span>     
            </div>

            <div className='subtotal'>
            <span >{parseFloat(price*quantity).toFixed(2)}</span>
            </div>
            
            <div className='remove-button' onClick={() => clearItemFromCart({product: cartItem, ip: ip})}>&#10005;</div>     {/* esto es un utf8 dingbat */}
        </div>



    )
}

const mapDispatchToProps =  dispatch => ({
    clearItemFromCart: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
})

export default connect(
    null,
    mapDispatchToProps
)(CheckoutItem)
 