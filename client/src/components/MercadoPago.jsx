import React, { useState, useEffect }  from 'react'
import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";
import './MyOrders.css'
import Swal from 'sweetalert2';
import {orderMercadoPago} from '../actions/actionOrders'
import { connect } from 'react-redux'

//var mercadopago = require('mercadopago');
//mercadopago.configurations.setAccessToken(config.access_token);
//paymentMethod = mercadopago.get("/v1/payment_methods");


const MercadoPago = ({total, user, orderMercadoPago}) => {

        
            
        return (
        <div></div>
        )
}


const mapDispatchToProps = (dispatch) => ({
    orderMercadoPago: (input) => dispatch(orderMercadoPago(input))
})

export default connect(
    null,
    mapDispatchToProps
)(MercadoPago);
